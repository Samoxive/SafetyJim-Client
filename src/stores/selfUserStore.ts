import axios from 'axios';
import { observable } from 'mobx';
import { SelfUser } from '../entities/SelfUser';
import environment from '../environment';
import { LoginStore } from './loginStore';

const apiUrl = environment.apiUrl;

export class SelfUserStore {
    @observable
    isLoading = true;
    @observable
    self?: SelfUser;

    async getSelf(loginStore: LoginStore) {
        await axios.get(`${apiUrl}/@me`, { headers: { token: loginStore.token }})
                   .then((response) => { this.self = response.data as SelfUser; this.isLoading = false; });
    }
}