/**
 * @file ListComments.test.js
 * @brief This file contains tests for the ListComments component.
 */
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

/**
 * @brief Importation of @testing-library/react.
 */
import { render, screen } from "@testing-library/react";

import ListCommentaires from "../ListComments";

import "jest-localstorage-mock";


console.error = jest.fn()

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");

/**
 * @brief Mock for the Redux store.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/**
 * @brief Overriding console.error to suppress error outputs during test execution.
 */
console.error = jest.fn()



/**
 * @brief Mock theme data for styled-components.
 */
const themeMock = {
    colors: {
        primaires: {
            blueLight: "#someColor",
            blueDark: "#someColor",
            blue: "#someColor",
        },
        secondaires: {
            grisLight: "#someColor",
        },
        avertissements: {
            danger: "red",
        },
    },
    fontWeights: {
        regular: "400",
    },
    lineHeights: {
        Deci: "1.5",
    },
};

let commentaires = [
    {
        brainstormingText: "brainstormingText test",
        lastName: "issam",
        userId: ""
    }
]

/**
 * @brief Tests for the FileTable component.
 */
describe("testing the FileTable component", () => {
    /**
     * @brief Setup before each test.
     * @details Initializes mocks and renders the ListCommentaires component.
     */
    beforeEach(() => {
        let setListStepweights = jest.fn()
        let listStepWeights = []
        let getCurrentStepWeights = jest.fn(() => [])

        let dispatchMock = jest.fn();

        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1
            }
        };

        const mockAuthTokens = { "access-token": "fake-access-token" };
        const mockAuthTokensString = JSON.stringify(mockAuthTokens);

        jest.spyOn(window.localStorage, "getItem").mockReturnValue(mockAuthTokensString);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            setListStepweights, listStepWeights, getCurrentStepWeights
        });

        render(
            <ThemeProvider theme={themeMock}>
                <ListCommentaires comments={commentaires} />
            </ThemeProvider>
        )
    });

    /**
     * @brief Cleanup after each test.
     * @details Clears all mocks.
     */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @brief Tests if the correct title is displayed.
     * @details Ensures that the title "brainstormingText test" is in the document.
     */
    it("should show the right title", () => {

        let title = screen.queryByText("brainstormingText test")
        expect(title).toBeInTheDocument()


    })
});
