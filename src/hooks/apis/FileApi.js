/**
 * @file FileApi.js
 * @brief Exports the FileApi.js.
 */
import axios from "axios";
import ENDPOINTS from "common/endpoints";
import { backendAPI } from "common/injectGlobals";
import { saveAs } from "file-saver";
import urlJoin from "url-join";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { axiosApi, axiosApiFormData } from "./axios";
/**
 * @var previewFile
 * @brief previewFile.
 */
export const previewFile = async (projectId, attachementId) => {
  const token = JSON.parse(localStorage.getItem("authTokens"))["access-token"];
  try {
    await axios({
      url: `${backendAPI}/api/user/attachments/preview/${projectId}/${attachementId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/pdf",
      },
      responseType: "blob",
    })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        const fileObjectURL = URL.createObjectURL(response);
        window.open(fileObjectURL);
      });
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de preview de fichiers est survenue!",
    });
  }
};
/**
 * @var downloadFile
 * @brief downloadFile.
 */
export const downloadFile = async (projectId, attachementId, fileName) => {
  const token = JSON.parse(localStorage.getItem("authTokens"))["access-token"];
  try {
    const response = await axios({
      url: urlJoin(
        backendAPI,
        ENDPOINTS.attachement,
        "download",
        projectId.toString(),
        attachementId.toString()
      ),
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    if (response.status === 200) {
      saveAs(response.data, fileName);
    }
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de téléchargement d'un fichier est survenue!",
    });
  }
};
/**
 * @var deleteFileApi
 * @brief deleteFileApi.
 */
export const deleteFileApi = async (attachementId, projectId) => {
  try {
    return await axiosApi({
      endpoint: urlJoin(
        ENDPOINTS.attachement,
        attachementId.toString(),
        projectId.toString()
      ),
      method: "DELETE",
    });
  } catch (error) {
    if (error?.response?.status === 403) {
      SwalWithBootstrapButtons.fire({
        // icon: "error",
        title: "Oops...",
        text: "Vous n'êtes pas autorisé à supprimer ce fichier.",
      });
    } else {
      SwalWithBootstrapButtons.fire({
        // icon: "error",
        title: "Oops...",
        text: "Une erreur de suppression d'un fichier est survenue!",
      });
    }
  }
};
/**
 * @var renommerNameFileApi
 * @brief renommerNameFileApi.
 */
export const renommerNameFileApi = async (id, data) => {
  try {
    return await axiosApi({
      endpoint: urlJoin(ENDPOINTS.attachement, "edit", id.toString()),
      method: "PUT",
      body: data,
    });
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur est survenue FILEAPI!",
    });
  }
};
/**
 * @var addFilesToProjectById
 * @brief addFilesToProjectById.
 */
export const addFilesToProjectById = async (projectId, formData) => {
  try {
    const res = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.attachement, "upload", projectId.toString()),
      method: "POST",
      body: formData,
    });
    return res;
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur est survenue FILEAPI 111!",
    });
  }
};
