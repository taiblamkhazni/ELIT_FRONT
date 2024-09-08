/**
 * @file projectsSaga.js
 * @brief Ce fichier contient les sagas liées à Projects.
 *
 */
import {
    deleteProjectApi,
    getProjectsNewApi,
    getProjetById,
    postProjectApi,
    updateProjectApi} from "hooks/apis/ProjetApi"
import { getProjectSuccess, setProjectId } from "reducers/project/projectReducer"
import {
    deleteProjectSuccess,
    getProjectsSuccess,
    postNewProjectSuccess,
    postUpdateProjectSuccess,
    showProjectCreationSuccessModal,
} from "reducers/projects/projectsReducer"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SwalSnackBarError, SwalSnackBarSuccess,SwalSnackBarSuccessProject } from "utils/Swal/SwalComponents"

/**
 * @function workGetProjectsFetch Saga function for fetching projects.
 */
export function* workGetProjectsFetch() {
    try {
        const projects = yield call(() => getProjectsNewApi())
        yield put(getProjectsSuccess(projects))
    } catch (error) {
      SwalSnackBarError.fire({
            title: "Oops...",
            text: "Une erreur de récupération de projets (new api) est survenue!",
        })
    }
}


/**
 * @function workPostNewProjectFetch Saga function for posting a new project.
 * @param data - The data object.
 */
export function* workPostNewProjectFetch(data) {
    try {
        const project = yield call(() => postProjectApi(data.payload))
        yield put(postNewProjectSuccess(project))
        yield put(setProjectId(project.projectId));
        // Dispatcher l'action pour afficher le modal
        yield put(showProjectCreationSuccessModal());
    } catch (error) {
      SwalSnackBarError.fire({
            title: "Oops...",
            text: "Une erreur est survenue SAGA!",
        })
    }
}

/**
 * @function workUpdateProjectFetch Saga function for updating a project.
 * @param data - The data object.
 */
export function* workUpdateProjectFetch(data) {
    try {
        const updatedProject = yield call(() => updateProjectApi(data.payload.projectId, data.payload))
        const project = yield call(() => getProjetById(data.payload.projectId))
        yield put(postUpdateProjectSuccess(updatedProject))
        yield put(getProjectSuccess(project))
        SwalSnackBarSuccessProject.fire({
            text: "Votre project a bien été modifié"
        })
    } catch (error) {
        SwalSnackBarError.fire({
            title: "Oops...",
            text: "Une erreur est survenue lors de la mise à jour du projet!",
        })
    }
}

/**
 * @function workDeleteProjectFetch Saga function for deleting a project.
 * @param data - The data object.
 */
export function* workDeleteProjectFetch(data) {
    try {
        yield call(() => deleteProjectApi(data.payload))
        yield put(deleteProjectSuccess(data.payload))
        SwalSnackBarSuccess.fire({
            text: "Le projet a été bien supprimé !",
            timer: 3000,
        })
    } catch (error) {
        SwalSnackBarError.fire({
            text: "Une erreur de suppression de projet est survenue !",
            timer: 3000
        })
    }
}

/**
 * @function projectSaga
 * @brief Main Projects saga that listens for actions.
 */
export function* projectsSaga() {
    yield takeEvery("projectsReducer/getProjectsFetch", workGetProjectsFetch)
    yield takeLatest(
        "projectsReducer/postNewProjectFetch",
        workPostNewProjectFetch
    )
    yield takeLatest(
        "projectsReducer/postUpdateProjectFetch",
        workUpdateProjectFetch
    )
    yield takeLatest(
        "projectsReducer/deleteProjectFetch",
        workDeleteProjectFetch
    )
}
