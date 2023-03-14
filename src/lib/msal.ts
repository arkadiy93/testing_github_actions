import {PublicClientApplication} from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    authority:
      'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
    clientId: '6524f1c8-d5c2-4368-a4bd-24b4fb084f59',
    redirectUri: 'http://localhost:5170',
    postLogoutRedirectUri: 'http://localhost:5170',
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

