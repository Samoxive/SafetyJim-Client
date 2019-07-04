import environment from "./environment";
import cogoToast from "cogo-toast";

export function notifyError(heading: string, message: string) {
    cogoToast.error(message, { position: "top-right", heading });
}

export function routeToOauth(route?: string) {
    const { clientId, redirectUrl } = environment;
    const safeRedirectUrl = encodeURIComponent(redirectUrl);
    let url = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${safeRedirectUrl}&response_type=code&scope=identify`;
    if (route) {
        url += `&state=${route}`;
    }
    window.location.href = url;
}

export function booleanListener(listener: (value: boolean) => any) {
    return (event: any) => {
        listener(event.target.checked);
    };
}

export function stringListener(listener: (value: string) => any) {
    return (event: any) => {
        listener(event.target.value);
    };
}

export function integerListener(listener: (value: number) => any) {
    return (event: any) => {
        listener(Math.floor(parseInt(event.target.value)));
    };
}
