/**
 * @file ColabTable.test.js
 * @brief Ce fichier contient des tests pour le composant ColabTable.
 */
import { Provider } from "react-redux";
/**
 * @brief Import de configureStore.
 */ 
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Import du composant ColabTable pour le tester.
 */ 
import ColabTable from "../ColabTable";
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

store = mockStore(initialState);

describe("testing the ColabTable component", () => {


    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right component", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ColabTable collaborateurs={[{permission : "test"}, {user: "test2", permission : "test2"}]} />
                </ThemeProvider>
            </Provider>
        );

        const title = screen.getByText("Collaborateurs (2)")
        const link = screen.getByRole('link', { name: 'Éditer' });

        expect(title).toBeInTheDocument();
        expect(link).toBeInTheDocument();
    });

    it("should show the the right text when having one element only", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ColabTable collaborateurs={[{permission : "test"}]} />
                </ThemeProvider>
            </Provider>
        );

        const title = screen.getByText("Collaborateur (1)")
        const link = screen.getByRole('link', { name: 'Éditer' });

        expect(title).toBeInTheDocument();
        expect(link).toBeInTheDocument();
    });


    it("prevents default behaviour on click", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ColabTable collaborateurs={[{permission : "test"}, {user: "test2", permission : "test2"}]} />
                </ThemeProvider>
            </Provider>
        );

        const link = screen.getByRole('link', { name: 'Éditer' });

        fireEvent.click(link)

        expect(link.getAttribute('href')).toBe('/#')
    })

});
