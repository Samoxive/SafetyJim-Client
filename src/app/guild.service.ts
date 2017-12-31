import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Guild } from './entities/guild';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GuildService {
    private guildsObservable: Observable<any>;
    public guilds: Guild[] = [];
    public selectedGuild: Guild = null;
    public selectedGuildSubject = new Subject<Guild>();
    private fetchedGuilds = false;
    private fetchingGuilds = false;

    constructor(private http: HttpClient,
                private loginService: LoginService) {}

    public fetchGuilds(): Promise<Guild[]> {
        if (this.fetchedGuilds) {
            return Promise.resolve(this.guilds);
        }

        if (this.loginService.isLoggedIn()) {
            const token = this.loginService.getToken();
            if (!this.fetchingGuilds) {
                this.guildsObservable = this.http.get(environment.apiUrl + '/guilds', { headers: new HttpHeaders().set('token', token) });
            }

            return new Promise((resolve, reject) => {
                this.guildsObservable.subscribe((data) => {
                    this.guilds = data as Guild[];
                    this.fetchingGuilds = false;
                    this.fetchedGuilds = true;
                    resolve(this.guilds);
                });
            });
        } else {
            return Promise.resolve([]);
        }
    }

    // returns true == success
    public async selectGuild(guildId: string): Promise<boolean> {
        if (!this.fetchedGuilds) {
            await this.fetchGuilds();
        }

        const g = this.guilds.filter((guild) => guildId === guild.id)[0];
        if (g == null) {
            return false;
        } else {
            this.selectedGuild = g;
            this.selectedGuildSubject.next(g);
            return true;
        }
    }

    public selectedGuildObservable(): Observable<Guild> {
        return this.selectedGuildSubject.asObservable();
    }
}
