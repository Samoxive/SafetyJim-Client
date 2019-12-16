import axios, { AxiosRequestConfig } from "axios";
import environment from "../environment";
import { getHTTPParams, handleError } from "./utils";
import {
    Bans,
    Softbans,
    Hardbans,
    Mutes,
    Kicks,
    Warns,
    Softban,
    Kick,
    Hardban,
    Ban,
    Mute,
    Warn,
    ModLogEntity,
    ModLogResponse
} from "../entities/modLogEntities";
import { Guild } from "../entities/guild";

const { apiUrl } = environment;

function getModLogParams(page?: number): AxiosRequestConfig {
    const params = getHTTPParams();
    if (page != null) {
        params.params = { page };
    }

    return params;
}

type EntityType = "ban" | "softban" | "hardban" | "kick" | "mute" | "warn";

export function fetchEntities<EntityT extends ModLogEntity>(
    entityType: EntityType,
    guild: Guild,
    page?: number
): Promise<ModLogResponse<EntityT> | undefined> {
    return axios
        .get(
            `${apiUrl}/guilds/${guild.id}/${entityType}s`,
            getModLogParams(page)
        )
        .then(response => response.data as ModLogResponse<EntityT>)
        .catch(handleError);
}

export function fetchEntity<EntityT extends ModLogEntity>(
    entityType: EntityType,
    guild: Guild,
    id: number
): Promise<EntityT | undefined> {
    return axios
        .get(
            `${apiUrl}/guilds/${guild.id}/${entityType}s/${id}`,
            getHTTPParams()
        )
        .then(response => response.data as EntityT)
        .catch(handleError);
}

export function updateEntity<EntityT extends ModLogEntity>(
    entityType: EntityType,
    guild: Guild,
    entity: EntityT
): Promise<boolean> {
    return axios
        .post(
            `${apiUrl}/guilds/${guild.id}/${entityType}s/${entity.id}`,
            entity,
            getHTTPParams()
        )
        .then(() => true)
        .catch(handleError)
        .then(() => false);
}

export function fetchBans(
    guild: Guild,
    page?: number
): Promise<Bans | undefined> {
    return fetchEntities<Ban>("ban", guild, page);
}

export function fetchBan(guild: Guild, id: number): Promise<Ban | undefined> {
    return fetchEntity<Ban>("ban", guild, id);
}

export function updateBan(guild: Guild, ban: Ban): Promise<boolean> {
    return updateEntity("ban", guild, ban);
}

export function fetchSoftbans(
    guild: Guild,
    page?: number
): Promise<Softbans | undefined> {
    return fetchEntities<Softban>("softban", guild, page);
}

export function fetchSoftban(
    guild: Guild,
    id: number
): Promise<Softban | undefined> {
    return fetchEntity<Softban>("softban", guild, id);
}

export function updateSoftban(
    guild: Guild,
    softban: Softban
): Promise<boolean> {
    return updateEntity("softban", guild, softban);
}

export function fetchHardbans(
    guild: Guild,
    page?: number
): Promise<Hardbans | undefined> {
    return fetchEntities<Hardban>("hardban", guild, page);
}

export function fetchHardban(
    guild: Guild,
    id: number
): Promise<Hardban | undefined> {
    return fetchEntity<Hardban>("hardban", guild, id);
}

export function updateHardban(
    guild: Guild,
    hardban: Hardban
): Promise<boolean> {
    return updateEntity("hardban", guild, hardban);
}

export function fetchKicks(
    guild: Guild,
    page?: number
): Promise<Kicks | undefined> {
    return fetchEntities<Kick>("kick", guild, page);
}

export function fetchKick(guild: Guild, id: number): Promise<Kick | undefined> {
    return fetchEntity<Kick>("kick", guild, id);
}

export function updateKick(guild: Guild, kick: Kick): Promise<boolean> {
    return updateEntity("kick", guild, kick);
}

export function fetchMutes(
    guild: Guild,
    page?: number
): Promise<Mutes | undefined> {
    return fetchEntities<Mute>("mute", guild, page);
}

export function fetchMute(guild: Guild, id: number): Promise<Mute | undefined> {
    return fetchEntity<Mute>("mute", guild, id);
}

export function updateMute(guild: Guild, mute: Mute): Promise<boolean> {
    return updateEntity("mute", guild, mute);
}

export function fetchWarns(
    guild: Guild,
    page?: number
): Promise<Warns | undefined> {
    return fetchEntities<Warn>("warn", guild, page);
}

export function fetchWarn(guild: Guild, id: number): Promise<Warn | undefined> {
    return fetchEntity<Warn>("warn", guild, id);
}

export function updateWarn(guild: Guild, warn: Warn): Promise<boolean> {
    return updateEntity("warn", guild, warn);
}
