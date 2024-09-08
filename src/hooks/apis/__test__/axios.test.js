/**
 * @file axios.test.js
 * @brief Ce fichier contient des tests pour le composant axios.
 */
import axios from 'axios';
import { backendAPI } from "common/injectGlobals"
import urlJoin from 'url-join';

/**
 * @brief Importation du axiosApi.
 */
import { axiosApi } from '../axios';

jest.mock('axios');

describe('axiosApi', () => {
    const mockAuthToken = 'mockAuthToken';
    const mockEndpoint = 'mockEndpoint';
    const mockBody = { foo: 'bar' };
    const mockMethod = 'POST';
    const mockHeaders = { 'X-Custom-Header': 'value' };
    const mockResponse = { data: { success: true } };
    const mockError = new Error('Request failed');

    beforeEach(() => {
        axios.mockReset();
        localStorage.setItem('authTokens', JSON.stringify({ 'access-token': mockAuthToken }));
    });

    it('should call axios with the correct arguments', async () => {
        axios.mockResolvedValueOnce(mockResponse);

        const result = await axiosApi({
            endpoint: mockEndpoint,
            body: mockBody,
            headers: mockHeaders,
            method: mockMethod,
        });

        expect(axios).toHaveBeenCalledTimes(1);
        expect(axios).toHaveBeenCalledWith({
            url: urlJoin(backendAPI, mockEndpoint),
            method: mockMethod,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockAuthToken}`,
                ...mockHeaders,
            },
            data: mockBody,
        });
        expect(result.data).toEqual(mockResponse.data);
    });

    it('should throw an error if the request fails', async () => {
        axios.mockRejectedValueOnce(mockError);

        await expect(axiosApi({ endpoint: mockEndpoint })).rejects.toThrow(mockError);
    });
});
