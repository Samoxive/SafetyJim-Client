import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from './login.service';
import { Guild } from './entities/guild';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { GuildService } from './guild.service';
import { MatSidenav } from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') private sidenav: MatSidenav;
    public mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;
    public title: String;
    public isLogged = false;
    public selectedGuild = null;
    public isGuildSelected = false;
    private sidenavOpenedOnce = false;

    constructor(private http: HttpClient,
                private router: Router,
                private loginService: LoginService,
                public guildService: GuildService,
                private changeDetectorRef: ChangeDetectorRef,
                private media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    public ngOnInit() {
        this.selectedGuild = this.guildService.selectedGuild;
        this.guildService.selectedGuildObservable().subscribe((guild) => {
            this.selectedGuild = guild;
            this.isGuildSelected = !!guild;
        });
        this.isLogged = this.loginService.isLoggedIn();
        this.loginService.subscription()
            .subscribe((loggedStatus) => {
                this.isLogged = loggedStatus;
                this.populateGuilds();
            });

        this.populateGuilds();
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    public onGuildClick(guild: Guild) {
        this.guildService.selectGuild(guild.id);
        if (!this.sidenavOpenedOnce) {
            this.sidenav.open();
            this.sidenavOpenedOnce = true;
        }
    }

    public onSideNavClick(guild: Guild, item: string) {
        if (item === 'stats') {
            this.router.navigate([`guild/${guild.id}/statistics`]);
        } else if (item === 'settings') {
            this.router.navigate([`guild/${guild.id}/settings`]);
        } else {
            return;
        }

        this.sidenav.toggle();
    }

    private async populateGuilds() {
        await this.guildService.fetchGuilds();
    }
}
