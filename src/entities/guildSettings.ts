import { Channel } from "./channel";
import { Guild } from "./guild";
import { Role } from "./role";

export const GuildSettingsConstants = {
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
    DURATION_TYPE_DAYS: 3,
    PRIVACY_EVERYONE: 0,
    PRIVACY_STAFF_ONLY: 1,
    PRIVACY_ADMIN_ONLY: 2
};

export interface GuildSettings {
    guild: Guild;
    channels: Channel[];
    roles: Role[];
    modLog: boolean;
    modLogChannel: Channel | null
    reportChannel: Channel | null
    holdingRoom: boolean;
    holdingRoomRole: Role | null;
    holdingRoomMinutes: number;
    inviteLinkRemover: boolean;
    welcomeMessage: boolean;
    message: string;
    welcomeMessageChannel: Channel | null;
    joinCaptcha: boolean;
    wordFilter: boolean;
    wordFilterBlocklist: string | null;
    wordFilterLevel: number;
    wordFilterAction: number;
    wordFilterActionDuration: number;
    wordFilterActionDurationType: number;
    inviteLinkRemoverAction: number;
    inviteLinkRemoverActionDuration: number;
    inviteLinkRemoverActionDurationType: number;
    privacySettings: number;
    privacyModLog: number;
    softbanThreshold: number;
    softbanAction: number;
    softbanActionDuration: number;
    softbanActionDurationType: number;
    kickThreshold: number;
    kickAction: number;
    kickActionDuration: number;
    kickActionDurationType: number;
    muteThreshold: number;
    muteAction: number;
    muteActionDuration: number;
    muteActionDurationType: number;
    warnThreshold: number;
    warnAction: number;
    warnActionDuration: number;
    warnActionDurationType: number;
    modsCanEditTags: boolean;
    spamFilter: boolean;
}
