/**
 * @file AnalyseMulticritereApi.js
 * @brief This file contains functions for making API calls related to multicriteria analysis.
 *
 * This module provides functions to interact with the application's API, specifically for operations
 * related to multicriteria analysis. Each function performs a different API call and handles potential errors.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from "./axios"

/**
 * Retrieves multicriteria analysis for a given project using its ID.
 *
 * @param {string} projectId - The ID of the project for which to retrieve the multicriteria analysis.
 * @returns {Promise<object>} The multicriteria analysis data or an error.
 */
export const GetAnalyseMulticriteByProjectId = async (projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.multicriteriaAnalysis, projectId.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération d'analyse multicritère par l'id est survenue!",
        })
    }
}

/**
 * Updates multicriteria analysis for a given project.
 *
 * @param {string} projectId - The ID of the project.
 * @param {object} data - The data to update for the multicriteria analysis.
 * @returns {Promise<object>} The API response or an error.
 */
export const UpdateAnalyseMulticrite = async (projectId, data) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.multicriteriaAnalysis, projectId.toString()),
            method: "PUT",
            body: data,
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de enregistrement des saisies!",
        })
    }
}

/**
 * Increases the iteration of multicriteria analysis for a given project.
 *
 * @param {string} projectId - The ID of the project.
 * @param {string} analyseId - The ID of the multicriteria analysis.
 * @returns {Promise<object>} The API response or an error.
 */
export const IncreaseAnalyseMulticrite = async (projectId, analyseId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.multicriteriaAnalysis, 'iteration', analyseId.toString()),
            method: "PUT",
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de enregistrement des saisies!",
        })
    }
}

/**
 * Retrieves the results of multicriteria analysis for a given project.
 *
 * @param {string} projectId - The ID of the project for which to retrieve the results.
 * @returns {Promise<object>} The multicriteria analysis results or an error.
 */
export const GetResultsAnalyseMulticriteByProjectId = async (projectId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.multicriteriaAnalysis, projectId.toString(), "score"),
            method: "GET",
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            // icon: "error",
            title: "Oops...",
            text: "Une erreur de récupération des résultats d'analyse multicritère est survenue!",
        })
    }
}
