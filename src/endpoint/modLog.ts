import axios from "axios";
import environment from "../environment";
import { getHTTPParams, handleError } from "./utils";
import { Ban, Softban, Hardban, Mute, Warn } from "../entities/modLogEntities";
import { Guild } from "../entities/guild";

const { apiUrl } = environment;

export function fetchBans(guild: Guild): Promise<Ban[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/bans`, getHTTPParams())
        .then(response => response.data as Ban[])
        .catch(handleError);
}

export function fetchSoftbans(guild: Guild): Promise<Softban[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/softbans`, getHTTPParams())
        .then(response => response.data as Softban[])
        .catch(handleError);
}

export function fetchHardbans(guild: Guild): Promise<Hardban[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/hardbans`, getHTTPParams())
        .then(response => response.data as Hardban[])
        .catch(handleError);
}

export function fetchKicks(guild: Guild): Promise<Softban[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/kicks`, getHTTPParams())
        .then(response => response.data as Softban[])
        .catch(handleError);
}

export function fetchMutes(guild: Guild): Promise<Mute[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/mutes`, getHTTPParams())
        .then(response => response.data as Mute[])
        .catch(handleError);
}

export function fetchWarns(guild: Guild): Promise<Warn[] | undefined> {
    return axios
        .get(`${apiUrl}/guilds/${guild.id}/warns`, getHTTPParams())
        .then(response => response.data as Warn[])
        .catch(handleError);
}
