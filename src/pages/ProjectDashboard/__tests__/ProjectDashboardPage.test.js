/**
 * @file ProjectDashboardPage.test.js
 * @brief Contient les tests unitaires pour le composant IndexCopy.
 */
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant IndexCopy pour le tester
 */
import IndexCopy from "../ProjectDashboardPage";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");
/**
 * @brief Création d'un nouvel client pour les requêtes.
 */
const queryClient = new QueryClient();
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
 * @brief Test group for FileTable component
 */
describe("testing the FileTable component", () => {
    beforeEach(() => {

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

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <IndexCopy />
                    </QueryClientProvider>
                </Provider>
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    /**
     * @brief Test to check if it shows the right title
     */
    it("should show the right title", () => {

        let title = screen.getByText("Une erreur de récupération d'un projet est survenue!")
        expect(title).toBeInTheDocument()

    })
});
