interface AuthConfig {
    clientId: string;
    domain: string;
    apiUrl: string;
    appUrl: string;
    audience?: string;
    redirectUri?: string;
    errorPath: string;

}

export const AUTH_CONFIG: AuthConfig = {
    clientId: 'jFuRyp6jPrXUfLVHupYcnEIsMZdIqEaJ',
    domain:'veneka.eu.auth0.com',
    apiUrl:  'http://localhost:3001',
    appUrl:  'http://localhost:4200',
    audience: 'https://indigoV3/api',
    errorPath: '/error'
};
