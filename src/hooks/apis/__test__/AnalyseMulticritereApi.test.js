/**
 * @file AnalyseMulticritereApi.test.js
 * @brief Ce fichier contient des tests pour le composant AnalyseMulticritereApi.
 */
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import {
    GetAnalyseMulticriteByProjectId,
    GetResultsAnalyseMulticriteByProjectId,
    IncreaseAnalyseMulticrite,
    UpdateAnalyseMulticrite,
} from "../AnalyseMulticritereApi"
import { axiosApi } from "../axios"

jest.mock("../axios")

describe("GetAnalyseMulticriteByProjectId function", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should fetch the multicriteria analysis data successfully", async () => {
        const projectId = 123
        const responseData = { id: 1, name: "Analysis 1" }
        axiosApi.mockResolvedValueOnce({ data: responseData })
        SwalWithBootstrapButtons.fire = jest.fn()
        const result = await GetAnalyseMulticriteByProjectId(projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/multi-criteria-analysis/${projectId}`,
            method: "GET",
        })
        expect(result).toEqual(responseData)
    })

    it("should show an error message if the fetch fails", async () => {
        const projectId = 123
        const mockError = new Error('Request failed');
        axiosApi.mockRejectedValueOnce(mockError);
        try {
            await GetAnalyseMulticriteByProjectId(projectId);
        } catch (error) {
            expect(error).toEqual(mockError)
            
            expect(swalMock).toHaveBeenCalledWith({
                title: "Oops...",
                text: "Une erreur de récupération d'analyse multicritère par l'id est survenue!",
            })
        }
    })
})

describe("UpdateAnalyseMulticrite function", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should update the multicriteria analysis data successfully", async () => {
        const projectId = 123
        const formData = new FormData()
        const resData = { data: 'success', status: 200 };
        axiosApi.mockResolvedValueOnce(resData)
        SwalWithBootstrapButtons.fire = jest.fn()
        const result = await UpdateAnalyseMulticrite(projectId, formData)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/multi-criteria-analysis/${projectId}`,
            method: "PUT",
            body: formData
        })
        expect(result).toEqual(resData)
    })

    it("should show an error message if the fetch fails", async () => {
        const projectId = 123
        const formData = new FormData()
        const mockError = new Error('Request failed');
        axiosApi.mockRejectedValueOnce(mockError);
        try {
            await UpdateAnalyseMulticrite(projectId, formData);
        } catch (error) {
            expect(error).toEqual(mockError)
            
            expect(swalMock).toHaveBeenCalledWith({
                title: "Oops...",
                text: "Une erreur de enregistrement des saisies!"
            })
        }
    })
})

describe("IncreaseAnalyseMulticrite function", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should increase the multicriteria analysis successfully", async () => {
        const projectId = 123
        const analyseId = 456
        const resData = { data: 'success', status: 200 };
        axiosApi.mockResolvedValueOnce(resData)
        SwalWithBootstrapButtons.fire = jest.fn()
        const result = await IncreaseAnalyseMulticrite(projectId, analyseId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/multi-criteria-analysis/iteration/${analyseId}`,
            method: "PUT",
        })
        expect(result).toEqual(resData)
    })

    it("should show an error message if the fetch fails", async () => {
        const projectId = 123
        const analyseId = 456
        const mockError = new Error('Request failed');
        axiosApi.mockRejectedValueOnce(mockError);
        try {
            await IncreaseAnalyseMulticrite(projectId, analyseId);
        } catch (error) {
            expect(error).toEqual(mockError)
            
            expect(swalMock).toHaveBeenCalledWith({
                title: "Oops...",
                text: "Une erreur de enregistrement des saisies!"
            })
        }
    })
})

describe("GetResultsAnalyseMulticriteByProjectId function", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should fetch the multicriteria analysis results successfully", async () => {
        const projectId = 1
        const responseData = { id: 1, name: "Analysis 1", results: [] }
        axiosApi.mockResolvedValueOnce({ data: responseData })
        SwalWithBootstrapButtons.fire = jest.fn()
        const result = await GetResultsAnalyseMulticriteByProjectId(projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/multi-criteria-analysis/${projectId}/score`,
            method: "GET",
        })
        expect(result.data).toEqual(responseData)
    })

    it("should show an error message if the fetch fails", async () => {
        const projectId = 123
        const mockError = new Error('Request failed');
        axiosApi.mockRejectedValueOnce(mockError);
        try {
            await GetResultsAnalyseMulticriteByProjectId(projectId);
        } catch (error) {
            expect(error).toEqual(mockError)
            
            expect(swalMock).toHaveBeenCalledWith({
                title: "Oops...",
                text: "Une erreur de récupération des résultats d'analyse multicritère est survenue!",
            })
        }
    })
})