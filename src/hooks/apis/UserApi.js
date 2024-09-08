/**
 * @file UserApi.js
 * @brief Exports the UserApi.js.
 */
import ENDPOINTS from "common/endpoints";
import urlJoin from "url-join";
import { Snackbar } from "utils/Snackbar/Snackbar";
import {
  SwalSnackBarError,
  SwalSnackBarSuccess,
  SwalWithBootstrapButtons,
} from "utils/Swal/SwalComponents";

import { axiosApi, axiosApiFormData, axiosBlobApi } from "./axios";

/**
 * @function getUsersApi
 * @brief Retrieve a list of users.
 * @returns {Object[]} - An array containing user data.
 */
export const getUsersApi = async () => {
  try {
    const response = await axiosApi({
      method: "GET",
      endpoint: urlJoin(ENDPOINTS.user, "users"),
    });
    return response.data;
  } catch (error) {
    // TODO: Handle error
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de récupération d'utilisateurs est survenue!",
    });
  }
};

/**
 * @function getUsersByKeywordApi
 * @brief Retrieve users by a keyword.
 * @param {string} keyword - The keyword to search or find users.
 * @returns {Object[]} - An array containing user data matching the keyword.
 */
export const getUsersByKeywordApi = async (keyword) => {
  try {
    const response = await axiosApi({
      method: "GET",
      endpoint: urlJoin(ENDPOINTS.user, "users", `?keyword=${keyword}`),
    });
    return response.data;
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de récupération d'utilisateurs par keyword est survenue!",
    });
  }
};

/**Get user by id
 *
 * @param {*} userId user id
 * @returns user informations
 */
export const getUserById = async (userId) => {
  const response = await axiosApi({
    endpoint: urlJoin(ENDPOINTS.user, userId.toString()),
    method: "GET",
  });
  return response.data;
};

/**Get avatar by user ID
 *
 * @param {*} userId user id
 * @returns if response dosn't containe file return null else return url path to get image
 */
export const getAvatarByUserIdApi = async (userId) => {
  if (!userId) {
    return null;
  }
  const response = await axiosBlobApi({
    endpoint: urlJoin(ENDPOINTS.user, "avatar", userId.toString()),
    method: "GET",
    headers: {
      Accept: "application/pdf",
    },
  });
  if (response.status === 200) {
    if (response.data.size === 0 || response.data.size === 31) {
      return null;
    }
    const fileObjectURL = URL.createObjectURL(response.data);
    return fileObjectURL;
  }
};

/**Update avatar by user Id
 *
 * @param {*} userId user Id
 * @param {*} formData file data multipart
 * @returns if success return response message
 */
export const updateAvatarByUserId = async (userId, formData) => {
  try {
    const res = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.user, "avatar", userId.toString()),
      method: "PUT",
      body: formData,
    });
    return res.data;
  } catch (error) {
    Snackbar(
      "error",
      "Une erreur est survenue lors de l'enregistrement de votre photo !"
    );
  }
};

/**Delete avatar by user Id
 *
 * @param {*} userId id of user
 * @param {*} formData file information
 * @returns response message or if error return snackbar error message
 */
export const deleteAvatarByUserId = async (userId, formData) => {
  try {
    const res = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.user, "avatar", userId.toString()),
      method: "DELETE",
      body: formData,
    });
    return res.data;
  } catch (error) {
    Snackbar(
      "error",
      "Une erreur est survenue, votre photo n'a pas été supprimée !"
    );
  }
};

/**Update user information by ID
 *
 * @param {*} userId user id
 * @param {*} formData new informations for user
 * @returns update user or if error return error message
 */
export const updateUserInfosByUserId = async (userId, formData) => {
  try {
    const res = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.user, "info", userId.toString()),
      method: "PUT",
      body: formData,
    });
    return res.data;
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de mettre à jour de informations d'utilisateur du utilisateur est survenue!",
    });
  }
};

/** Send forgot password email
 *
 * @param {*} email user email
 * @returns response message or error
 */
export const sendForgotPasswordEmailApi = async (email) => {
  try {
    const response = await axiosApi({
      method: "POST",
      endpoint: ENDPOINTS.forgotPassword,
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, message: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data };
  }
};



/**Update password by user Id
 *
 * @param {*} userId user id
 * @param {*} formData informations whith new password
 * @returns if succes return response data or error
 */
export const updatePasswordByUserId = async (userId, formData) => {
  try {
    const res = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.user, "password", userId.toString()),
      method: "PUT",
      body: formData,
    });
    if (res.status === 200) {
      SwalSnackBarSuccess.fire({
        text: res.data,
      });
    }
    return res.data;
  } catch (error) {
    SwalSnackBarError.fire({
      text: error.response.data,
    });
  }
};
