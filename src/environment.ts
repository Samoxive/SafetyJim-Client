export const environment = process.env.NODE_ENV === 'production' ? {
    clientId: '313749262687141888',
    apiUrl: 'https://api.safetyjim.xyz',
    redirectUrl: 'https://safetyjim.xyz/login'
} : {
    clientId: '322714040344510464',
    apiUrl: 'http://localhost:8080',
    redirectUrl: 'http://localhost:3000/login'
};

export function routeToOauth(route?: string) {
    let url = `https://discordapp.com/api/oauth2/authorize?client_id=${environment.clientId}&redirect_uri=${encodeURIComponent(environment.redirectUrl)}&response_type=code&scope=identify`;
    if (route) {
        url += `&state=${route}`;
    }
    location.href = url;
}

export default environment;