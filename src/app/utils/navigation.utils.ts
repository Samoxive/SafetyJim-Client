import { Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Guild } from '../entities/guild';
import { GuildService } from '../guild.service';

export async function selectGuildOrRouteIndex(router: Router, paramMap: Observable<ParamMap>, guildService: GuildService):
                                                                                                                Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        paramMap.subscribe(async (params) => {
            const guildId = params.get('id');
            if (guildId == null) {
                this.router.navigate(['']);
                res(false);
            } else {
                const success = await guildService.selectGuild(guildId);
                if (!success) {
                    this.router.navigate(['']);
                }
                res(success);
            }
        });
    });
}
