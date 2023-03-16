const env = window._env_

export const LOCAL_STORAGE_PREFIX = 'accessit-portal'
export const API_URL: string = env.REACT_APP_API_URL
export const MSAL_CLIENT_ID: string = env.REACT_APP_MSAL_CLIENT_ID;
export const MSAL_AUTHORITY_URL: string = env.REACT_APP_MSAL_AUTHORITY_URL;
export const MSAL_REDIRECT_URL: string = env.REACT_APP_MSAL_REDIRECT_URL;
