/**
 * @file axios.js
 * @brief Exports the axios.js.
 */
import axios from "axios"
import { backendAPI } from "common/injectGlobals"
import urlJoin from "url-join"

/**
 * @var axios.create
 * @brief axios.create.
 */
export default axios.create({
    baseURL: backendAPI,
})
/**
 * @var axiosPrivate
 * @brief axiosPrivate.
 */
export const axiosPrivate = axios.create({
    baseURL: backendAPI,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})
/**
 * @var axiosApi
 * @brief axiosApi.
 */
export const axiosApi = ({ endpoint = "", body = "", headers, method }) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const token = authTokens ? authTokens["access-token"] : null;

    const requestHeaders = {
        ...headers,
        "Content-Type": "application/json"
    };

    if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
    }

    return axios({
        url: urlJoin(backendAPI, endpoint),
        method: method || "POST",
        headers: requestHeaders,
        data: body,
    });

}
/**
 * @var axiosApiFormData
 * @brief axiosApiFormData.
 */
export const axiosApiFormData = ({ endpoint = "", body, headers, method }) => {
    const token = JSON.parse(localStorage.getItem("authTokens"))["access-token"]
    return axios({
        url: urlJoin(backendAPI, endpoint),
        method: method || "POST",
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        data: body,
    })
}
/**
 * @var axiosApiStream
 * @brief axiosApiStream.
 */
export const axiosApiStream = ({ endpoint = "", body, headers, method }) => {
    const token = JSON.parse(localStorage.getItem("authTokens"))["access-token"]
    return axios({
        url: urlJoin(backendAPI, endpoint),
        method: method || "POST",
        headers: {
            ...headers,
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
        data: body,
    })
}
/**
 * @var axiosBlobApi
 * @brief axiosBlobApi.
 */
export const axiosBlobApi = ({ endpoint = "", body = "", headers, method }) => {
    const token = JSON.parse(localStorage.getItem("authTokens"))["access-token"]
    return axios({
        url: urlJoin(backendAPI, endpoint),
        method: method || "POST",
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
        data: body,
    })
}

/** @brief api for reset forgotten password */
/**
 * @var resetPasswordApi
 * @brief resetPasswordApi.
 */
export const resetPasswordApi = async ({ newPassword, confirmPassword, token }) => {
    try {
        const response = await axiosApi({
            endpoint: `/reset-password?token=${token}`,
            body: JSON.stringify({
                newPassword,
                confirmPassword,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            params: { token: token },
        });

        return { success: true, data: response.data };
    } catch (error) {
        // Handle any errors here
        console.error("Error in resetPasswordApi: ", error);
        return { success: false, message: error.response?.data || "An error occurred" };
    }
};
