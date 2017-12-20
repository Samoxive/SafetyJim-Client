import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../entities/user';

@Component({
    selector: 'app-logged-user',
    templateUrl: './logged-user.component.html',
    styleUrls: ['./logged-user.component.css']
})
export class LoggedUserComponent implements OnInit {
    public isLogged = false;
    public username = '';
    public avatarSrc = '';

    constructor(private loginService: LoginService,
                private http: HttpClient) { }

    ngOnInit() {
        this.isLogged = this.loginService.isLoggedIn();
        this.fetchSelf();
        this.loginService.subscription()
            .subscribe((loggedStatus) => {
                this.isLogged = loggedStatus;
                this.fetchSelf();
            });
    }

    logOut() {
        this.loginService.logout();
    }

    async fetchSelf() {
        if (this.isLogged) {
            const user = await this.http.get(`${environment.apiUrl}/self`, { headers: { 'token': this.loginService.getToken() } })
                                 .toPromise()
                                 .then((u) => u as User);

            this.username = `${user.username}#${user.discriminator}`;
            this.avatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        }
    }
}
