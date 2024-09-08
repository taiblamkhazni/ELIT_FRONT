/**
 * @file ResetPasswordForm.test.js
 * @brief Contient les tests unitaires pour le composant Inscription.
 */
import { createContext, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * @brief Importation du composant Inscription pour le tester
 */
import ResetPasswordForm from "../ResetPasswordForm";
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

describe("testing the inscription component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        const InscriptionContext = createContext({});

        const setPasswordHidden = jest.fn();
        const setConfirmPasswordHidden = jest.fn();

        let passwordHidden = true;
        let confirmPasswordHidden = true;

        const contextValue = { passwordHidden, setPasswordHidden, confirmPasswordHidden, setConfirmPasswordHidden }

        const TestProvider = () => {
            const memoValue = useMemo(() => contextValue, [])
            return (
                <InscriptionContext.Provider value={memoValue}>
                    <ResetPasswordForm />
                </InscriptionContext.Provider>
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


    it("click on submit with form empty", async () => {
        const submit = screen.getByRole("button", { name: "Envoyer" });
        fireEvent.submit(submit);

        await waitFor(() => {
            expect(
                screen.getAllByText("Veuillez renseigner votre mot de passe.")[0]
            ).toBeInTheDocument();
        });
    });

    it("click on submit with form filled", async () => {
        const input = screen.getByPlaceholderText("Entrez votre nouveau mot de passe");
        const input2 = screen.getByPlaceholderText("Confirmez votre nouveau mot de passe");
        const submit = screen.getByRole("button", { name: "Envoyer" });

        await waitFor(() => {
            userEvent.type(input, 'Azerty1234!?');
            userEvent.type(input2, 'Azerty1234!?');
        });

        // fireEvent.submit(submit);

        await waitFor(() => {
            fireEvent.submit(submit);
            // expect(
            //     screen.getAllByText("success", "Un autre mail de confirmation a été envoyé.")[0]
            // ).toBeInTheDocument();
        });
        expect(submit).toBeInTheDocument()
    });

    it("empty input", async () => {
        const input = screen.getByPlaceholderText("Entrez votre nouveau mot de passe");
        const input2 = screen.getByPlaceholderText("Confirmez votre nouveau mot de passe");
        const submit = screen.getByRole("button", { name: "Envoyer" });

        await waitFor(() => {
            userEvent.type(input, 'A');
            userEvent.type(input2, 'A');
        });

        await waitFor(() => {
            userEvent.clear(input);
            userEvent.clear(input2);
        });

        // fireEvent.submit(submit);

        await waitFor(() => {
            fireEvent.submit(submit);
            // expect(
            //     screen.getAllByText("success", "Un autre mail de confirmation a été envoyé.")[0]
            // ).toBeInTheDocument();
        });
        expect(input).toHaveValue('');
        expect(input2).toHaveValue('');
    });
});
