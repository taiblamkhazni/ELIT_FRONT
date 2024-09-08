/**
 * @file PresentationPanel.test.js
 * @brief Ce fichier contient des tests pour le composant PresentationPanel.
 */
/**
 * @brief Importation du react-redux.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant PresentationPanel pour le tester
 */
import PresentationPanel from "../PresentationPanel";

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/** 
 * @brief Création d'un nouvel client pour les requêtes.
 */
const queryClient = new QueryClient();
/**
 * @brief utilisée pour surcharger la fonction console.log pour empêche la console d'afficher les logs pendant l'exécution des tests.
 */
console.log = jest.fn()
console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    authentificationReducer: {
        user: {
            firstname: "John",
            lastname: "Doe"
        },
    },
    welcomeTooltipReducer: {
        stageNumber: 1
    },
    projectReducer: {
        projectId: 1
    }
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


describe("testing the presentation panel component", () => {
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
                    <QueryClientProvider client={queryClient}>
                        <PresentationPanel />
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("switch between the profile view and the change your password view", () => {
        const text = screen.getByText("L’outil pour choisir la meilleure", { exact: false });

        expect(text).toBeInTheDocument();
    })
});
