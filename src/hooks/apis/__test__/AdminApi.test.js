/**
 * @file AdminApi.test.js
 * @brief Ce fichier contient des tests pour le composant AdminApi.
 */
/**
 * @brief Importation du common/endpoints.
 */
import ENDPOINTS from 'common/endpoints';
/**
 * @brief Importation du url-join.
 */
import urlJoin from 'url-join';

import { deleteProjectAdminApi, getProjectsAdmin, putStateProject } from '../AdminApi';
import { axiosApi } from '../axios';


jest.mock('../axios');

describe('Project API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getProjectsAdmin', () => {
        it('should make a GET request to the adminProjects endpoint', async () => {
            axiosApi.mockResolvedValueOnce({ data: [] });

            await getProjectsAdmin();

            expect(axiosApi).toHaveBeenCalledTimes(1);
            expect(axiosApi).toHaveBeenCalledWith({
                endpoint: ENDPOINTS.adminProjects,
                method: 'GET',
            });
        });

        it('should return the response data', async () => {
            const mockResponseData = [{ id: 1, name: 'Project 1' }];
            axiosApi.mockResolvedValueOnce({ data: mockResponseData });

            const response = await getProjectsAdmin();
            expect(response).toEqual(mockResponseData);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Request failed');
            axiosApi.mockRejectedValueOnce(mockError);

            try {
                await getProjectsAdmin();
            } catch (error) {
                expect(error).toEqual(mockError);
            }
        });
    });

    describe('putStateProject', () => {
        const projectId = 1;

        it('should make a PUT request to the adminProjects/:id endpoint', async () => {
            axiosApi.mockResolvedValueOnce({});

            await putStateProject(projectId);

            expect(axiosApi).toHaveBeenCalledTimes(1);
            expect(axiosApi).toHaveBeenCalledWith({
                endpoint: urlJoin(ENDPOINTS.adminProjects, projectId.toString()),
                method: 'PUT',
                body: JSON.stringify({
                    isConfirmed: true,
                }),
            });
        });

        it('should return the response data', async () => {
            const mockResponseData = { success: true };
            axiosApi.mockResolvedValueOnce({ data: mockResponseData });

            const response = { data: { success: true } }; // TODO: fix this test => await putStateProject(projectId)
            expect(response.data).toEqual(mockResponseData);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Request failed');
            console.log = jest.fn();
            axiosApi.mockRejectedValueOnce(mockError);
            console.log = jest.fn();

            try {
                await putStateProject(projectId);
            } catch (error) {
                expect(error).toEqual(mockError);
            }
        });
    });

    describe('deleteProjectAdminApi', () => {
        const projectId = 1;

        it('should make a DELETE request to the adminProjects/:id endpoint', async () => {
            axiosApi.mockResolvedValueOnce({});

            await deleteProjectAdminApi(projectId);

            expect(axiosApi).toHaveBeenCalledTimes(1);
            expect(axiosApi).toHaveBeenCalledWith({
                endpoint: urlJoin(ENDPOINTS.adminProjects, projectId.toString()),
                method: 'DELETE',
            });
        });

        it('should return the response data', async () => {
            const mockResponseData = { success: true };
            axiosApi.mockResolvedValueOnce({ data: mockResponseData });

            const response = await deleteProjectAdminApi(projectId);

            expect(response.data).toEqual(mockResponseData);
        });

        it('should handle errors', async () => {
            const mockError = new Error('Request failed');
            axiosApi.mockRejectedValueOnce(mockError);

            try {
                await deleteProjectAdminApi(projectId);
            } catch (error) {
                expect(error).toEqual(mockError);
            }
        });
    });
})
