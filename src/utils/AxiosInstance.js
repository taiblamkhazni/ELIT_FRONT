/**
 * @file AxiosInstance.js
 * @brief Creates an axios instance with request interception for authentication token management.
 *
 * This file configures an axios instance for making API requests. It includes a request interceptor
 * that appends authentication tokens to each outgoing request and refreshes the token as needed.
 */
import axios from "axios";
import ENDPOINTS from "common/endpoints";
import { backendAPI } from "common/injectGlobals";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

/** @var baseURL Base URL for the API where axios will send requests. */
const baseURL = backendAPI;

/**
 * @var authTokens
 * Authentication tokens of the current user. If tokens are present in localStorage, they will be used.
 */
let authTokens = null;

/**
 * @brief Checks if localStorage is defined, then retrieves and parses the authentication tokens if they exist.
 * If localStorage is not defined or "authTokens" does not exist, 'authTokens' is initialized to 'null'.
 */
if (typeof localStorage !== "undefined") {
  authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
}

/**
 * @var axiosInstance
 * @brief A pre-configured axios instance to send requests to the API.
 */
const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.["access-token"]}` },
});

/**
 * @brief Request interceptor to add the authentication token to each outgoing request and refresh the token if necessary.
 */
axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    if (typeof localStorage !== "undefined") {
      authTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
    }
    req.headers.Authorization = `Bearer ${authTokens?.["access-token"]}`;
  }

  const user = jwtDecode(authTokens?.["access-token"]);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    return req;
  }

  const response = await axios.get(`${baseURL + ENDPOINTS.refreshToken}`, {
    headers: {
      Authorization: authTokens?.["refresh-tokens"],
    },
  });

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("authTokens", JSON.stringify(response.data));
  }
  req.headers.Authorization = `Bearer ${response.data?.["access-token"]}`;

  return req;
});

export default axiosInstance;
