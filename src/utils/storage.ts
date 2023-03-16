import config from '@/config'
import { AuthUser } from '@/providers/Auth'

export const getAccessToken = (): string | null => {
  const key = `${config.LOCAL_STORAGE_PREFIX}-user`
  const storedValue = window.localStorage.getItem(key)
  if (!storedValue) return null

  const userData = JSON.parse(storedValue) as AuthUser
  return userData.accessToken
}
