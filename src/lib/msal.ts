import { PublicClientApplication } from '@azure/msal-browser'
import { MSAL_AUTHORITY_URL, MSAL_CLIENT_ID, MSAL_REDIRECT_URL } from "@/config";

export const msalInstance = new PublicClientApplication({
  auth: {
    authority: MSAL_AUTHORITY_URL,
    clientId: MSAL_CLIENT_ID,
    redirectUri: MSAL_REDIRECT_URL,
    postLogoutRedirectUri: MSAL_REDIRECT_URL,
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
