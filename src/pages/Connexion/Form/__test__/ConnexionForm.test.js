/**
 * @file ConnexionForm.test.js
 * @brief Contient les tests unitaires pour le composant Connexion.
 */
import { createContext, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ConnexionForm from "../ConnexionForm";
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
    authentificationReducer: {
        user: {
            firstname: "John",
            lastname: "Doe",
        },
    },
    userReducer: {
        userInfo: {},
        avatarUrl: "https://exaplme.com"
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

describe("testing the connexion component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        const ConnexionContext = createContext({});

        const setPasswordHidden = jest.fn();

        let passwordHidden = true;

        const contextValue = { passwordHidden, setPasswordHidden }

        const TestProvider = () => {
            const memoValue = useMemo(() => contextValue, [])
            return (
                <ConnexionContext.Provider value={memoValue} >
                    <ConnexionForm />
                </ConnexionContext.Provider>
            )
        }

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={themeMock}>
                        <TestProvider />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be a message error if the email is not valid", async () => {
        const submit = screen.getByTestId("connexionButton");

        const inputEmail = screen.getByPlaceholderText("dupont@gmail.com");
        fireEvent.input(inputEmail, {
            target: {
                value: "test",
            },
        });

        fireEvent.submit(submit);

        await waitFor(() =>
            expect(
                screen.getByText("L’adresse e-mail est invalide. Veuillez respecter le format exemple@domaine.com")
            ).toBeInTheDocument()
        );
    });

    it('should be enabled when both email and password fields are filled', async () => {
        const emailInput = screen.getByPlaceholderText("dupont@gmail.com");
        const passwordInput = screen.getByPlaceholderText("Mot de passe");
        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        const button = screen.getByTestId("connexionButton");

        await waitFor(() => {
            expect(button).toBeInTheDocument();
        });
    });

    it('should be disabled when both email and password fields are empty', async () => {
        /** Initially, both fields are empty, so the button should be disabled*/
        const button = screen.getByTestId("connexionButton");

        await waitFor(() => {
            expect(button).toHaveStyle('background-color: #E9E9E9');
            expect(button).toHaveStyle('color: #6A6A6A');
            expect(button).toBeDisabled();
        });
    });
});
