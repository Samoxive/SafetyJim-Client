import axios from 'axios';
import {computed, observable} from 'mobx';
import {Guild} from '../entities/guild';
import {GuildSettings, isGuildSettingsValid} from '../entities/guildSettings';
import environment from '../environment';
import {LoginStore} from './loginStore';

const apiUrl = environment.apiUrl;

export class GuildSettingsStore {
    @observable isLoading = true;
    @observable settings = observable.map<string, GuildSettings>();

    @computed
    get guildSettingsGetter() {
        return (id: string) => this.settings.get(id);
    }

    async fetchSettings(loginStore: LoginStore, guild: Guild) {
        this.isLoading = true;
        await axios
            .get(
                `${apiUrl}/guilds/${guild.id}/settings`,
                {headers: {token: loginStore.token}})
            .then((response) => {
                this.settings.set(guild.id, response.data as GuildSettings);
                this.isLoading = false;
            });
    }

    async updateSettings(
        loginStore: LoginStore, guild: Guild, newSettings: GuildSettings) {
        if (!isGuildSettingsValid(newSettings)) {
            throw new Error('Invalid guild settings to update!');
        }

        await axios.post(
            `${apiUrl}/guilds/${guild.id}/settings`, newSettings,
            {headers: {token: loginStore.token}});
        await this.fetchSettings(loginStore, guild);
    }

    async resetSettings(loginStore: LoginStore, guild: Guild) {
        await axios.delete(
            `${apiUrl}/guilds/${guild.id}/settings`,
            {headers: {token: loginStore.token}});
        await this.fetchSettings(loginStore, guild);
    }
}