/**
 * @file EditQuestion.test.js
 * @brief Contient les tests unitaires pour le composant EditQuestion.
 */
import { StepsContext, useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant EditQuestion pour le tester
 */
import EditQuestion from "../EditQuestion";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
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
 * @brief Test suite for the EditQuestion component.
 */
describe("testing the FileTable component", () => {
    /**
     * Set up mocks and render the EditQuestion component before each test.
     */
    beforeEach(() => {

        let setEditQuestion = jest.fn()

        let dispatchMock = jest.fn();

        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1
            }
        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            setEditQuestion
        });

        let question =
        {
            questionRef: "",
            questionText: "text test",
            answerText: "answer test",
            criterias: [
                {
                    criteriaName: "criteria name",
                    criteriaValue: "criteria value",
                }
            ]
        }


        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <StepsContext.Provider>
                        <EditQuestion
                            currentStep={1}
                            question={question}
                            questionnumber={1}
                        />
                    </StepsContext.Provider>
                </Provider>
            </ThemeProvider>
        )
    });
    /**
     * Clear all mocks after each test.
     */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test to verify the correct title appears, and certain elements are present in the EditQuestion component.
     */
    it("should show the right title", () => {
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });

        let title = screen.getByText("Question 1")
        expect(title).toBeInTheDocument()


    })
});
