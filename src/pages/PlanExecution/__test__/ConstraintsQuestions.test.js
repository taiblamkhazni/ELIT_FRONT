/**
 * @file ConstraintsQuestions.test.js
 * @brief Contient les tests unitaires pour le composant Textarea.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen, waitFor } from "@testing-library/react";

/**
 * @brief Importation du composant Textarea pour le tester
 */
import ConstraintsQuestions from "../ConstraintsQuestions";
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
    executionPlanReducer: {
        listQuestions: [{
            title: "test",
            description: "test",
            answer: "test",
            executionQuestionId: 1
        }]
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
            gris: "#someColor",
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



describe("testing the TextareaQuestions component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        const validation = {
            register: jest.fn(),
            formState: {
                errors: {
                    1: {
                        message: 'Votre réponse contient des caractères non acceptés.',
                    },
                },
            },
        }

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ConstraintsQuestions validation={validation} />
                </ThemeProvider>
            </Provider>
        );
    });
    screen.debug();
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it should show the right component", async () => {
        await waitFor(() => {
            const text = screen.getByText((content, element) => {
                return content.includes("1. test :") && element.tagName.toLowerCase() === 'span';
            });
            expect(text).toBeInTheDocument();
            expect(screen.getByText("Votre réponse contient des caractères non acceptés.")).toBeInTheDocument();
        }, { timeout: 20 });

    });
});
