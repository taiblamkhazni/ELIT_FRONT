/**
 * @file projectsAdminSaga.js
 * @brief Ce fichier contient les sagas liées au Project Admin.
 *
 */
import { getProjectsAdmin } from "hooks/apis/AdminApi"
import { getProjectsAdminSuccess } from "reducers/admin/projects/projectsAdminReducer"
import { call, put, takeEvery } from "redux-saga/effects"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
/**
 * workGetProjectsAdminFetch
 * @brief Saga to fetch projects under super admin rights.
 *
 * This function tries to retrieve the list of projects using the provided API.
 * Upon successful retrieval, it dispatches a success action.
 * If there's an error during the fetching process, a Swal alert is triggered to notify the user.
 */
export function* workGetProjectsAdminFetch() {
    try {
        const projects = yield call(getProjectsAdmin)
        yield put(getProjectsAdminSuccess(projects))
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de la récupération de la liste projets sous super admin est survenue!",
        })
    }
}
/**
 * projectsAdminSaga
 * @brief Primary saga listener for Project Admin-related actions.
 *
 * This saga listens for specific actions related to Project Admin and triggers the respective worker saga.
 */
export function* projectsAdminSaga() {
    yield takeEvery(
        "projectsAdminReducer/getProjectsAdminFetch",
        workGetProjectsAdminFetch
    )
}


