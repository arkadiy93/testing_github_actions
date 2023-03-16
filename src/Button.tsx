import { useContext } from "react";
import { AuthContext } from "@/providers/Auth";

export const SignInButton = () => {
  const { initLogin } = useContext(AuthContext)

  return (
    <button className="ml-auto" onClick={initLogin}>
      Sign in using Popup
    </button>
  )
}

export const SignOutButton = () => {
  const { initLogout } = useContext(AuthContext)

  return (
    <button className="ml-auto" onClick={initLogout}>
      Sign out
    </button>
  )
}
