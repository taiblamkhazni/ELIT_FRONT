/**
 * @file TooltipModal.test.js
 * @brief Ce fichier contient des tests pour le composant TooltipModal.
 */
/**
 * @brief Importation du react-redux.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant TooltipModal pour le tester
 */
import TooltipModal from "../TooltipModal";
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
console.error = jest.fn()

const mockStore = configureStore();
/**
 * @brief Création d'une variable pour simulé store redux.
 */
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
        stageNumber: 0,
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
    },
    fontWeights: {
        regular: "400",
    },
    lineHeights: {
        Deci: "1.5",
    },
};
/**
 * @brief Création d'une variable pour simulé le dispatche.
 */
let dispatchMock;

describe("testing the welcome modal", () => {
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
                    <TooltipModal />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

  
    it("renders the tooltip content correctly", () => {
        
        /**
 * @brief Add a stage number that corresponds to the content you want to check
 */
        useSelector.mockImplementation((callback) => {
            return callback({
                ...initialState,
                welcomeTooltipReducer: {
                    stageNumber: 6, // Set to a stage that has specific content
                },
            });
        });

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <TooltipModal />
                </ThemeProvider>
            </Provider>
        );

        
        /**
 * @brief Check for specific text in the tooltip content
 */
        expect(screen.getByText("Bravo vous avez terminé votre parcours")).toBeInTheDocument();
    });

    it("renders the Fin button correctly", () => {
        /**
 * @brief Add a stage number that corresponds to the button you want to check
 */
        useSelector.mockImplementation((callback) => {
            return callback({
                ...initialState,
                welcomeTooltipReducer: {
                    stageNumber: 6, // Set to a stage that displays the Fin button
                },
            });
        });

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <TooltipModal />
                </ThemeProvider>
            </Provider>
        );

        // Check for the button with specific text
        expect(screen.getByText(/Fin/)).toBeInTheDocument();
    });

});
