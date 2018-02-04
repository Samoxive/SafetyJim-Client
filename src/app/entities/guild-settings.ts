import { Channel } from './channel';
import { Role } from './role';

export interface GuildSettings {
    id: string;
    modLog: boolean;
    modLogChannel: Channel;
    holdingRoom: boolean;
    holdingRoomRole: Role;
    holdingRoomMinutes: number;
    inviteLinkRemover: boolean;
    welcomeMessage: boolean;
    message: string;
    welcomeMessageChannel: Channel;
    prefix: string;
    noSpacePrefix: boolean;
    silentCommands: boolean;
    statistics: boolean;
    channels: Channel[];
    roles: Role[];
}
