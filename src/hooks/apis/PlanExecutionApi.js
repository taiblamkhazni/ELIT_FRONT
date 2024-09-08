/**
 * @file PlanExecutionApi.js
 * @brief Exports the PlanExecutionApi.js.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from "./axios"
/**
 * @var GetBrainStormingResumeByPrevId
 * @brief GetBrainStormingResumeByPrevId.
 */
export const GetBrainStormingResumeByPrevId = async (prevId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, "abstract", prevId.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de la récupération du résumé est survenue!",
        })
    }
}
/**
 * @var createNewPlanExecution
 * @brief createNewPlanExecution.
 */
export const createNewPlanExecution = async (projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(
                ENDPOINTS.executionPlan,
                "create",
                projectId.toString()
            ),
            method: "POST",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de la création du plan d'exécution est survenue!",
        })
    }
}
/**
 * @var getQuestionsPlanExecution
 * @brief getQuestionsPlanExecution.
 */
export const getQuestionsPlanExecution = async (idPE, projectId) => {
    const response = await axiosApi({
        endpoint: urlJoin(
            projectId.toString(),
            ENDPOINTS.executionPlan,
            "formConstraints",
            idPE.toString()
        ),
        method: "GET",
    })
    return response.data
}
/**
 * @var getMethodesPlanExecution
 * @brief getMethodesPlanExecution.
 */
export const getMethodesPlanExecution = async (idPE, projectId) => {
    const response = await axiosApi({
        endpoint: urlJoin(
            projectId.toString(),
            ENDPOINTS.executionPlan,
            "methodologies",
            idPE.toString()
        ),
        method: "GET",
    })
    return response.data
}
/**
 * @var postVotePlanExecution
 * @brief postVotePlanExecution.
 */
export const postVotePlanExecution = async (payload, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "methodologies", "vote"),
            method: "POST",
            body: payload,
        })
        return response
    } catch (error) {
        // Récupération du message d'erreur envoyé par le serveur
        const errorMessage = error.response?.data?.message || "Une erreur lors de voter dans le plan d'exécution est survenue!";
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: errorMessage,
        })
    }
}
/**
 * @var putAnswersPlanExecution
 * @brief putAnswersPlanExecution.
 */
export const putAnswersPlanExecution = async (payload, executionPlanId, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(
                projectId.toString(),
                ENDPOINTS.executionPlan,
                "formConstraints",
                "putAnswers",
                executionPlanId.toString()
            ),
            method: "PUT",
            body: payload,
        })
        return response
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de l'enregistrement des réponses est survenue.",
        })
    }
}
/**
 * @var getResultatPlanExecution
 * @brief getResultatPlanExecution.
 */
export const getResultatPlanExecution = async (idPE, projectId) => {
    const response = await axiosApi({
        endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, idPE.toString(), "score"),
        method: "GET",
    })
    return response.data
}
/**
 * @var updateStatusPlanExecution
 * @brief updateStatusPlanExecution.
 */
export const updateStatusPlanExecution = async (idPE, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "isFinished", idPE.toString()),
            method: "POST",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de changement de statut du plan d'exécution est survenue!",
        })
    }
}
/**
 * @var getSurveyQuestions
 * @brief getSurveyQuestions.
 */
export const getSurveyQuestions = async () => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.survey, "question"),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de récupération des questions de survey du plan d'exécution est survenue!",
        })
    }
}
/**
 * @var getSurveyAnswersByUserId
 * @brief getSurveyAnswersByUserId.
 */
export const getSurveyAnswersByUserId = async (userId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.survey, "answer", userId.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de récupération des réponses des questions de survey du plan d'exécution est survenue!",
        })
    }
}
/**
 * @var postSurveyAnswersByUserId
 * @brief postSurveyAnswersByUserId.
 */
export const postSurveyAnswersByUserId = async (payload) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.survey, "answer"),
            method: "POST",
            body: payload,
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de enregistrement des réponses des questions de survey du plan d'exécution est survenue!",
        })
    }
}
