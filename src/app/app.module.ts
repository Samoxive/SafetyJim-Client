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
         MatTabsModule,
         MatSidenavModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { GuildService } from './guild.service';
import { LoggedUserComponent } from './logged-user/logged-user.component';
import { CommandsComponent } from './commands/commands.component';
import { GuildHomeComponent } from './guild-home/guild-home.component';
import { GuildSettingsComponent } from './guild-settings/guild-settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'commands', component: CommandsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'guild/:id', component: GuildHomeComponent },
    { path: 'guild/:id/settings', component: GuildSettingsComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        GuildHomeComponent,
        LoggedUserComponent,
        CommandsComponent,
        GuildSettingsComponent
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
        MatSidenavModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule
    ],
    providers: [
        LoginService,
        GuildService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
