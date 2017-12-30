import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Guild } from './entities/guild';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class GuildService {
    private guildsObservable: Observable<any>;
    private guilds: Guild[] = [];
    private fetchingGuilds = false;

    constructor(private http: HttpClient,
                private loginService: LoginService) {}

    public fetchGuilds(): Promise<Guild[]> {
        if (this.loginService.isLoggedIn()) {
            const token = this.loginService.getToken();
            if (this.guildsObservable == null) {
                this.guildsObservable = this.http.get(environment.apiUrl + '/guilds', { headers: new HttpHeaders().set('token', token) });
            }

            return new Promise((resolve, reject) => {
                this.guildsObservable.subscribe((data) => {
                    this.guilds = data as Guild[];
                    resolve(this.guilds);
                });
            });
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
