import { Component, OnInit, ViewChild } from '@angular/core';
import { selectGuildOrRouteIndex } from '../utils/navigation.utils';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { GuildService } from '../guild.service';
import { Guild } from '../entities/guild';
import { Stat } from '../entities/stat';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatDatepickerInputEvent, MatTableDataSource, MatSort } from '@angular/material';
import { LoginService } from '../login.service';
import { StatsOverview } from '../entities/stats-overview';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MemberStats } from '../entities/member-stats';

interface ChartData {
    chartType: string;
    dataTable: any[];
}

@Component({
    selector: 'app-guild-statistics',
    templateUrl: './guild-statistics.component.html',
    styleUrls: ['./guild-statistics.component.css']
})
export class GuildStatisticsComponent implements OnInit, AfterViewInit {
    public selectedGuild: Guild = null;
    public isGuildSelected = false;

    @ViewChild(MatSort) sort: MatSort;
    public overviewData = new MatTableDataSource([]);
    public overviewColumns = ['channelName', 'messageCount', 'average'];

    public guildMessageStatsData: ChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Date', 'Messages per 10 minutes'],
            [new Date(), 1]
        ],
    };

    public memberStatsData: ChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Date', 'Total Member Count', 'Online Member Count'],
            [new Date(), 1, 0]
        ],
    };

    public labels: String[] = [];
    public to = new Date();
    public from = new Date(this.to.getTime() - (1000 * 60 * 60 * 24)) ;

    constructor(public guildService: GuildService,
                private loginService: LoginService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private snackbar: MatSnackBar) {}

    ngAfterViewInit() {
        this.overviewData.sort = this.sort;
    }

    async ngOnInit() {
        const success = await selectGuildOrRouteIndex(this.router, this.activatedRoute.paramMap, this.guildService);
        if (success) {
            this.selectedGuild = this.guildService.selectedGuild;
            this.isGuildSelected = true;
        }
    }

    fetchStats(type: string) {
        const headers = {
            token: this.loginService.getToken()
        };
        const params = {
            from: this.from.getTime().toString(),
            to: this.to.getTime().toString(),
        };
        if (type === 'guildMessages') {
            const url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/messageStats`;
            this.http.get(url, { params, headers })
                     .subscribe((stats) => this.processSingleStats(stats as Stat[]),
                                this.handleStatFetchError);
        } else if (type === 'overview') {
            const url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/statsOverview`;
            this.http.get(url, { params, headers })
                     .subscribe((stats) => this.processOverviewStats(stats as StatsOverview),
                                (error) => this.handleStatFetchError(error));
        } else if (type === 'members') {
            const url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/memberStats`;
            this.http.get(url, { params, headers })
                     .subscribe((stats) => this.processMemberStats(stats as MemberStats),
                                (error) => this.handleStatFetchError(error));
        } else {
            return;
        }
    }

    handleStatFetchError(error: any) {
        if (!(error instanceof HttpErrorResponse)) {
            return;
        }

        if (error.status === 418) {
            const snackbar = this.snackbar.open('Statistics aren\'t enabled for this server.', 'Okay');
            snackbar.onAction().subscribe(() => snackbar.dismiss());
        }
    }

    processOverviewStats(stats: StatsOverview) {
        const averageDivider = stats.delta / (1000 * 60 * 10);
        const data = [];
        for (const channelName of Object.keys(stats.channelStats)) {
            const messageCount = stats.channelStats[channelName];
            data.push({ channelName, messageCount, average: messageCount / averageDivider });
        }
        this.overviewData = new MatTableDataSource(data);
        this.overviewData.sort = this.sort;
    }

    processSingleStats(stats: Stat[]) {
        this.guildMessageStatsData = {
            chartType: 'LineChart',
            dataTable: [
                ['Date', 'Messages per 10 minutes'], ...stats.map((stat) => [(new Date(stat.date * 1000)), stat.count])
            ],
        };
    }

    processMemberStats(stats: MemberStats) {
        this.memberStatsData = {
            chartType: 'LineChart',
            dataTable: [
                ['Date', 'Total Member Count', 'Online Member Count'],
                ...(stats.onlineStats.map((stat, i) => [new Date(stat.date * 1000), stats.totalStats[i].count, stats.onlineStats[i].count]))
            ]
        };
    }

    onDateChange(event: MatDatepickerInputEvent<Date>, type: string) {
        console.log(event);
        if (type === 'from') {
            this.from = event.value;
        } else if (type === 'to') {
            this.to = event.value;
        } else {

        }
    }

    onValidateDate(type: string): (date: Date) => boolean {
        if (type === 'from') {
            return (date: Date) => date < this.to;
        } else if (type === 'to') {
            return (date: Date) => date > this.from;
        } else {
            return () => false;
        }
    }
}
