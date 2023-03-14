import { SignInButton, SignOutButton } from './Button'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <h1>Hello to AccessIT 2.0!</h1>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
    </>
  )
}

export default App
