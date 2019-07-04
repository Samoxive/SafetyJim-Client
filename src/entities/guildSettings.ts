import { Channel } from "./channel";
import { Guild } from "./guild";
import { Role } from "./role";

export interface GuildSettings {
    guild: Guild;
    channels: Channel[];
    roles: Role[];
    modLog: boolean;
    modLogChannel: Channel;
    holdingRoom: boolean;
    holdingRoomRole: Role | null;
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
    silentCommandsLevel: number;
    modActionConfirmationMessage: boolean;
}
