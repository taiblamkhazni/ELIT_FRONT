/**
 * @file useAxios.js
 * @brief Module for the hook use Axios private.
 */
import { useEffect } from "react"
import { axiosPrivate } from "hooks/apis/axios"
import useAuth from "hooks/useAuth/useAuth"

const useAxiosPrivate = () => {
    const { authTokens, updateToken } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${authTokens["accessToken"]}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await updateToken()
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [authTokens, updateToken])

    return axiosPrivate
}

export default useAxiosPrivate
