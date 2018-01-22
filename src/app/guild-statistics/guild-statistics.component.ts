import { Component, OnInit } from '@angular/core';
import { selectGuildOrRouteIndex } from '../utils/navigation.utils';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { GuildService } from '../guild.service';
import { Guild } from '../entities/guild';
import { Stat } from '../entities/stat';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { LoginService } from '../login.service';

interface ChartData {
    chartType: string;
    dataTable: any[];
}

@Component({
    selector: 'app-guild-statistics',
    templateUrl: './guild-statistics.component.html',
    styleUrls: ['./guild-statistics.component.css']
})
export class GuildStatisticsComponent implements OnInit {
    public selectedGuild: Guild = null;
    public isGuildSelected = false;
    public data: ChartData = {
        chartType: 'LineChart',
        dataTable: [
            ['Date', 'Messages per 10 minutes'],
            ['', 1]
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

    async ngOnInit() {
        const success = await selectGuildOrRouteIndex(this.router, this.activatedRoute.paramMap, this.guildService);
        if (success) {
            this.selectedGuild = this.guildService.selectedGuild;
            this.isGuildSelected = true;
        }
    }

    fetchStats(type: string) {
        let url: string;
        let params: any;
        if (type === 'guildMessages') {
            url = `${environment.apiUrl}/guilds/${this.selectedGuild.id}/messageStats`;
            params = {
                from: this.from.getTime(),
                to: this.to.getTime(),
            };
        } else {
            return;
        }

        const headers = {
            token: this.loginService.getToken()
        };

        this.http.get(url, { params, headers })
                 .subscribe((stats) => this.processSingleStats(stats as Stat[]),
                            (error) => {
                if (!(error instanceof HttpErrorResponse)) {
                    return;
                }

                if (error.status === 418) {
                    const snackbar = this.snackbar.open('Statistics aren\'t enabled for this server.', 'Okay');
                    snackbar.onAction().subscribe(() => snackbar.dismiss());
                }
        });
    }

    processSingleStats(stats: Stat[]) {
        this.data = {
            chartType: 'LineChart',
            dataTable: [
                ['Date', 'Messages per 10 minutes'], ...stats.map((stat) => [(new Date(stat.date * 1000)), stat.count])
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
