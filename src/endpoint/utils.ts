import { AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-toastify";

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function clearToken(redirectHref: string) {
    window.localStorage.removeItem("token");
    window.location.href = redirectHref;
}

export function getHTTPParams(): AxiosRequestConfig {
    return {
        headers: { token: getToken() ?? "" },
    };
}

export function handleError(error: AxiosError): undefined {
    if (error.response == null) {
        toast.error("Could not communicate with Jim!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return;
    }

    if (error.response.status > 500) {
        toast.error("Jim could not deal with your request!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return;
    }

    if (error.response.status === 401) {
        clearToken(window.location.href);
        return;
    }

    toast.warn(error.response.data as string, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
