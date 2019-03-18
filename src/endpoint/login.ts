import axios from "axios";
import environment from "../environment";
import { handleError } from "./utils";

const { apiUrl } = environment;

export async function getTokenFromApi(code: string) {
    await axios
        .post(`${apiUrl}/login`, null, { params: { code } })
        .then(response => response.data as string)
        .then(token => localStorage.setItem("token", token))
        .catch(handleError);
}
