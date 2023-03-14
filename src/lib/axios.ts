import Axios, { InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from '@/utils/storage'
import { API_URL } from '@/config'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json'

  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
}

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
