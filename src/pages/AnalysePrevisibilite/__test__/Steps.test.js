/**
 * @file Steps.test.js
 * @brief Contient les tests unitaires pour le composant Steps.
 */
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
import Steps from "../Steps";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("hooks/apis/AdminApi")

console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    previsibilityAnalysisReducer: {
        id: 1,
        votes: [],
        current: 1,
        percentages: ["", ""],
        methodologies: [],
        elementalEscores: [],
    },
    multicriteriaAnalysisReducer: {
        isFinished: false,
    },
    projectReducer: {
        project: {
            contributors: [
                { name: 'John', role: 'Developer' },
                { name: 'Jane', role: 'Designer' },
            ],
            multiCriteriaAnalysisList: []
        },
        currentUserRole: "CDP",
        projectId: 1,
    },
    authentificationReducer: {
        user: {

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
            danger: "red"
        }
    },
    fontWeights: {
        regular: "400",
    },
    lineHeights: {
        Deci: "1.5",
    },
};

let dispatchMock

describe("testing the profil component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <Steps iteration2={""} />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it should show the right component", () => {
        const text = screen.getByText("Réaliser un Brainstorming");
        expect(text).toBeInTheDocument()
    });
});
