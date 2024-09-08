/**
 * @file ProjetApi.test.js
 * @brief Ce fichier contient des tests pour le composant ProjetApi.
 */
/**
 * @brief Importation du common/endpoints.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
/**
 * @brief Importation du utils/Swal.
 */
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi, axiosApiFormData } from '../axios';
import { addColabByIdForProjectId,
deleteProjectApi, getProjectsApi, getProjectsNewApi,getProjetById, postProjectApi,updateProjectApi } from "../ProjetApi";

jest.mock('../axios');

describe("postProjectApi", () => {
    const mockPayload = {form : {}};
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should add the project successfully', async () => {
        axiosApiFormData.mockResolvedValueOnce(responseMockData);

        const result = await postProjectApi(mockPayload);
        
        expect(result).toEqual(responseMockData.data);
        expect(axiosApiFormData).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects),
            method: 'POST',
            body: mockPayload
        });
    })
})
describe("updateProjectApi", () => {
    const id = 123;
    const mockPayload = {form : {}};
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should update the project successfully', async () => {
        axiosApiFormData.mockResolvedValueOnce(responseMockData);

        const result = await updateProjectApi(id,mockPayload);
        
        expect(result).toEqual(responseMockData.data);
        expect(axiosApiFormData).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects, id.toString()),
            method: 'PUT',
            body: mockPayload
        });
    })
})
describe("getProjectsApi", () => {
    const responseMockData = { data: [{idp: 123, project: "project test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch projects successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getProjectsApi();
        
        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();
        
        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getProjectsApi();
        }
        catch (error) {
            expect(error).toEqual(expectedError);
            
            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur de récupération de projets est survenue!",
            });
        }
    });
})

describe("deleteProjectApi", () => {
    const id = 123;
    const responseMockData = { data: {success: true} };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should delete the project successfully', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await deleteProjectApi(id);
                
        expect(result).toEqual(responseMockData);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects, id.toString()),
            method: 'DELETE',
        });
    })
})

describe("addColabByIdForProjectId", () => {
    const id = 123
    const formData = {form : {}}
    const responseMockData = { data: {success: true}};

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should add collab successfully', async () => {
        axiosApiFormData.mockResolvedValueOnce(responseMockData);

        const result = await addColabByIdForProjectId(formData, id);
        
        expect(result).toEqual(responseMockData);
        expect(axiosApiFormData).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects, id.toString(), "add-contributor"),
            method: "POST",
            body: formData,
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();
        
        axiosApiFormData.mockRejectedValueOnce(expectedError);

        try {
            await addColabByIdForProjectId(formData, id)
        }
        catch (error) {
            expect(error).toEqual(expectedError);
            
            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur est survenue!",
            });
        }
    });
})

describe("getProjetById", () => {
    const id = 123;
    const responseMockData = { data: [{idp: 123, project: "project test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch the project successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getProjetById(id);
        
        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.projects,"getdata", id.toString()),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();
        
        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getProjetById(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);
            
            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur de récupération d'un projet est survenue!",
            });
        }
    });
})

describe("getProjectsNewApi", () => {
    const responseMockData = { data: [{idp: 123, project: "project test"}] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch the project successfully and return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getProjectsNewApi();
        
        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.newProjectsApi),
            method: 'GET',
        });
    });
})
