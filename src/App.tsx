import { useIsAuthenticated } from '@azure/msal-react'
import { SignInButton } from './Button'

function App() {
  const isAuthenticated = useIsAuthenticated()

  return (
    <>
      <h1>Hello to AccessIT 2.0!</h1>
      {isAuthenticated ? <span>Signed In</span> : <SignInButton />}
    </>
  )
}

export default App
