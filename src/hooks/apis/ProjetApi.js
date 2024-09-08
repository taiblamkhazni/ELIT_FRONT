/**
 * @file ProjectApi.js
 * @brief Exports the ProjectApi.js.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi, axiosApiFormData } from "./axios"

/**
 * @var postProjectApi
 * @brief postProjectApi.
 */
export const postProjectApi = async (formData) => {
  const res = await axiosApiFormData({
    endpoint: ENDPOINTS.projects,
    method: "POST",
    body: formData,
  });
  return res.data;
}

/**
 * @var getProjectsApi
 * @brief getProjectsApi.
 */
export const getProjectsApi = async () => {
  try {
    const response = await axiosApi({
      endpoint: ENDPOINTS.projects,
      method: "GET",
    })
    return response.data
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      title: "Oops...",
      text: "Une erreur de récupération de projets est survenue!",
    })
  }
}

/**
 * @var deleteProjectApi
 * @brief deleteProjectApi.
 */
export const deleteProjectApi = async (projectId) => {
  const response = await axiosApi({
    endpoint: urlJoin(ENDPOINTS.projects, projectId.toString()),
    method: "DELETE",
  });
  return response;
};
/**
 * @var updateProjectApi
 * @brief updateProjectApi.
 */
export const updateProjectApi = async (projectId, formData) => {
  try {
    const response = await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.projects, projectId.toString()),
      method: "PUT",
      body: formData,
    });
    return response.data;
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      title: "Oops...",
      text: "Une erreur est survenue lors de la mise à jour du projet!",
    });
  }
}
/**
 * @var validationProjectApi
 * @brief validationProjectApi.
 */
export const validationProjectApi = async (projectId, status) => {
  try {
    const response = await axiosApi({
      endpoint: urlJoin(ENDPOINTS.adminProjects, projectId.toString()),
      method: "PUT",
      body: { isConfirmed: status },
    });
    return response;
  } catch (error) {
    if (status === true) {
      if (error?.response?.data?.message) {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message,
        });
      } else if (error?.response?.data) {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      } else {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: "Une erreur pour confirmer le projet est survenue!",
        });
      }
    } else if (status === false) {
      if (error?.response?.data?.message) {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message,
        });
      } else if (error?.response?.data) {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: error?.response?.data,
        });
      } else {
        SwalWithBootstrapButtons.fire({
          // icon: "error",
          title: "Oops...",
          text: "Une erreur pour rejeter le projet est survenue!",
        });
      }
    }
  }
}

/**
 * @var deleteColabProjectApi
 * @brief deleteColabProjectApi.
 */
export const deleteColabProjectApi = async (projectId, collabId) => {
  try {
    return await axiosApi({
      endpoint: urlJoin(
        ENDPOINTS.projects,
        projectId.toString(),
        "delete-contributor",
        collabId.toString()
      ),
      method: "DELETE",
    })
  } catch (error) {
    if (error?.response?.status === 403) {
      SwalWithBootstrapButtons.fire({
        // icon: "error",
        title: "Oops...",
        text: "Vous n'êtes pas autorisé à supprimer ce collaborateur.",
      })
    }
  }
}

/**
 * @var addColabByIdForProjectId
 * @brief addColabByIdForProjectId.
 */
export const addColabByIdForProjectId = async (formData, projectId) => {
  try {
    return await axiosApiFormData({
      endpoint: urlJoin(ENDPOINTS.projects, projectId.toString(), "add-contributor"),
      method: "POST",
      body: formData,
    })
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Oops...",
      text: "Une erreur est survenue lors de la création de projet. Veuillez réessayer plus tard.",
    })
  }
}

// New APIs
/**
 * @var getProjetById
 * @brief getProjetById.
 */
export const getProjetById = async (projectId) => {
  try {
    const response = await axiosApi({
      endpoint: urlJoin(ENDPOINTS.projects, "getdata", projectId.toString()),
      method: "GET",
    })
    return response.data
  } catch (error) {
    SwalWithBootstrapButtons.fire({
      // icon: "error",
      title: "Oops...",
      text: "Une erreur de récupération d'un projet est survenue!",
    })
  }
}
/**
 * @var getProjectsNewApi
 * @brief getProjectsNewApi.
 */
export const getProjectsNewApi = async () => {
  // try {
  const response = await axiosApi({
    endpoint: ENDPOINTS.newProjectsApi,
    method: "GET",
  })
  return response.data
}
