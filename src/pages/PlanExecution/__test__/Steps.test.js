/**
 * @file Steps.test.js
 * @brief Contient les tests unitaires pour le composant Steps.
 */
import { getSurveyAnswersByUserId, getSurveyQuestions } from "hooks/apis/PlanExecutionApi";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Steps pour le tester
 */
import {Steps} from "../Steps";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn();
console.warn = jest.fn();
/**
 * @brief Configuration du magasin Redux simulé.
 */
const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */

jest.mock('hooks/apis/PlanExecutionApi.js', () => ({
    getSurveyAnswersByUserId: jest.fn(),
    getSurveyQuestions: jest.fn(),
}));
const initialState = {
    projectReducer: {
        currentUser: {
            role: "CDP"
        },
        project: {
            contributors: [],
            attachments: []
        },
        reportsNumber: []
    },
    executionPlanReducer: {
        idPlanExecution: null,
        inputForm: null,
        vote2MethodsHyBrid: null,
        current: null,
        methodologiesArray: [],
        voteMethod: [],
    },
    previsibilityAnalysisReducer: {
        methodologies: [
            { name: "Methodology A", value: 15 },
            { name: "Methodology B", value: 10 },
            { name: "Methodology C", value: 18 },
        ],
    },
    authentificationReducer: {
        user: {
            firstname: "John",
            lastname: "Doe",
        },
    },
};

/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
 */
const themeMock = {
    colors: {
        primaires: {
            blueLight: "#someColor",
            blueDark: "#someColor",
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
 * @brief Création d'une variable simulé pour le dispatche.
 */
let dispatchMock;

describe("testing the connexion component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        const mockQuestions = ['Question 1', 'Question 2'];
        getSurveyQuestions.mockResolvedValue(mockQuestions);

        getSurveyAnswersByUserId.mockResolvedValue([]);
        const project = { id: 1, name: 'Project 1', chefId: 1, contributors: [] };
        const currentUser = { id: 1, name: 'User 1', contributerId: 1 };
        const checkChefDeProjet = currentUser.contributerId === project.chefId;

        render(
            <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <ThemeProvider theme={themeMock}>
                        <Steps projectData={project} currentUser={currentUser} checkChefDeProjet={checkChefDeProjet} />
                    </ThemeProvider>
                </QueryClientProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("test the tilte", () => {

        const text = screen.getByText("Contraintes projet");

        expect(text).toBeInTheDocument();
    });

});
