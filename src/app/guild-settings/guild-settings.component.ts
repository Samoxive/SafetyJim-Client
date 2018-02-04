import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { GuildSettings } from '../entities/guild-settings';
import { userNeedsLogin, selectGuildOrRouteIndex } from '../utils/navigation.utils';
import { GuildService } from '../guild.service';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Guild } from '../entities/guild';
import { environment } from '../../environments/environment';
import { AbstractControl } from '@angular/forms/src/model';
import { dismissableSnackbar } from '../utils/snackbar.utils';

@Component({
    selector: 'app-guild-settings',
    templateUrl: './guild-settings.component.html',
    styleUrls: ['./guild-settings.component.css']
})
export class GuildSettingsComponent implements OnInit {
    public selectedGuild: Guild = null;
    public isGuildSelected = false;

    prefix = new FormControl('-mod', [Validators.required]);
    noSpacePrefix = new FormControl(false, [Validators.required]);
    modLog = new FormControl(false, [Validators.required]);
    modLogChannel = new FormControl(null, [Validators.required]);
    holdingRoom = new FormControl(false, [Validators.required, this.holdingRoomValidator.bind(this)]);
    holdingRoomRole = new FormControl(null, [Validators.required]);
    holdingRoomMinutes = new FormControl(3, [Validators.required]);
    inviteLinkRemover = new FormControl(false, [Validators.required]);
    welcomeMessage = new FormControl(false, [Validators.required]);
    message = new FormControl('Welcome to $guild $user!', [Validators.required]);
    welcomeMessageChannel = new FormControl(null, [Validators.required]);
    silentCommands = new FormControl(false, [Validators.required]);
    statistics = new FormControl(false, [Validators.required]);

    settings: GuildSettings = {
        id: '321301542093193218',
        modLog: false,
        modLogChannel: null,
        holdingRoom: false,
        holdingRoomRole: null,
        holdingRoomMinutes: 3,
        inviteLinkRemover: false,
        welcomeMessage: false,
        message: 'Welcome to $guild $user!',
        welcomeMessageChannel: null,
        prefix: '-dev',
        silentCommands: false,
        noSpacePrefix: false,
        statistics: false,
        channels: [],
        roles: []
    };

    constructor(public guildService: GuildService,
                private loginService: LoginService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private snackbar: MatSnackBar,
                private dialog: MatDialog) {
        this.prefix.valueChanges.subscribe(console.log);
        this.noSpacePrefix.valueChanges.subscribe(console.log);
        this.modLog.valueChanges.subscribe(console.log);
        this.modLogChannel.valueChanges.subscribe(console.log);
        this.holdingRoom.valueChanges.subscribe(console.log);
        this.holdingRoomRole.valueChanges.subscribe(console.log);
        this.holdingRoomMinutes.valueChanges.subscribe(console.log);
        this.inviteLinkRemover.valueChanges.subscribe(console.log);
        this.welcomeMessage.valueChanges.subscribe(console.log);
        this.message.valueChanges.subscribe(console.log);
        this.welcomeMessageChannel.valueChanges.subscribe(console.log);
        this.silentCommands.valueChanges.subscribe(console.log);
        this.statistics.valueChanges.subscribe(console.log);
    }

    async ngOnInit() {
        const handled = userNeedsLogin(this.loginService, this.dialog);
        if (handled) {
            return;
        }
        const success = await selectGuildOrRouteIndex(this.router, this.activatedRoute.paramMap, this.guildService);
        if (success) {
            this.selectedGuild = this.guildService.selectedGuild;
            this.isGuildSelected = true;
        } else {
            return;
        }

        this.fetchSettings(this.selectedGuild);
    }

    fetchSettings(guild: Guild) {
        const headers = {
            token: this.loginService.getToken()
        };

        this.http.get(`${environment.apiUrl}/guilds/${guild.id}/settings`, { headers })
                 .subscribe((settings) => this.onFetch(settings as GuildSettings));
    }

    saveSettings() {
        const headers = {
            token: this.loginService.getToken(),
            'content-type': 'application/json'
        };

        const settings: GuildSettings = {
            id: this.selectedGuild.id,
            prefix : this.prefix.value,
            noSpacePrefix : this.noSpacePrefix.value,
            modLog : this.modLog.value,
            modLogChannel : {
                id: this.modLogChannel.value,
                name: null,
            },
            holdingRoom : this.holdingRoom.value,
            holdingRoomRole : this.holdingRoomRole.value ? {
                id: this.holdingRoomRole.value,
                name: null
            } : null,
            holdingRoomMinutes : this.holdingRoomMinutes.value,
            inviteLinkRemover : this.inviteLinkRemover.value,
            welcomeMessage : this.welcomeMessage.value,
            message : this.message.value,
            welcomeMessageChannel : {
                id: this.welcomeMessageChannel.value,
                name: null
            },
            silentCommands : this.silentCommands.value,
            statistics : this.statistics.value,
            channels: this.settings.channels,
            roles: this.settings.roles
        };

        this.http.post(`${environment.apiUrl}/guilds/${this.selectedGuild.id}/settings`, settings, { headers })
                 .subscribe(console.log, console.error);
    }

    onFetch(settings: GuildSettings) {
        this.settings = settings;
        this.prefix.setValue(settings.prefix);
        this.noSpacePrefix.setValue(settings.noSpacePrefix);
        this.modLog.setValue(settings.modLog);
        this.modLogChannel.setValue(settings.modLogChannel.id);
        this.holdingRoom.setValue(settings.holdingRoom);
        this.holdingRoomRole.setValue(settings.holdingRoomRole ? settings.holdingRoomRole.id : null);
        this.holdingRoomMinutes.setValue(settings.holdingRoomMinutes);
        this.inviteLinkRemover.setValue(settings.inviteLinkRemover);
        this.welcomeMessage.setValue(settings.welcomeMessage);
        this.message.setValue(settings.message);
        this.welcomeMessageChannel.setValue(settings.welcomeMessageChannel.id);
        this.silentCommands.setValue(settings.silentCommands);
        this.statistics.setValue(settings.statistics);
    }

    holdingRoomValidator(c: AbstractControl) {
        if (c.value) {
            if (this.holdingRoomRole.value == null) {
                dismissableSnackbar(this.snackbar, 'To enable holding room, you need to pick a role first!');
                c.setValue(false);
            }
        }

        return null;
    }

}
