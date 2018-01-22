import { Component, OnInit } from '@angular/core';
import { GuildService } from '../guild.service';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Guild } from '../entities/guild';
import { selectGuildOrRouteIndex } from '../utils/navigation.utils';

@Component({
    selector: 'app-guild-home',
    templateUrl: './guild-home.component.html',
    styleUrls: ['./guild-home.component.css']
})
export class GuildHomeComponent implements OnInit {
    public selectedGuild: Guild = null;
    public isGuildSelected = false;

    constructor(public guildService: GuildService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {}

    async ngOnInit() {
        const success = await selectGuildOrRouteIndex(this.router, this.activatedRoute.paramMap, this.guildService);
        if (success) {
            this.changeSelectedGuild(this.guildService.selectedGuild);
        }
    }

    private changeSelectedGuild(guild: Guild) {
        this.selectedGuild = guild;
        this.isGuildSelected = guild == null ? false : true;
    }

}
