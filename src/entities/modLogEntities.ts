import { User } from "./user";

type ModLogResponse<T> = {
    currentPage: number;
    totalPages: number;
    entries: T[];
};

export interface Ban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    expirationTime?: number;
    unbanned: boolean;
    reason: string;
}
export type Bans = ModLogResponse<Ban>;

export interface Softban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}
export type Softbans = ModLogResponse<Softban>;

export interface Hardban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}
export type Hardbans = ModLogResponse<Hardban>;

export interface Kick {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}
export type Kicks = ModLogResponse<Kick>;

export interface Mute {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    expirationTime?: number;
    unmuted: boolean;
    reason: string;
}
export type Mutes = ModLogResponse<Mute>;

export interface Warn {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}
export type Warns = ModLogResponse<Warn>;
