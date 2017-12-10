import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Guild } from './entities/guild';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class GuildService {
    private subscription: Subscription;
    private guilds: Guild[] = [];

    constructor(private http: HttpClient,
                private loginService: LoginService) {}

    public fetchGuilds(): Promise<Guild[]> {
        if (this.loginService.isLoggedIn()) {
            const token = this.loginService.getToken();
            return this.http.get(environment.apiUrl + '/guilds', { headers: new HttpHeaders().set('token', token) })
                            .toPromise()
                            .then((guilds) => this.guilds = guilds as Guild[]);
        } else {
            return Promise.resolve([]);
        }
    }

    public async getGuild(guildId: string): Promise<Guild> {
        if (this.loginService.isLoggedIn() && this.guilds.length === 0) {
            await this.fetchGuilds();
        }
        return this.guilds.filter((guild) => guild.id === guildId)[0];
    }

}
