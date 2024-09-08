/**
 * @file Footer.test.js
 * @brief Contains unit tests for the Footer component.
 */

/**
 * @brief Importing context and hooks related to AnalyseMulticriteresFeatures.
 */
import { StepsContext, useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
/**
 * @brief Import react-redux's Provider, useDispatch, and useSelector for state management.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Mocking store for Redux to simulate redux actions and states.
 */
import configureStore from "redux-mock-store";
/**
 * @brief Import for styled-components theming.
 */
import { ThemeProvider } from "styled-components";

/**
 * @brief Utilities from @testing-library/react for rendering components and querying the DOM.
 */
import { render, screen } from "@testing-library/react";

/**
 * @brief Component under test - Footer.
 */
import Footer from "../Footer";

/**
 * @brief Mocking the useDispatch and useSelector hooks from react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/**
 * @brief Mocking the features related to AnalyseMulticriteresFeatures.
 */
jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");

/**
 * @brief Overriding console.error to suppress error outputs during test execution.
 */
console.error = jest.fn()

const mockStore = configureStore();
let store;

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

/**
 * @brief Test suite for the Footer component.
 */
describe("testing the FileTable component", () => {
    /**
     * Set up mocks and configure the initial state before each test.
     */
    beforeEach(() => {
        let getValidationByCurrent = jest.fn()
        let getListFormQuestionsByCurrentStep = jest.fn()
        let listFormQuestions = []
        let setListFormQuestions = jest.fn()
        let getCurrentStepDataFromFormsStep = jest.fn()
        let getCurrentStepWeights = jest.fn(() => [])

        let dispatchMock = jest.fn();

        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1,
                isIteration2AP: true
            },
            projectReducer: {
                projectId: 1
            },

        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            getValidationByCurrent, getListFormQuestionsByCurrentStep,
            setListFormQuestions, listFormQuestions, getCurrentStepWeights, getCurrentStepDataFromFormsStep
        });
    });
    /**
     * Clear all mocks after each test.
     */
    afterEach(() => {
        jest.clearAllMocks();
    });

  
   

    /**
     * Test to verify the correct title is displayed on the component.
     */
    it("should show the right title", () => {
        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <StepsContext.Provider>
                        <Footer phasesLength={4} />
                    </StepsContext.Provider>
                </Provider>
            </ThemeProvider>
        )

        let text = screen.getByText("Enregistrer");
        expect(text).toBeInTheDocument()

    })
});
