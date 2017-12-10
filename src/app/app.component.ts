import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoginService } from './login.service';
import { Guild } from './entities/guild';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { GuildService } from './guild.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public title: String;
    public isLogged = false;
    public guilds: Guild[] = [];

    constructor(private http: HttpClient,
                private router: Router,
                private loginService: LoginService,
                private guildService: GuildService) {}

    public ngOnInit() {
        this.isLogged = this.loginService.isLoggedIn();
        this.loginService.subscription()
            .subscribe((loggedStatus) => {
                this.isLogged = loggedStatus;
                this.populateGuilds();
            });

        this.populateGuilds();
    }

    public onGuildClick(guild: Guild) {
        this.router.navigate([`guild/${guild.id}`]);
    }

    private async populateGuilds() {
        this.guilds = await this.guildService.fetchGuilds();
    }
}
