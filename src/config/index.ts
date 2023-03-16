const env: Record<string, string> = window._env_ ?? {}

const config = {
  LOCAL_STORAGE_PREFIX: 'accessit-portal',
  API_URL: env.REACT_APP_API_URL ?? 'localhost',
  MSAL_CLIENT_ID:
    env.REACT_APP_MSAL_CLIENT_ID ?? '6524f1c8-d5c2-4368-a4bd-24b4fb084f59',
  MSAL_AUTHORITY_URL:
    env.REACT_APP_MSAL_AUTHORITY_URL ??
    'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
  MSAL_REDIRECT_URL: env.REACT_APP_MSAL_REDIRECT_URL ?? 'http://localhost:5003',
}

export default config
