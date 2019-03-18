import {Guild} from './guild';

export interface SelfUser {
    id: string;
    name: string;
    avatarUrl: string;
    guilds: Guild[];
}