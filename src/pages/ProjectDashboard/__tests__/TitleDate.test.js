/**
 * @file TitleDate.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant TitleDate.
 */
import { Provider } from "react-redux";
/**
 * @external redux-mock-store
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Import du composant TitleDate pour le tester.
 */
import TitleDate from "../TitleDate";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */

console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
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


describe("testing the TitleDate component", () => {
    beforeEach(() => {

        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <TitleDate title={"test_date"} date={"2023-05-30"}  />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it should show the right title and the right date", () => {
        const title = screen.getByText("test_date")

        const date = screen.getByText("Crée le 30/05/2023")

        expect(title).toBeInTheDocument();
        expect(date).toBeInTheDocument();
    });
});
