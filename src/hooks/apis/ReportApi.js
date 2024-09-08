/**
 * @file ReportApi.js
 * @brief Exports the ReportApi.js.
 */
import ENDPOINTS from "common/endpoints"
import { saveAs } from "file-saver"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi, axiosApiFormData, axiosBlobApi } from "./axios"
/**
 * @var uploadReportApi
 * @brief uploadReportApi.
 */
export const uploadReportApi = async (
    projectId,
    analyseId,
    type,
    formData,
    iteration = 1
) => {
    try {
        const response = await axiosApiFormData({
            endpoint: urlJoin(
                ENDPOINTS.report,
                "upload",
                projectId.toString(),
                analyseId.toString(),
                type,
                iteration.toString()
            ),
            method: "POST",
            body: formData,
        })
        return response.data
    } catch (error) {
        if (error.response.status === 409) {
            SwalWithBootstrapButtons.fire({
                title: "Oops...",
                text: error.response.data,
            })
        } else {
            SwalWithBootstrapButtons.fire({
                title: "Oops...",
                text: "Une erreur est survenue lors de l'enregistrement du rapport.",
            })
        }
    }
}
/**
 * @var getReportsApi
 * @brief getReportsApi.
 */
export const getReportsApi = async (projectId) => {
    try {
        const response = await axiosApi({
            endpoint: urlJoin(ENDPOINTS.report, projectId.toString()),
            method: "GET",
        })
        return response.data
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur est survenue lors de la récupération des rapports.",
        })
    }
}
/**
 * @var previewReport
 * @brief previewReport.
 */
export const previewReport = async (reportId) => {
    try {
        const response = await axiosBlobApi({
            endpoint: urlJoin(ENDPOINTS.report, "preview", reportId.toString()),
            method: "GET",
            headers: {
                Accept: "application/pdf",
            },
        })
        if (response.status === 200) {
            const fileObjectURL = URL.createObjectURL(response.data)
            window.open(fileObjectURL)
        }
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur est survenue lors de la prévisualisation du rapport.",
        })
    }
}
/**
 * @var downloadReportApi
 * @brief downloadReportApi.
 */
export const downloadReportApi = async (reportId,projectName) => {
    try {
        const response = await axiosBlobApi({
            endpoint: urlJoin(ENDPOINTS.report, "download", reportId.toString()),
            method: "GET",
        })
        if (response.status === 200) {
            saveAs(response.data, projectName)
        }
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur est survenue lors du téléchargement du rapport.",
        })
    }
}
/**
 * @var deleteReportApi
 * @brief deleteReportApi.
 */
export const deleteReportApi = async (reportId) => {
    try {
        return await axiosApi({
            endpoint: urlJoin(ENDPOINTS.report, reportId.toString()),
            method: "DELETE",
        })
    } catch (error) {

        SwalWithBootstrapButtons.fire({
            title: "Oops...",
            text: "Une erreur de suppression du rapport est survenue.",
        })
    }
}
