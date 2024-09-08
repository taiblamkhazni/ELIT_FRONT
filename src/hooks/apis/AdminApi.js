/**
 * @file AdminApi.js
 * @brief Exports the AdminApi.js.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from "./axios"

/**
 * @var getProjectsAdmin
 * @brief getProjectsAdmin.
 */
export const getProjectsAdmin = async () => {
    const response = await axiosApi({
        endpoint: ENDPOINTS.adminProjects,
        method: "GET",
    })
    return response.data
}
/**
 * @var putStateProject
 * @brief putStateProject.
 */
export const putStateProject = async (projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.adminProjects, projectId.toString()),
            method: "PUT",
            body: JSON.stringify({
                isConfirmed: true,
            }),
        })
        if (response.status === 200) {
            SwalWithBootstrapButtons.fire({
                title: "Validation du projet",
                text: "Validation avec success",
                cancelButtonColor: "#C91432",
                confirmButtonColor: "#10B581",
                confirmButtonText: "Oui",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(getProjectsAdminFetch())
                }
            })
        }
        return { error: false };
    } catch (error) {
        // TODO: Handle error
        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur lors de la mise à jour du projet est survenue!",
        })
        return { error: true };
    }
}
/**
 * @var deleteProjectAdminApi
 * @brief deleteProjectAdminApi.
 */
export const deleteProjectAdminApi = async (projectId) => {
    const response = await axiosApi({
        endpoint: urlJoin(ENDPOINTS.adminProjects, projectId.toString()),
        method: "DELETE",
    });
    return response;
};
