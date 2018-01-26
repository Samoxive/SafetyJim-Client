import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private http: HttpClient,
                private router: Router,
                private loginService: LoginService) {}

    async ngOnInit() {
        if (this.loginService.isLoggedIn()) {
            return;
        }

        const url = new URL(location.toString());
        if (!url.searchParams.has('code')) {
            let discordLoginUrl = 'https://discordapp.com/api/oauth2/authorize?' +
                'client_id=' + environment.clientId +
                '&redirect_uri=' + environment.redirectUri +
                '&response_type=code' +
                '&scope=guilds%20identify';

            if (url.searchParams.has('redirectRoute')) {
                discordLoginUrl += '&state=' + url.searchParams.get('redirectRoute');
            }

            location.replace(discordLoginUrl);
        } else {
            const code = url.searchParams.get('code');
            const tokenPromise = this.http.get(environment.apiUrl + '/login?code=' + code)
                                          .toPromise();

            try {
                const token = (await tokenPromise).toString();
                this.loginService.login(token);
            } finally {
                if (url.searchParams.has('state')) {
                    const redirect = atob(decodeURI(url.searchParams.get('state')));
                    this.router.navigateByUrl(redirect);
                } else {
                    this.router.navigateByUrl('/');
                }
            }
        }
    }

}
