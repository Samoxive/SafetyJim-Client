import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatSliderModule,
         MatToolbarModule,
         MatMenuModule,
         MatIconModule,
         MatExpansionModule,
         MatTooltipModule,
         MatGridListModule,
         MatListModule,
         MatTabsModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { GuildService } from './guild.service';
import { GuildComponent } from './guild/guild.component';
import { LoggedUserComponent } from './logged-user/logged-user.component';
import { CommandsComponent } from './commands/commands.component';
import { GuildHomeComponent } from './guild-home/guild-home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'commands', component: CommandsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'guild/:id', component: GuildComponent, children: [
        { path: '', component:  GuildHomeComponent }
    ]}
];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        GuildComponent,
        GuildHomeComponent,
        LoggedUserComponent,
        CommandsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatButtonModule,
        MatSliderModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatExpansionModule,
        MatTooltipModule,
        MatGridListModule,
        MatListModule,
        MatTabsModule,
        HttpClientModule
    ],
    providers: [
        LoginService,
        GuildService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
