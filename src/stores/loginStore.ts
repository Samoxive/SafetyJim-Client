import axios from 'axios';
import { observable } from 'mobx';
import environment from '../environment';

const apiUrl = environment.apiUrl;

export class LoginStore {
    @observable
    token = localStorage.getItem('token')

    async getToken(code: string) {
        await axios.post(`${apiUrl}/login`, null, { params: { code } })
                   .then((response) => this.token = response.data as string)
                   .then((token) => localStorage.setItem('token', token))
    }
}