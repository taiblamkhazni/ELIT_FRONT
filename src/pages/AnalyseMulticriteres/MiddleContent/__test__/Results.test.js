/**
 * @file Results.test.js
 * @brief unites test for results
 */
import axios from "axios";
import * as reactRedux from "react-redux";

import { render } from "@testing-library/react";

import Results from "../Results";

const mockDispatch = jest.fn();
jest.mock('axios')
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
    useSelector: jest.fn(),
}));
/**
 * @brief unit test result
 */
describe("Results", () => {
    beforeEach(() => { });

    /**
     * @brief test to check if results work
     */
    it("Results", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

        axios.mockReturnValue([]);

        useSelectorMock.mockReturnValue({
            multicriteriaAnalysisReducer: { multiCriteriaAnalysisId: 100000 },
            bar: { base64: "YmFzZTY0" },
            column: {
                specificite: {
                    base64: "YmFzZTY0"
                },
                certitude: {
                    base64: "YmFzZTY0"
                },
                manoeuvrabilite: {
                    base64: "YmFzZTY0"
                }
            },
            weight: {
                specificite: {
                    base64: "YmFzZTY0"
                },
                certitude: {
                    base64: "YmFzZTY0"
                },
                manoeuvrabilite: {
                    base64: "YmFzZTY0"
                }
            }
        })




        render(
            <Results
                allGraphSorted={[]}
                partialResultsData={[]}
                projectData={{ contributors: [] }}
                projectId={1111}
            ></Results>
        );
    });
});
