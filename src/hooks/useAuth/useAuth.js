/**
 * @file useAuth.js
 * @brief Module for the hook use Authentification.
 */
import { useContext } from "react"
import AuthContext from "context/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth
