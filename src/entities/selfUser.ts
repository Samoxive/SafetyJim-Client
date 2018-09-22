import { Guild } from "./Guild";

export interface SelfUser {
    id: string;
    name: string;
    avatarUrl: string;
    guilds: Guild[];
}