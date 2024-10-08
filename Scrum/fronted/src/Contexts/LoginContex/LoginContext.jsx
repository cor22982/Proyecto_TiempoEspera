import { createContext, useState } from "react"

const LoginContext = createContext({ loggedin: false, setLoggedIn: () => {} })

export default LoginContext 