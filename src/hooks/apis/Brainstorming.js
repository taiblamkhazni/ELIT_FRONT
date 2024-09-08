/**
 * @file Brainstorming.js
 * @brief Exports the Brainstorming.js.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from "./axios"
/**
 * @var GetBrainStormingByIdAL
 * @brief GetBrainStormingByIdAL.
 */
export const GetBrainStormingByIdAL = async (idAL, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, projectId.toString(), idAL.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération de brainstorming est survenue!",
        })
    }
}
/**
 * @var GetBrainStormingResumeByIdAL
 * @brief GetBrainStormingResumeByIdAL.
 */
export const GetBrainStormingResumeByIdAL = async (idAL, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, "abstract", projectId.toString(), idAL.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération de brainstorming est survenue!",
        })
    }
}
/**
 * @var DeleteCommentByCommentId
 * @brief DeleteCommentByCommentId.
 */
export const DeleteCommentByCommentId = async (commentId, projectId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, projectId.toString(), commentId.toString()),
            method: "DELETE",
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de suppression de projet est survenue!",
        })
    }
}
/**
 * @var AddCommentBrainstorming
 * @brief AddCommentBrainstorming.
 */
export const AddCommentBrainstorming = async (payload, projectId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, projectId.toString()),
            method: "POST",
            body: payload,
        })
    } catch (error) {
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur est survenue lors de l'ajout de note !",
        })
    }
}
/**
 * @var ModifyCommentBrainstorming
 * @brief ModifyCommentBrainstorming.
 */
export const ModifyCommentBrainstorming = async (payload, projectId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, projectId.toString()),
            method: "PUT",
            body: payload,
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur est survenue lors de la modification de note !",
        })
    }
}
/**
 * @var ValidateCommentBrainstorming
 * @brief ValidateCommentBrainstorming.
 */
export const ValidateCommentBrainstorming = async (
    brainstormingId,
    payload,
    projectId
) => {
 
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.brainStorming, "validate", projectId.toString(), brainstormingId.toString()),
            method: "PUT",
            body: payload,
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de validation brainstorming comment !",
        })
    }
}
/**
 * @var ModifQuestionMulticritere
 * @brief ModifQuestionMulticritere.
 */
export const ModifQuestionMulticritere = async (payload, projectId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.multicriteriaAnalysis, "question"),
            method: "PUT",
            body: payload,
        })
    } catch (error) {
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur est survenue lors de la modification de question dans brainstorming !",
        })
    }
}
