//import * as React from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import {
  AuthenticationResult,
  EventMessage,
  EventPayload,
  EventType,
} from '@azure/msal-browser'
import useLocalStorage from './useLocalStorage'

type AuthUser = {
  accessToken: string
  homeAccountId: string
  localAccountId: string
  name: string
  username: string
  expiresOn: Date
}

export const useAuth = () => {
  const [user, setUser, removeUser] = useLocalStorage('user')
  const { instance } = useMsal()

  const isAuthenticated: boolean = user && user.expiresOn > new Date()

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
          homeAccountId: account?.homeAccountId ?? '',
          localAccountId: account?.localAccountId ?? '',
          name: account?.name ?? '',
          username: account?.username ?? '',
          expiresOn: expiresOn ?? new Date(),
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
    user,
  }
}
