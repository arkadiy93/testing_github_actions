import { createContext, PropsWithChildren, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useMsal } from "@azure/msal-react";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser'


export type AuthUser = {
  accessToken: string
  homeAccountId: string
  localAccountId: string
  username: string
  expiresOn: Date
  name: string | undefined
}

export const AuthContext = createContext<{
  user: AuthUser | null
  isAdmin: boolean
  isAuthenticated: boolean
  initLogin: () => void
  initLogout: () => void
}>({
  user: null,
  isAdmin: false,
  isAuthenticated: false,
  initLogin: () => undefined,
  initLogout: () => undefined,
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser, removeUser] = useLocalStorage<AuthUser>('user')
  const isAuthenticated: boolean = !!user && user.expiresOn > new Date()
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

        if (!account) throw new Error('Authenticated user without an account')
        if (!expiresOn) throw new Error('Access token without expire date')

        const user: AuthUser = {
          homeAccountId: account.homeAccountId,
          localAccountId: account.localAccountId,
          name: account.name,
          username: account.username,
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

  const providerProps = {
    user,
    isAdmin,
    isAuthenticated,
    initLogin,
    initLogout,
  }

  return (
      <AuthContext.Provider value={providerProps}>
        {children}
      </AuthContext.Provider>
  )
}
