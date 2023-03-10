import { useMsal } from '@azure/msal-react'
import { useAuth } from './hooks/useAuth'

export const SignInButton = () => {
  const { initLogin } = useAuth()

  return (
    <button className="ml-auto" onClick={initLogin}>
      Sign in using Popup
    </button>
  )
}

export const SignOutButton = () => {
  const { initLogout } = useAuth()

  return (
    <button className="ml-auto" onClick={initLogout}>
      Sign out
    </button>
  )
}
