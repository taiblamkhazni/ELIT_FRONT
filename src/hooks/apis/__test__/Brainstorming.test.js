/**
 * @file Brainstorming.test.js
 * @brief Ce fichier contient des tests pour le composant Brainstorming.
 */
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi } from '../axios';
import { AddCommentBrainstorming, 
    DeleteCommentByCommentId, GetBrainStormingByIdAL, GetBrainStormingResumeByIdAL, 
ModifQuestionMulticritere,    ModifyCommentBrainstorming, ValidateCommentBrainstorming } from '../Brainstorming';


jest.mock('../axios');

describe('GetBrainStormingByIdAL', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch brainstorming data with correct arguments', async () => {
        const mockData = { id: 1, title: 'Test Brainstorming' };
        axiosApi.mockResolvedValueOnce({ data: mockData });

        const idAL = 1;
        const projectId = 2;
        const result = await GetBrainStormingByIdAL(idAL, projectId);

        expect(axiosApi).toHaveBeenCalledTimes(1);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}/${idAL}`,
            method: 'GET',
        });
        expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
        const id = 123
        const projectId = 456;
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await GetBrainStormingByIdAL(id, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}/${id}`,
            method: "GET",
        })
        
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur de récupération de brainstorming est survenue!",
        })
    });
});

describe('GetBrainStormingResumeByIdAL', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch brainstorming resume with correct arguments', async () => {
        const mockData = { id: 1, title: 'Test Brainstorming Resume' };
        axiosApi.mockResolvedValueOnce({ data: mockData });

        const idAL = 1;
        const projectId = 2;
        const result = await GetBrainStormingResumeByIdAL(idAL, projectId);

        expect(axiosApi).toHaveBeenCalledTimes(1);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/abstract/${projectId}/${idAL}`,
            method: 'GET',
        });
        expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
        const id = 123
        const projectId = 456;
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await GetBrainStormingResumeByIdAL(id, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/abstract/${projectId}/${id}`,
            method: "GET",
        })
        
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur de récupération de brainstorming est survenue!",
        })
    });
});

describe("DeleteCommentByCommentId", () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it("should delete the comment", async () => {
        const id = 123
        const projectId = 456
        const expectedResponse = { status: "updated" }
        axiosApi.mockResolvedValueOnce({ data: expectedResponse })

        const response = await DeleteCommentByCommentId(id, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}/${id}`,
            method: "DELETE",
        })
        expect(response.data).toEqual(expectedResponse)
    })

    it("should handle errors", async () => {
        const id = 123
        const projectId = 456
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await DeleteCommentByCommentId(id, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}/${id}`,
            method: "DELETE",
        })
        
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur de suppression de projet est survenue!",
        })
    })
})

describe('AddCommentBrainstorming', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a comment to the brainstorming', async () => {
        const mockData = {
            comment: "comment test"
        };
        const projectId = 123;
        const expectedStatusCode = 200;
        axiosApi.mockResolvedValue({ status: 200 });

        const result = await AddCommentBrainstorming(mockData, projectId);

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}`,
            method: 'POST',
            body: mockData,
        });
        expect(result.status).toEqual(expectedStatusCode);
    });

    it('should handle errors if API call fails', async () => {
        const mockData = {
            comment: "comment test"
        };
        const projectId = 123;
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await AddCommentBrainstorming(mockData, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}`,
            method: 'POST',
            body: mockData,
        })
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur est survenue lors de l'ajout de note !",
        })
    });
});

describe('ModifyCommentBrainstorming', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should modify a comment of the brainstorming', async () => {
        const mockData = {
            id: 1, comment: "comment test"
        };
        const projectId = 1;
        const expectedStatusCode = 200;
        axiosApi.mockResolvedValue({ status: 200 });

        const result = await ModifyCommentBrainstorming(mockData, projectId);

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}`,
            method: 'PUT',
            body: mockData,
        });
        expect(result.status).toEqual(expectedStatusCode);
    });

    it('should handle errors if API call fails', async () => {
        const mockData = {
            id: 1, comment: "comment test"
        };
        const projectId = 1;
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await ModifyCommentBrainstorming(mockData, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/${projectId}`,
            method: 'PUT',
            body: mockData,
        })
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur est survenue lors de la modification de note !",
        })
    });
});

describe('ValidateCommentBrainstorming', () => {
    const brainstormingId = '1'
    const payload = { comment: 'test' }
    const projectId = 1

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should call axiosApi with correct arguments', async () => {
        axiosApi.mockResolvedValueOnce({ data: {} })

        await ValidateCommentBrainstorming(brainstormingId, payload, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `/brainstorming/validate/${projectId}/${brainstormingId}`,
            method: 'PUT',
            body: payload,
        })
    })

    it('should return data if request is successful', async () => {
        const mockResponse = { data: { status: 200 } }
        axiosApi.mockResolvedValueOnce(mockResponse)

        const result = await ValidateCommentBrainstorming(brainstormingId, payload, projectId)

        expect(result).toEqual(mockResponse)
    })

    it('should handle errors', async () => {
        const mockError = new Error('Network Error')
        axiosApi.mockRejectedValueOnce(mockError)

        console.error = jest.fn()

        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await ValidateCommentBrainstorming(brainstormingId, payload, projectId)

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: 'Oops...',
            text: 'Une erreur de validation brainstorming comment !',
        })
    })
})

describe('ModifQuestionMulticritere', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should modify the quesiton', async () => {
        const mockData = {
            id: 1, question: "question test"
        };
        const projectId = 123;
        const expectedStatusCode = 200;
        axiosApi.mockResolvedValue({ status: 200 });

        const result = await ModifQuestionMulticritere(mockData, projectId);

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: projectId.toString() + '/multi-criteria-analysis/question',
            method: 'PUT',
            body: mockData,
        });
        expect(result.status).toEqual(expectedStatusCode);
    });

    it('should handle errors if API call fails', async () => {
        const mockData = {
            id: 1, question: "question test"
        };
        const projectId = 123;
        const expectedError = new Error("Something went wrong")
        axiosApi.mockRejectedValueOnce(expectedError)

        console.error = jest.fn();
        jest.spyOn(SwalWithBootstrapButtons, "fire")

        await ModifQuestionMulticritere(mockData, projectId)

        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: `${projectId}/multi-criteria-analysis/question`,
            method: 'PUT',
            body: mockData,
        })
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: "Oops...",
            text: "Une erreur est survenue lors de la modification de question dans brainstorming !",
        })
    });
});
