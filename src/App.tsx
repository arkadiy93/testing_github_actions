import { SignInButton, SignOutButton } from './Button'
import { useContext } from 'react'
import { AuthContext } from '@/providers/Auth'

function App() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <h1>Hello to AccessIT 2.0!</h1>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
    </>
  )
}

export default App
