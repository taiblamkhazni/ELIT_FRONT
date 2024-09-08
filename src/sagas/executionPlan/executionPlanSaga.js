/**
 * @file executionPlanSaga.js
 * @brief Ce fichier contient les sagas liées au module ExecutionPlan.
 *
 */
import { createNewPlanExecution, getMethodesPlanExecution, getQuestionsPlanExecution, getResultatPlanExecution } from "hooks/apis/PlanExecutionApi"
import { getListQuestionsFailure, getListQuestionsSuccess, getMethodologiesArrayFailure, getMethodologiesArraySuccess, getNewPlanExecutionSuccess, getResultsFailure, getResultsSuccess, setIdPlanExecution } from "reducers/executionPlan/executionPlanReducer"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
/**
 * workGetListQuestionsFetch
 * @brief Saga to handle fetching a list of questions for a given execution plan.
 * @param {Object} data Contains idPE and projectId necessary for the API call.
 */
export function* workGetListQuestionsFetch(data) {
    const {idPE, projectId} = data.payload
    try {
        const listQuestions = yield call(() => getQuestionsPlanExecution(idPE, projectId))
        yield put(getListQuestionsSuccess(listQuestions))
    } catch (error) {
        yield put(getListQuestionsFailure())
        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur lors de la récupération des questions du plan d'exécution est survenue.",
        })
    }
}
/**
 * workGetResultsFetch
 * @brief Saga to handle fetching results for a given execution plan.
 * @param {Object} data Contains idPE and projectId necessary for the API call.
 */
export function* workGetResultsFetch(data) {
    const {idPE, projectId} = data.payload
    try {
        const results = yield call(() => getResultatPlanExecution(idPE, projectId))
        yield put(getResultsSuccess(results))
    } catch (error) {
        yield put(getResultsFailure())
        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur lors de la récupération du résultat du plan d'exécution est survenue.",
        })
    }
}
/**
 * workGetMethodologiesArrayFetch
 * @brief Saga to handle fetching methodologies array for the final step of a given execution plan.
 * @param {Object} data Contains idPE and projectId necessary for the API call.
 */
export function* workGetMethodologiesArrayFetch(data) {
    const {idPE, projectId} = data.payload
    try {
        const results = yield call(() => getMethodesPlanExecution(idPE, projectId))
        yield put(getMethodologiesArraySuccess(results))
    } catch (error) {
        yield put(getMethodologiesArrayFailure())
        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur lors de la récupération des méthodologies de l'étape finale du plan d'exécution est survenue!",
        })
    }
}
/**
 * workGetNewPlanExecutionFetch
 * @brief Saga to handle creating a new execution plan.
 * @param {Object} data Contains necessary data for the API call to create a new plan.
 */
export function* workGetNewPlanExecutionFetch(data){
    try {
        const results = yield call(() => createNewPlanExecution(data.payload))
        yield put(setIdPlanExecution(results))
        yield put(getNewPlanExecutionSuccess(results))
       
    } catch (error) {
        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur lors de la création de nouveau plan d'exécution est survenue!",
        })
    }
}
/**
 * executionPlanSaga
 * @brief Primary saga listener for all ExecutionPlan-related actions.
 */
export function* executionPlanSaga() {
    yield takeEvery("executionPlanReducer/getListQuestionsFetch", workGetListQuestionsFetch)
    yield takeEvery("executionPlanReducer/getResultsFetch", workGetResultsFetch)
    yield takeEvery("executionPlanReducer/getMethodologiesArrayFetch", workGetMethodologiesArrayFetch)
    yield takeLatest("executionPlanReducer/getNewPlanExecutionFetch", workGetNewPlanExecutionFetch)
}
