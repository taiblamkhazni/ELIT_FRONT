/**
 * @file Swipper.test.js
 * @brief Ce fichier contient des tests pour le composant Swipper.
 */
/**
 * @brief Importation du react-redux.
 */
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
/**
 * @brief Importation du configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Swipper pour le tester
 */
import Swipper from "../Swipper";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

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
 * @brief Configuration de du magasin Redux simulé
 */
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

describe("testing the swipper", () => {
    beforeEach(() => {

        store = mockStore(initialState)

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                <Router>
                        <Swipper />
                    </Router>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it shows all four texts", () => {
        const text1 = screen.getByText("Un choix de méthode avec une analyse collaborative");
        const text2 = screen.getByText("Une aide à la décision avec l’intelligence artificielle");
        expect(text1).toBeInTheDocument();
        expect(text2).toBeInTheDocument();

    });
});
