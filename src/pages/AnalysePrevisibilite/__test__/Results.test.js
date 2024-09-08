/**
 * @file Inscription.test.js
 * @brief Contient les tests unitaires pour le composant Inscription.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Inscription pour le tester
 */
import Results from "../Results";

import "jest-localstorage-mock";
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
/**
 * @brief Configuration du magasin Redux simulé.
 */
const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    "previsibilityAnalysisReducer": {
        "id": 1,
        "votes": 0,
        "isLoadingReport": false
    },
    "projectReducer": {
        "project": {
            "name": "My Project",
            "contributors": [
                {
                    "contributerId": 1,
                    "name": "John Doe",
                    "avatarUrl": "https://avatars.githubusercontent.com/u/12345678?v=4"
                },
                {
                    "contributerId": 1,
                    "name": "Jane Doe",
                    "avatarUrl": "https://avatars.githubusercontent.com/u/98765432?v=4"
                }
            ]
        }
    },
    "brainStormingResumeReducer": {
        "isLoading": false,
        "brainStorming":[{
            "stepId": 30,
            "stepName": "Spécificité",
            "stepRef": 1,
            "multiCriteriaAnalysisId": 10,
            "formQuestions": [
                {
                    "questionId": 108,
                    "questionText": "Quels sont les motivations du projet liées à l’environnement ?",
                    "answerText": "aaaaaaaa",
                    "questionRef": "Spec_2",
                    "updateQuestion": false,
                    "stepId": 30,
                    "criterias": [
                        {
                            "criteriaId": 245,
                            "criteriaName": "Rigueur",
                            "criteriaValue": 1,
                            "questionId": 108
                        },
                        {
                            "criteriaId": 243,
                            "criteriaName": "Clarté",
                            "criteriaValue": 1,
                            "questionId": 108
                        },
                        {
                            "criteriaId": 244,
                            "criteriaName": "Précision",
                            "criteriaValue": 1,
                            "questionId": 108
                        }
                    ],
                    "brainstormings": [
                        {
                            "brainstormingId": 64,
                            "brainstormingText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi u",
                            "isChecked": null,
                            "questionId": 108,
                            "predictibilityAnalysisId": 10,
                            "userId": 1,
                            "firstName": "John",
                            "lastName": "Doe",
                            "role": "CDP"
                        }
                    ]
                },
            ],
            "escore": 0.2
        }]
    },
    "aspectsBarEScore": {
        "base64": "base64 encoded escore data"
    },
    "aspectsBarMethod": {
        "base64": "base64 encoded method data"
    },
    "aspectsGauge": {
        "base64": "base64 encoded gauge data"
    },
}
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

describe("testing the inscription component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        const methodologies = [
            {
                name: "AGILE",
                value: 60,
                nbVotes: 100
            },
            {
                name: "CLASSIC",
                value: 40,
                nbVotes: 50
            },
            {
                name: "HYBRID",
                value: 20,
                nbVotes: 20
            }
        ]

        const mockAuthTokens = { "access-token": "fake-access-token" };
        const mockAuthTokensString = JSON.stringify(mockAuthTokens);

        jest.spyOn(window.localStorage, "getItem").mockReturnValue(mockAuthTokensString);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={themeMock}>
                        <Results
                            result={"result test"}
                            methodologies={methodologies}
                            iteration2={""}
                        />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("test the checkbox", () => {
        const text = screen.getByText("Les résultats issus de l'étape 2", { exact: false });

        expect(text).toBeInTheDocument()
    });
});
