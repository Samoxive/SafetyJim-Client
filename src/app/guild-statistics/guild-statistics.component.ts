import { Component, OnInit, ViewChild } from '@angular/core';
import { selectGuildOrRouteIndex, userNeedsLogin } from '../utils/navigation.utils';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { GuildService } from '../guild.service';
import { Guild } from '../entities/guild';
import { Stat } from '../entities/stat';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatDatepickerInputEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { LoginService } from '../login.service';
import { StatsOverview } from '../entities/stats-overview';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MemberStats } from '../entities/member-stats';
import { Channel } from '../entities/channel';
import { ChannelsStats } from '../entities/channels-stats';

interface ChartData {
    chartType: string;
    dataTable: any[];
    [key: string]: any;
}

@Component({
    selector: 'app-guild-statistics',
    templateUrl: './guild-statistics.component.html',
    styleUrls: ['./guild-statistics.component.css']
})
export class GuildStatisticsComponent implements OnInit, AfterViewInit {
    public selectedGuild: Guild = null;
    public selectedChannel: string = null;
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
        options: {
            height: '600'
        }
    };

    public memberStatsData: ChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Date', 'Total Member Count', 'Online Member Count'],
            [new Date(), 1, 0]
        ],
        options: {
            height: '600'
        }
    };

    public channelStatsData: ChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Date', 'Message Count'],
            [new Date(), 1]
        ],
        options: {
            height: '600'
        }
    };

    public labels: String[] = [];
    public to = new Date();
    public from = new Date(this.to.getTime() - (1000 * 60 * 60 * 24)) ;

    constructor(public guildService: GuildService,
                private loginService: LoginService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private snackbar: MatSnackBar,
                private dialog: MatDialog) {}

    ngAfterViewInit() {
        this.overviewData.sort = this.sort;
    }

    async ngOnInit() {
        const handled = userNeedsLogin(this.loginService, this.dialog);
        if (handled) {
            return;
        }
        const success = await selectGuildOrRouteIndex(this.router, this.activatedRoute.paramMap, this.guildService);
        if (success) {
            this.selectedGuild = this.guildService.selectedGuild;
            this.isGuildSelected = true;
            this.selectedChannel = this.selectedGuild.channels[0].id;
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
        } else if (type === 'channel') {
            if (this.selectedChannel !== '-0') {
                const url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/messageStats/channels/${this.selectedChannel}`;
                this.http.get(url, { params, headers })
                         .subscribe((stats) => this.processChannelStats(stats as Stat[]),
                                    (error) => this.handleStatFetchError(error));
            } else {
                const url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/messageStats/channels`;
                this.http.get(url, { params, headers })
                         .subscribe((stats) => this.processChannelsStats(stats as ChannelsStats),
                                    (error) => this.handleStatFetchError(error));
            }
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
        const averageDivider = stats.delta / (1000 * 60);
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

    processChannelStats(stats: Stat[]) {
        let channel: any = this.selectedGuild.channels.find((c) => this.selectedChannel === c.id);
        channel = channel ? channel.name : 'N/A';
        this.channelStatsData = {
            chartType: 'LineChart',
            dataTable: [
                ['Date', `Message Count in ${channel}`],
                ...stats.map((stat) => [new Date(stat.date * 1000), stat.count])
            ]
        };
    }

    processChannelsStats(stats: ChannelsStats) {
        const mappedData: Map<Date, Map<string, number>> = new Map();

        for (const channelId of Object.keys(stats)) {
            for (const stat of stats[channelId]) {
                const date = new Date(stat.date * 1000);
                if (!mappedData.get(date)) {
                    mappedData.set(date, new Map());
                }
                mappedData.get(date).set(channelId, stat.count);
            }
        }

        const channels = Object.keys(stats).map((id) => this.selectedGuild.channels.find((channel) => channel.id === id))
                                           .filter((channel) => channel != null);

        let data: any[][] = [];
        mappedData.forEach((value, key) => {
            const datum: any[] = [key];
            for (const channel of channels) {
                const count = value.get(channel.id);
                datum.push(count != null ? count : 0);
            }
            data.push(datum);
        });
        data = data.sort((a, b) => a[0] - b[0]);
        /*
        // clear entries with zero stats, as google charts can't handle all-null columns
        if (data.length > 0) {
            const datum = data[0];
            for (let i = 1; i < datum.length; i++) {
                let nonNull = false;
                for (const datum2 of data) {
                    if (datum2[i] != null) {
                        nonNull = true;
                    }
                }

                if (!nonNull) {
                    data.forEach((datum3) => {
                        datum3.splice(i, 1);
                    });
                    // get rid of the channel with zero stats as well
                    channels.splice(i - 1, 1);
                    i = 1;
                }
            }
        }*/

        this.channelStatsData = {
            chartType: 'LineChart',
            dataTable: [
                ['Date', ...channels.map((channel) => channel.name)],
                ...data
            ],
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
