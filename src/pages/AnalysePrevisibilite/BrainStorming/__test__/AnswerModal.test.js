/**
 * @file AnswerModal.test.js
 * @brief Contient les tests unitaires pour le composant AnswerModal.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant AnswerModal pour le tester
 */
import AnswerModal from "../AnswerModal";

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
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
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
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
    userReducer: {
        userInfo: {},
        avatarUrl: "https://exaplme.com"
    },
    projectReducer: {
        projectId: 1
    },
    previsibilityAnalysisReducer:{
        id:1
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
/**
 * @brief Création d'un varibale l'objet question
 */
let question = {
    questionId: 1,
    questionRef: 1,
    criterias: [],

}


describe("testing the modal component", () => {
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
                        <AnswerModal question={question} />
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders the button to open the modal", () => {
        const text = screen.getByText("Modifier la réponse");
        expect(text).toBeInTheDocument();
    });

    it("shows the modal when the button is clicked", async () => {
        const text = screen.queryByText("Modifier la réponse");
        expect(text).toBeInTheDocument();
        fireEvent.click(text);

        const modalTitle = screen.queryByText("Modifier votre réponse");
        expect(modalTitle).toBeInTheDocument();
    });

    it("shows the validation button in the modal", async () => {
        const text = screen.queryByText("Modifier la réponse");
        expect(text).toBeInTheDocument();
        fireEvent.click(text);

        const button = screen.queryByText("Valider la modification");
        expect(button).toBeInTheDocument();
    });
});
