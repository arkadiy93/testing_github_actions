import { useMsal } from '@azure/msal-react'
import { useEffect } from 'react'
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser'
import useLocalStorage from './useLocalStorage'

export type AuthUser = {
  accessToken: string
  homeAccountId: string | null
  localAccountId: string | null
  name: string | null
  username: string | null
  expiresOn: Date | null
}

export const useAuth = () => {
  const [user, setUser, removeUser] = useLocalStorage<AuthUser>('user')
  const isAuthenticated: boolean =
    !!user?.expiresOn && user.expiresOn > new Date()
  const isAdmin = false //TODO add admin handling

  const { instance } = useMsal()

  const initLogin = () => {
    const request = {
      scopes: ['openid', 'profile'],
    }
    instance.loginPopup(request)
  }

  const initLogout = () => {
    instance.logoutPopup()
  }

  useEffect(() => {
    const callbackId = instance.addEventCallback((message: EventMessage) => {
      if (message.eventType === EventType.LOGIN_SUCCESS) {
        const { accessToken, expiresOn, account } =
          message.payload as AuthenticationResult

        const user: AuthUser = {
          homeAccountId: account?.homeAccountId ?? null,
          localAccountId: account?.localAccountId ?? null,
          name: account?.name ?? null,
          username: account?.username ?? null,
          expiresOn: expiresOn,
          accessToken,
        }
        setUser(user)
      }

      if (message.eventType === EventType.LOGOUT_SUCCESS) removeUser()
    })

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId)
      }
    }
  })

  return {
    initLogin,
    initLogout,
    isAuthenticated,
    isAdmin,
    user,
  }
}
