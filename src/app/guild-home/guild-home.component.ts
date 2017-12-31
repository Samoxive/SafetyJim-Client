import { Component, OnInit } from '@angular/core';
import { GuildService } from '../guild.service';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Guild } from '../entities/guild';

@Component({
    selector: 'app-guild-home',
    templateUrl: './guild-home.component.html',
    styleUrls: ['./guild-home.component.css']
})
export class GuildHomeComponent implements OnInit {
    public selectedGuild: Guild;
    public isGuildSelected = false;

    constructor(public guildService: GuildService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.changeSelectedGuild(guildService.selectedGuild);
        this.guildService.selectedGuildObservable().subscribe((guild) => this.changeSelectedGuild(guild));
    }

    async ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const guildId = params.get('id');
            if (guildId == null) {
                this.router.navigate(['']);
            } else {
                this.guildService.selectGuild(guildId).then((success) => {
                    if (!success) {
                        this.router.navigate(['']);
                    } else {
                        this.changeSelectedGuild(this.guildService.selectedGuild);
                    }
                });
            }
        });
    }

    private changeSelectedGuild(guild: Guild) {
        this.selectedGuild = guild;
        this.isGuildSelected = guild == null ? false : true;
    }

}
