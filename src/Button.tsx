import { useMsal } from '@azure/msal-react'

export const SignInButton = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    const request = {
      scopes: [
        'openid',
        'profile',
        'api://c0c7cebd-50e8-432a-83f4-983c8139f5cf/AffiliatesPortal',
      ],
    }
    instance.loginPopup(request).catch((e) => {
      console.log(e)
    })
  }

  return (
    <button className="ml-auto" onClick={handleLogin}>
      Sign in using Popup
    </button>
  )
}
