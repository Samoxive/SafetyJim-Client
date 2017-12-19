import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    private eventSubject = new Subject<boolean>();
    private isLogged = localStorage.getItem('token') != null;

    constructor() {}

    public login(token: string) {
        localStorage.setItem('token', token);
        this.isLogged = true;
        this.eventSubject.next(true);
    }

    public logout() {
        localStorage.removeItem('token');
        this.isLogged = false;
        this.eventSubject.next(false);
    }

    public isLoggedIn(): boolean {
        return this.isLogged;
    }

    public subscription(): Observable<boolean> {
        return this.eventSubject.asObservable();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
}
