import { Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Guild } from '../entities/guild';
import { GuildService } from '../guild.service';
import { LoginService } from '../login.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

export async function selectGuildOrRouteIndex(router: Router, paramMap: Observable<ParamMap>, guildService: GuildService):
                                                                                                                Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        paramMap.subscribe(async (params) => {
            const guildId = params.get('id');
            if (guildId == null) {
                router.navigate(['']);
                res(false);
            } else {
                const success = await guildService.selectGuild(guildId);
                if (!success) {
                    router.navigate(['']);
                }
                res(success);
            }
        });
    });
}

export function userNeedsLogin(loginService: LoginService, dialog: MatDialog): boolean {
    if (loginService.isLoggedIn()) {
        return false;
    } else {
        dialog.open(LoginDialogComponent, {
            closeOnNavigation: false,
            disableClose: true,
        });
        return true;
    }
}

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'login-dialog.html'
})
export class LoginDialogComponent {
    constructor (private dialog: MatDialogRef<LoginDialogComponent>, private router: Router) {}

    navigateHome() {
        this.router.navigateByUrl('/');
        this.dialog.close();
    }

    login() {
        this.router.navigateByUrl(`/login?redirectRoute=${encodeURI(btoa(location.pathname + location.search))}`);
        this.dialog.close();
    }
}
