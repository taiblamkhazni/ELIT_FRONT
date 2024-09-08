/**
 * @file AnalysePrevisibiliteApi.test.js
 * @brief Ce fichier contient des tests pour le composant AnalysePrevisibiliteApi.
 */
/**
 * @brief Importation du common/endpoints.
 */
import ENDPOINTS from 'common/endpoints';
/**
 * @brief Importation du url-join.
 */
import urlJoin from "url-join";
/**
 * @brief Importation du utils/Swal.
 */
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import {createAnalysePrevisibilite, createVote, getAllVotesByAnalysePrevisibilityId,getResultPrevisibilite, updateIterationPrevisibility,updateStatusAnalysePrevisibility, updateVoteById} from '../AnalysePrevisibiliteApi';
import { axiosApi } from '../axios';


jest.mock('../axios');

describe("createAnalysePrevisibilite", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a response object if the request is successful", async () => {
        const projectId = 123;
        const mockResponse = { data: { succes: true } };
        axiosApi.mockResolvedValueOnce(mockResponse);

        const response = await createAnalysePrevisibilite(projectId);

        expect(axiosApi).toHaveBeenCalledTimes(1);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysis, projectId.toString()),
            method: "POST",
        });
        expect(response).toEqual(mockResponse);
    });

    it("should log an error if the request fails", async () => {
        const projectId = 123;
        const mockError = new Error("Failed to create analysis");
        axiosApi.mockRejectedValueOnce(mockError);
        console.log = jest.fn();
        try {
            await createAnalysePrevisibilite(projectId);
        }
        catch (error) {
            expect(error).toEqual(mockError);

        }
    });
});

describe('getAllVotesByAnalysePrevisibilityId', () => {
    const id = 123;
    const responseMockData = { data: [{ id: 1, vote: 'yes' }, { id: 2, vote: 'no' }] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch votes successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getAllVotesByAnalysePrevisibilityId(id);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysisVote, id.toString()),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getAllVotesByAnalysePrevisibilityId(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: 'Une erreur de récupération d\'un tous des votes par l\'id d\'analyse prévisibilité est survenue!',
            });
        }

    });
});

describe('createVote', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a vote and return status code 200', async () => {
        const mockData = {
            user_id: '1',
            project_id: '2',
            vote: 'yes',
        };
        const projectId = 123;
        const expectedStatusCode = 200;
        axiosApi.mockResolvedValue({ status: 200 });

        const result = await createVote(mockData, projectId);

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.previsibilityAnalysisVote) ,
            method: 'POST',
            body: mockData,
        });
        expect(result).toEqual(expectedStatusCode);
    });

    it('should not return status 200 if the request is not successfull', async () => {
        const result = await createVote(null, null);
        expect(result).toEqual(undefined);
    });

    it('should console.log error message if API call fails', async () => {
        const mockData = {
            user_id: '1',
            project_id: '2',
            vote: 'yes',
        };
        const projectId = 123;
        const expectedError = new Error('API call failed');
        axiosApi.mockRejectedValue(expectedError);
        console.log = jest.fn();

        try {
            await createVote(mockData, projectId);
        }
        catch (error) {
            expect(error).toEqual(mockError);

        }
    });
});

describe('updateVoteById', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should update the vote and return status 200', async () => {
        const voteId = 1;
        const projectId = 2;
        const payload = { choice: 'Yes' };
        const response = { status: 200 };

        axiosApi.mockResolvedValue(response);

        const result = await updateVoteById(voteId, payload, projectId);

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.previsibilityAnalysisVote, projectId.toString(), voteId.toString()),
            method: 'PUT',
            body: payload,
        });
        expect(result).toBe(response.status);
    });

    it('should handle errors and return null', async () => {
        const voteId = 1;
        const projectId = 2;
        const payload = { choice: 'Yes' };
        const expectedError = new Error('API call failed');

        axiosApi.mockRejectedValue(expectedError);
        console.log = jest.fn();

        try {
            await updateVoteById(voteId, payload, projectId);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

        }
    });
});

describe("getResultPrevisibilite", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return the result of previsibility analysis", async () => {
        const expectedResult = { score: 0.5 }
        const mockedResponse = { data: expectedResult, status: 200 }
        const analyseId = 123
        const projectId = 456
        axiosApi.mockResolvedValueOnce(mockedResponse)

        const result = await getResultPrevisibilite(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/${analyseId}/score`,
            method: "GET",
        })
        expect(result).toEqual(expectedResult)
    })

    it("should handle errors and show an error message", async () => {
        const expectedError = new Error('API call failed');
        axiosApi.mockRejectedValueOnce(expectedError)

        jest.spyOn(SwalWithBootstrapButtons, "fire")

        const analyseId = 123
        const projectId = 456
        const result = await getResultPrevisibilite(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/${analyseId}/score`,
            method: "GET",
        })
        expect(result).toBeUndefined()
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur de récupération des résultats d'analyse prévisibilité est survenue!",
        })
    })
})

describe("updateIterationPrevisibility ", () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it("should update the iteration of the previsibility analysis", async () => {
        const analyseId = 123
        const projectId = 456
        const expectedResponse = { data: {status: 200 }}
        axiosApi.mockResolvedValueOnce(expectedResponse)

        const response = await updateIterationPrevisibility(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/iteration/${analyseId}`,
            method: "PUT",
        })
        expect(response).toEqual(expectedResponse.data)
    })

    it("should handle errors", async () => {
        const analyseId = 123
        const projectId = 456
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)
        console.log = jest.fn();

        await updateIterationPrevisibility(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/iteration/${analyseId}`,
            method: "PUT",
        })
    })
})

describe("updateStatusAnalysePrevisibility", () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it("should update the status of the previsibility analysis", async () => {
        const analyseId = 123
        const projectId = 456
        const expectedResponse = { data: {status: 200 }}
        axiosApi.mockResolvedValueOnce(expectedResponse)

        const response = await updateStatusAnalysePrevisibility(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/isFinished/${analyseId}`,
            method: "PUT",
        })
        expect(response).toEqual(expectedResponse.data)
    })

    it("should handle errors", async () => {
        const analyseId = 123
        const projectId = 456
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await updateStatusAnalysePrevisibility(analyseId, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/predictibility/isFinished/${analyseId}`,
            method: "PUT",
        })

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur lors de changement de statut prévisibilité est survenue!",
        })
    })
})
