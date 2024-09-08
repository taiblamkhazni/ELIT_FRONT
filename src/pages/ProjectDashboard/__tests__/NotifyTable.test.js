/** 
 * @file NotifyTable.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant NotifyTable.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
/** 
 * @external redux-mock-store
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import NotifyTable from "../NotifyTable"


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
 * @brief Substitution de la fonction console.log par une fonction vide de jest.
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
                        <NotifyTable />
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("switch between the profile view and the change your password view", () => {
        const text = screen.getByText("Notifications (5)", { exact: false });

        expect(text).toBeInTheDocument();
    })
});
