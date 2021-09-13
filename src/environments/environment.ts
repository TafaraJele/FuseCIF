// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
    production: false,
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
      fileProcessingUrl:'https://localhost:44395'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
