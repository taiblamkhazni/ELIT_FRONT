/**
 * @file DescriptionTeams.test.js
 * @brief Ce fichier contient des tests pour le composant TeamsSection.
 */
import { Provider } from "react-redux";
/**
 * @brief Import de configureStore.
 */ 
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import { TeamsSection } from "../DescriptionTeams";

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


describe("testing the DescriptionTeams component", () => {
    beforeEach(() => {

        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <TeamsSection />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders link with correct href', () => {
        const link = screen.getByRole('link', { name: 'Réunion Teams' });
        expect(link).toHaveAttribute('href', "https://teams.microsoft.com/");
      });
});
