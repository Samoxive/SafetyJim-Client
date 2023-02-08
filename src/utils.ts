import { toast } from "react-toastify";
import environment from "./environment";

export function notifyError(message: string) {
    toast.error(message, {
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

export function routeToOauth(route?: string) {
    const { clientId, redirectUrl } = environment;
    const safeRedirectUrl = encodeURIComponent(redirectUrl);
    let url = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${safeRedirectUrl}&response_type=code&scope=identify%20guilds`;
    if (route) {
        url += `&state=${route}`;
    }
    window.location.href = url;
}
