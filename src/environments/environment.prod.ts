import {AUTH_CONFIG as config} from './auth0-variables';

const { domain, clientId, audience, apiUrl, errorPath } = config as {
    clientId: string;
    domain: string;
    apiUrl: string;
    appUrl: string;
    audience?: string;
    redirectUri?: string;
    errorPath: string;
};
export const environment = {
    production: true,
    accessToken: '',
    user: null,
    auth: {
        domain,
        clientId,
        ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
        redirectUri: `${window.location.origin}/dashboards`,
        errorPath,
      },
      httpInterceptor: {
        allowedList: [`${apiUrl}/*`],
      },
      fileProcessingUrl: 
  'https://10.179.143.120:447/fileprocessing',
};
