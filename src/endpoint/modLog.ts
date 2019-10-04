import axios, { AxiosRequestConfig } from "axios";
import environment from "../environment";
import { getHTTPParams, handleError } from "./utils";
import {
    Bans,
    Softbans,
    Hardbans,
    Mutes,
    Kicks,
    Warns
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

export function fetchBans(
    guild: Guild,
    page?: number
): Promise<Bans | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/bans`, getModLogParams(page))
        .then(response => response.data as Bans)
        .catch(handleError);
}

export function fetchSoftbans(
    guild: Guild,
    page?: number
): Promise<Softbans | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/softbans`, getModLogParams(page))
        .then(response => response.data as Softbans)
        .catch(handleError);
}

export function fetchHardbans(
    guild: Guild,
    page?: number
): Promise<Hardbans | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/hardbans`, getModLogParams(page))
        .then(response => response.data as Hardbans)
        .catch(handleError);
}

export function fetchKicks(
    guild: Guild,
    page?: number
): Promise<Kicks | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/kicks`, getModLogParams(page))
        .then(response => response.data as Kicks)
        .catch(handleError);
}

export function fetchMutes(
    guild: Guild,
    page?: number
): Promise<Mutes | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/mutes`, getModLogParams(page))
        .then(response => response.data as Mutes)
        .catch(handleError);
}

export function fetchWarns(
    guild: Guild,
    page?: number
): Promise<Warns | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/warns`, getModLogParams(page))
        .then(response => response.data as Warns)
        .catch(handleError);
}
