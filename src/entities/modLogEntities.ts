import { User } from "./user";

export interface Ban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    expirationTime?: number;
    unbanned: boolean;
    reason: string;
}

export interface Softban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}

export interface Hardban {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}

export interface Kick {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}

export interface Mute {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    expirationTime?: number;
    unmuted: boolean;
    reason: string;
}

export interface Warn {
    id: number;
    user: User;
    moderatorUser: User;
    actionTime: number;
    reason: string;
}
