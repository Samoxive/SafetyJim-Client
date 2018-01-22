import { Channel } from './channel';

export interface Guild {
    id: string;
    name: string;
    avatarUrl: string;
    channels: Channel[];
}
