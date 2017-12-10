import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Guild } from '../entities/guild';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ParamMap } from '@angular/router/src/shared';
import { GuildService } from '../guild.service';

@Component({
    selector: 'app-guild',
    templateUrl: './guild.component.html',
    styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
    private guild: Guild;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private guildService: GuildService) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const guildId = params.get('id');
            if (guildId == null) {
                this.router.navigate(['']);
            } else {
                this.guildService.getGuild(guildId).then((guild) => {
                    if (guild == null) {
                        this.router.navigate(['']);
                    } else {
                        this.guild = guild;
                    }
                });
            }
        });
    }

}
