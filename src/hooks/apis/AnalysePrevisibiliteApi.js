/**
 * @file AnalysePrevisibiliteApi.js
 * @brief Exports the AnalysePrevisibiliteApi.js.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from "./axios"

/**
 * @var createAnalysePrevisibilite
 * @brief createAnalysePrevisibilite.
 */
export const createAnalysePrevisibilite = async (projetId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysis, projetId.toString()),
            method: "POST",
        })
    } catch (error) {
        // TODO: Handle error
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de création d'analyse prévisibilité est survenue!",
        })
    }
}
/**
 * @var getAllVotesByAnalysePrevisibilityId
 * @brief getAllVotesByAnalysePrevisibilityId.
 */
export const getAllVotesByAnalysePrevisibilityId = async (id) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysisVote, id.toString()
            ),
            method: "GET",
        })
        return response.data
    } catch (error) {
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération d'un tous des votes par l'id d'analyse prévisibilité est survenue!",
        })
    }
}
/**
 * @var createVote
 * @brief createVote.
 */
export const createVote = async (data, projectId) => {
    try {
        const res = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.previsibilityAnalysisVote),
            method: "POST",
            body: data,
        })
        if (res.status === 200) {
            return res.status
        }
    } catch (error) {
        // TODO: Handle error
        SwalWithBootstrapButtons.fire({ title: "Oops...", html: `Une erreur lors de création de vote est survenue!<br>  ${error.response?.data?.message}` })
    }
}
/**
 * @var updateVoteById
 * @brief updateVoteById.
 */
export const updateVoteById = async (voteId, payload, projectId) => {
    try {
        const res = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysisVote, projectId.toString(), voteId.toString()),
            method: "PUT",
            body: payload,
        })
        if (res.status === 200) {
            return res.status
        }
    } catch (error) {
        SwalWithBootstrapButtons.fire({ title: "Oops...", text: "Une erreur lors de mise à jour de vote est survenue!" })
    }
}
/**
 * @var getResultPrevisibilite
 * @brief getResultPrevisibilite.
 */
export const getResultPrevisibilite = async (analyseId, projectId) => {
  
    try {
        const response = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.newPrevisibilityAnalysis, analyseId.toString(), "score"),
            method: "GET",
        })
        return response.data
    } catch (error) {
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération des résultats d'analyse prévisibilité est survenue!",
        })
    }
}
/**
 * @var updateIterationPrevisibility
 * @brief updateIterationPrevisibility.
 */
export const updateIterationPrevisibility = async (analyseId, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.newPrevisibilityAnalysis, "iteration", analyseId.toString()),
            method: "PUT",
        })
        return response.data

    } catch (error) {
        // TODO: Handle error
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de changement d'itération prévisibilité est survenue!",
        })
    }
}
/**
 * @var updateStatusAnalysePrevisibility
 * @brief updateStatusAnalysePrevisibility.
 */
export const updateStatusAnalysePrevisibility = async (analyseId, projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.newPrevisibilityAnalysis, "isFinished", analyseId.toString()),
            method: "PUT",
        })
        return response.data
    } catch (error) {
        // TODO: Handle error
        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur lors de changement de statut prévisibilité est survenue!",
        })
    }
}
