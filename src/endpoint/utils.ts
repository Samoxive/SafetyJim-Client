import { AxiosRequestConfig, AxiosError } from "axios";
import cogoToast from "cogo-toast";

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function clearToken(redirectHref: string) {
    window.localStorage.removeItem("token");
    window.location.href = redirectHref;
}

export function getHTTPParams(): AxiosRequestConfig {
    return {
        headers: { token: getToken() ?? "" }
    };
}

export function handleError(error: AxiosError): undefined {
    if (error.response == null) {
        cogoToast.error("Could not communicate with Jim!", {
            position: "top-right",
            heading: "Error"
        });
        return;
    }

    if (error.response.status > 500) {
        cogoToast.error("Jim could not deal with your request!", {
            position: "top-right",
            heading: "Error"
        });
        return;
    }

    if (error.response.status === 401) {
        clearToken(window.location.href);
        return;
    }

    cogoToast.warn(error.response.data, {
        position: "top-right",
        heading: "Warning"
    });
}
