import { Channel } from "./channel";
import { Guild } from "./guild";
import { Role } from "./role";

export function isGuildSettingsValid(settings: GuildSettings): boolean {
    console.log(settings);
    if (!settings.holdingRoomRole) {
        if (settings.holdingRoom || settings.joinCaptcha) {
            return false;
        }
    }

    if (settings.holdingRoom && settings.joinCaptcha) {
        return false;
    }

    return Boolean(
        settings.holdingRoomMinutes ===
            Math.floor(settings.holdingRoomMinutes) &&
            settings.holdingRoomMinutes > 0 &&
            settings.prefix &&
            settings.message
    );
}

export interface GuildSettings {
    guild: Guild;
    channels: Channel[];
    roles: Role[];
    modLog: boolean;
    modLogChannel: Channel;
    holdingRoom: boolean;
    holdingRoomRole?: Role;
    holdingRoomMinutes: number;
    inviteLinkRemover: boolean;
    welcomeMessage: boolean;
    message: string;
    welcomeMessageChannel: Channel;
    prefix: string;
    silentCommands: boolean;
    noSpacePrefix: boolean;
    statistics: boolean;
    joinCaptcha: boolean;
}
