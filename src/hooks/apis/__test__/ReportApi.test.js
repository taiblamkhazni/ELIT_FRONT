/**
 * @file ReportApi.test.js
 * @brief Ce fichier contient des tests pour le composant ReportApi.
 */
import ENDPOINTS from "common/endpoints"
import urlJoin from "url-join"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"

import { axiosApi, axiosBlobApi } from "../axios"
import { deleteReportApi,getReportsApi, previewReport } from "../ReportApi"

jest.mock("../axios")

describe("getReportsApi", () => {
    const id = 123
    const responseMockData = { data: [{ report: "report test" }] };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return the data', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await getReportsApi(id);

        expect(result).toEqual(responseMockData.data);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.report, id.toString()),
            method: 'GET',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();
        
        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await getReportsApi(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);
            
            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur est survenue lors de la récupération des rapports.",
            });
        }
    });
})

describe('previewReport', () => {
    const id = 123
    SwalWithBootstrapButtons.fire = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should preview report successfully', async () => {
        const mockData = new Blob(['test'], { type: 'application/pdf' });
        axiosBlobApi.mockResolvedValueOnce({ status: 200, data: mockData });

        const openMock = jest.fn();
        global.window.open = openMock

        const createObjectURL = jest.fn()
        global.URL.createObjectURL = createObjectURL

        await previewReport(123);

        expect(axiosBlobApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.report, "preview", id.toString()),
            method: 'GET',
            headers: { Accept: 'application/pdf' },
        });
        const fileObjectURL = createObjectURL(mockData)
        expect(openMock).toHaveBeenCalledWith(fileObjectURL)
        expect(SwalWithBootstrapButtons.fire).not.toHaveBeenCalled();
    });

    it('should handle error during previewing report', async () => {
        axiosBlobApi.mockRejectedValueOnce(new Error('Some error'));

        await previewReport(123);

        expect(axiosBlobApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.report, "preview", id.toString()),
            method: 'GET',
            headers: { Accept: 'application/pdf' },
        });
        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
            title: 'Oops...',
            text: 'Une erreur est survenue lors de la prévisualisation du rapport.',
        });
    });
})

describe("deleteReportApi", () => {
    const id = 123
    const responseMockData = { data: {success: true}};

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should delete the report', async () => {
        axiosApi.mockResolvedValueOnce(responseMockData);

        const result = await deleteReportApi(id);

        expect(result).toEqual(responseMockData);
        expect(axiosApi).toHaveBeenCalledWith({
            endpoint: urlJoin(ENDPOINTS.report, id.toString()),
            method: 'DELETE',
        });
    });

    it('should handle errors and show an error message', async () => {
        const expectedError = new Error('API call failed');
        SwalWithBootstrapButtons.fire = jest.fn();
        
        axiosApi.mockRejectedValueOnce(expectedError);

        try {
            await deleteReportApi(id);
        }
        catch (error) {
            expect(error).toEqual(expectedError);
            
            expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith({
                title: 'Oops...',
                text: "Une erreur de suppression du rapport est survenue.",
            });
        }
    });
})
