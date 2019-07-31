import { Channel } from "./channel";
import { Guild } from "./guild";
import { Role } from "./role";

export const GuildSettingsConstants = {
    SILENT_COMMANDS_MOD_ONLY: 0,
    SILENT_COMMANDS_ALL: 1,
    WORD_FILTER_LEVEL_LOW: 0,
    WORD_FILTER_LEVEL_HIGH: 1,
    ACTION_NOTHING: 0,
    ACTION_WARN: 1,
    ACTION_MUTE: 2,
    ACTION_KICK: 3,
    ACTION_BAN: 4,
    ACTION_SOFTBAN: 5,
    ACTION_HARDBAN: 6,
    DURATION_TYPE_SECONDS: 0,
    DURATION_TYPE_MINUTES: 1,
    DURATION_TYPE_HOURS: 2,
    DURATION_TYPE_DAYS: 3
};

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
    wordFilter: boolean;
    wordFilterBlacklist: string | null;
    wordFilterLevel: number;
    wordFilterAction: number;
    wordFilterActionDuration: number;
    wordFilterActionDurationType: number;
    inviteLinkRemoverAction: number;
    inviteLinkRemoverActionDuration: number;
    inviteLinkRemoverActionDurationType: number;
}
