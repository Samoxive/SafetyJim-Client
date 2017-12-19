import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-logged-user',
    templateUrl: './logged-user.component.html',
    styleUrls: ['./logged-user.component.css']
})
export class LoggedUserComponent implements OnInit {
    public isLogged = false;

    constructor(private loginService: LoginService) { }

    ngOnInit() {
        this.isLogged = this.loginService.isLoggedIn();
        this.loginService.subscription()
            .subscribe((loggedStatus) => this.isLogged = loggedStatus);
    }

    logOut() {
        this.loginService.logout();
    }

}
