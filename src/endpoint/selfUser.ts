import axios from "axios";
import { SelfUser } from "../entities/selfUser";
import { getHTTPParams, handleError } from "./utils";
import environment from "../environment";

const { apiUrl } = environment;

export async function fetchSelfUser(): Promise<SelfUser> {
    return await axios
        .get(`${apiUrl}/@me`, getHTTPParams())
        .then(response => response.data)
        .catch(handleError);
}
