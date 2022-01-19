import { apiUri, audience, clientId, domain } from '../auth_config.json';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    audience,
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: apiUri.map(elem => `${elem}/*`),
  },
};
