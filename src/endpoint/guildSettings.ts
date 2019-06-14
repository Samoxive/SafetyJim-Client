import { GuildSettings } from "../entities/guildSettings";
import { Guild } from "../entities/guild";
import { getHTTPParams, handleError } from "./utils";
import axios from "axios";
import environment from "../environment";

const { apiUrl } = environment;

export async function fetchSettings(
    guild: Guild
): Promise<GuildSettings | undefined> {
    return await axios
        .get(`${apiUrl}/guilds/${guild.id}/settings`, getHTTPParams())
        .then(response => response.data as GuildSettings)
        .catch(handleError);
}

export async function updateSettings(guild: Guild, newSettings: GuildSettings) {
    await axios
        .post(
            `${apiUrl}/guilds/${guild.id}/settings`,
            newSettings,
            getHTTPParams()
        )
        .catch(handleError);
}

export async function resetSettings(guild: Guild) {
    await axios
        .delete(`${apiUrl}/guilds/${guild.id}/settings`, getHTTPParams())
        .catch(handleError);
}
