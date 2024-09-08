/**
 * @file PlanExecutionApi.test.js
 * @brief Ce fichier contient des tests pour le composant PlanExecutionApi.
 */
/**
 * @brief Importation du common/endpoints.
 */
import ENDPOINTS from 'common/endpoints';
/**
 * @brief Importation du url-join.
 */
import urlJoin from "url-join";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from '../axios';
import { createNewPlanExecution,
GetBrainStormingResumeByPrevId, getMethodesPlanExecution,         getQuestionsPlanExecution, getResultatPlanExecution, getSurveyAnswersByUserId,         getSurveyQuestions, postSurveyAnswersByUserId,postVotePlanExecution,
        putAnswersPlanExecution, updateStatusPlanExecution } from '../PlanExecutionApi'

jest.mock('../axios');

describe("GetBrainStormingResumeByPrevId", () => {
    const id = 123;
    const responseMockData = { data: [{idr: 123, resume: "resume test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch votes successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await GetBrainStormingResumeByPrevId(id);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.brainStorming, "abstract", id.toString()),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await GetBrainStormingResumeByPrevId(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de la récupération du résumé est survenue!",
            });
        }
    });
})

describe("createNewPlanExecution", () => {

    const projectId = 123;
    const mockResponse = { data: { succes: true } };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a response object if the request is successful", async () => {

        axiosApi.mockResolvedValueOnce(mockResponse);

        const response = await createNewPlanExecution(projectId);

        expect(axiosApi).toHaveBeenCalledTimes(1);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.executionPlan,"create",projectId.toString()),
            method: "POST",
        });
        expect(response).toEqual(mockResponse.data);
    });

    it("should log an error if the request fails", async () => {
        const mockError = new Error("Failed to create analysis");
        axiosApi.mockRejectedValueOnce(mockError);
         // Mock the console.log function
        SwalWithBootstrapButtons.fire = jest.fn();

        try {
            await createNewPlanExecution(projectId);
        }
        catch (error) {
            expect(error).toEqual(mockError);

            SwalWithBootstrapButtons.fire({
                // icon: "error",
                title: "Oops...",
                text: "Une erreur lors de la création du plan d'exécution est survenue!",
            })
        }
    });
});

describe("getQuestionsPlanExecution", () => {
    const idPE = 123;
    const projectId = 456;
    const responseMockData = { data: [{idr: 123, question: "question test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch votes successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getQuestionsPlanExecution(idPE, projectId);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "formConstraints", idPE.toString()),
            method: 'GET',
        });
    });
})

describe("getMethodesPlanExecution", () => {
    const idPE = 123;
    const projectId = 456;
    const responseMockData = { data: [{idr: 123, method: "method test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch votes successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getMethodesPlanExecution(idPE, projectId);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan,"methodologies", idPE.toString()),
            method: 'GET',
        });
    });
})

describe("postVotePlanExecution", () => {
    const mockPayload = "payload";
    const projectId = 123;
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should post the votes successfully', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await postVotePlanExecution(mockPayload, projectId);

       
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "methodologies", "vote"),
            method: 'POST',
            body: mockPayload
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await postVotePlanExecution(mockPayload, projectId);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de voter dans le plan d'exécution est survenue!",
            });
        }
    });
})

describe("putAnswersPlanExecution", () => {
    const execId = 123
    const projectId = 456
    const mockPayload = "payload";
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should post the answers successfully', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await putAnswersPlanExecution(mockPayload, execId, projectId);

        expect(result.data).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "formConstraints", "putAnswers", execId.toString()),
            method: 'PUT',
            body: mockPayload
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await putAnswersPlanExecution(mockPayload, execId, projectId);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de l'enregistrement des réponses est survenue.",
            });
        }
    });
})

describe("getResultatPlanExecution", () => {
    const idPE = 123;
    const projectId = 456;
    const responseMockData = { data: [{idr: 123, result: "result test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getResultatPlanExecution(idPE, projectId);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, idPE.toString(), "score"),
            method: 'GET',
        });
    });
})

describe("updateStatusPlanExecution", () => {
    const idPE = 123;
    const projectId = 456;
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should update the status successfully', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await updateStatusPlanExecution(idPE, projectId);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(projectId.toString(), ENDPOINTS.executionPlan, "isFinished", idPE.toString()),
            method: 'POST',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await updateStatusPlanExecution(idPE, projectId);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de changement de statut du plan d'exécution est survenue!",
            });
        }
    });
})

describe("getSurveyQuestions", () => {
    const responseMockData = { data: [{survey: "survey test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getSurveyQuestions();

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.survey, "question"),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getSurveyQuestions();
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de récupération des questions de survey du plan d'exécution est survenue!",
            });
        }
    });
})

describe("getSurveyAnswersByUserId", () => {
    const id = 123
    const responseMockData = { data: [{survey: "survey test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getSurveyAnswersByUserId(id);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.survey, "answer", id.toString()),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getSurveyAnswersByUserId(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de récupération des questions de survey du plan d'exécution est survenue!",
            });
        }
    });
})

describe("postSurveyAnswersByUserId", () => {
    const mockPayload = "payload";
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should post the votes successfully', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await postSurveyAnswersByUserId(mockPayload);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.survey, "answer"),
            method: 'POST',
            body: mockPayload
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();

        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await postSurveyAnswersByUserId(mockPayload);
        }
        catch (error) {
            expect(error).toEqual(expectedError);

            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur lors de enregistrement des réponses des questions de survey du plan d'exécution est survenue!",
            });
        }
    });
})
