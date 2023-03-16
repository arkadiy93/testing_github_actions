import { PublicClientApplication } from '@azure/msal-browser'
import config from '@/config'

export const msalInstance = new PublicClientApplication({
  auth: {
    authority: config.MSAL_AUTHORITY_URL,
    clientId: config.MSAL_CLIENT_ID,
    redirectUri: config.MSAL_REDIRECT_URL,
    postLogoutRedirectUri: config.MSAL_REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
  system: {
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
    asyncPopups: false,
  },
})
