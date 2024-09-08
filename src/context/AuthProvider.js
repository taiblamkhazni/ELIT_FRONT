/**
 * @file AuthProvider.js
 * @brief Fornisseur d'authentification pour l'application
 */
import { createContext, useEffect, useMemo, useState } from "react"
import axios from "axios"
import ENDPOINTS from "common/endpoints"
import { backendAPI } from "common/injectGlobals"
import jwtDecode from "jwt-decode"
import _ from "lodash";
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { setIsRefreshTokenValid, setUser, } from "reducers/authentification/authentificationReducer"
import ROUTES from "routes/routes";
import { Snackbar } from "utils/Snackbar/Snackbar"
import { t } from "utils/translationUtils";

const apiUrl = backendAPI

const AuthContext = createContext({})

/** Authentification Contexte  */
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  )

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resendMail = async (user) => {
    const config = {
      method: "post",
      url: apiUrl + ENDPOINTS.registerAgain,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    }
    try {
      const response = await axios(config);
      if (response?.status === 201) {
        Snackbar("success", t('auth.mailResendSuccess'));
        navigate("/connexion");
        return { success: true }
      }
    } catch (error) {
      if (!_.isNil(error?.response?.data?.message)) {
        Snackbar("error", error?.response?.data?.message);
        return { success: false }
      } else {
        Snackbar("error", t('auth.errors.connectionError'));
        return { success: false };
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registerUser = async (inputs, type) => {
    try {
      const data = JSON.stringify({
        username: (inputs.firstname.charAt(0) + inputs.lastname).toLowerCase(),
        userLastName: inputs.lastname,
        userFirstName: inputs.firstname,
        userEmail: inputs.email,
        userPassword: inputs.password,
        userJob: inputs.role,
        userPasswordConfirmation: inputs.confirmPassword,
      })
      const config = {
        method: "post",
        url: apiUrl + (_.isEqual(type, "register") ? ENDPOINTS.register : ENDPOINTS.registerAgain),
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }
      const response = await axios(config);
      if (type === "register") {
        Snackbar("success", response.data);
        navigate("/receiveMail", { state: { inputs } });
        return { success: true };
      } else if (type === "registerAgain") {
        Snackbar("success", response.data);
        navigate("/connexion");
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || t('auth.errors.inscriptionError') };
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loginUser = async (inputs) => {
    const data = JSON.stringify({
      username: inputs.email,
      password: inputs.password,
    })
    const config = {
      method: "post",
      url: apiUrl + ENDPOINTS.login,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }
    try {
      const response = await axios(config)
      setAuthTokens(response?.data)
      const dataUser = jwtDecode(response?.data["access-token"])
      dispatch(setUser(dataUser))
      localStorage.setItem("authTokens", JSON.stringify(response?.data))
      navigate(from, { replace: true })
      return { success: true };
    } catch (error) {
      if (!_.isNil(error?.response?.data?.message)) {
        Snackbar("error", error?.response?.data?.message);
      } else if (error?.response?.data) {
        if (_.isEqual(error?.response?.data, "Account is not activated")) {
          Snackbar("error", t('auth.errors.accountNotActivated'));
          return { success: false, errorType: "accountNotActivated" };
        }
        Snackbar("error", "L'adresse e-mail n'existe pas.");
      } else {
        Snackbar("error", t('auth.errors.invalidCredentials'));
      }
      return { success: false };
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutUser = () => {
    dispatch(setIsRefreshTokenValid(false))
    dispatch(setUser(null))
    setAuthTokens(null)
    localStorage.removeItem("authTokens")
    localStorage.clear()
    navigate(from, { replace: true })
  }

  const updateToken = async () => {
    const config = {
      method: "get",
      url: apiUrl + ENDPOINTS.refreshToken,
      headers: {
        Authorization: `Bearer ${authTokens["access-token"]}`,
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await axios(config)
      if (response.status === 200) {
        setAuthTokens(response?.data)
        dispatch(setUser(jwtDecode(response?.data["access-token"])))
        localStorage.setItem("authTokens", JSON.stringify(response?.data))
        return response?.data["access-token"]
      } else {
        logoutUser()
      }
    } catch (error) {
      logoutUser()

    }
  }

  useEffect(() => {
    if (authTokens) {
      const decodedToken = jwtDecode(authTokens["refresh-token"])
      const expirationData = decodedToken.exp
      const currentDate = Date.now() / 1000
      if (expirationData >= currentDate) {
        dispatch(setIsRefreshTokenValid(true))
      } else {
        logoutUser()
      }
    } else if (!authTokens && location.pathname !== ROUTES.resetPassword) {
      logoutUser()
    }
    // interval duration 13min
    const intervalDuration = 1000 * 60 * 13
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, intervalDuration)
    return () => clearInterval(interval)
  }, [authTokens])

  const value = useMemo(
    () => ({
      authTokens,
      setAuthTokens,
      resendMail,
      registerUser,
      loginUser,
      logoutUser,
    }),
    [authTokens, resendMail, registerUser, loginUser, logoutUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext