/**
 * @file CommentModal.test.js
 * @brief Contient les tests unitaires pour le composant CommentModal.
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
 * @brief Importation du composant CommentModal pour le tester
 */
import CommentModal from "../CommentModal";
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
        projectId: 1,
        currentUserRole: "CDP"
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
    questiontext: "Question test",
    questionRef: 1,
    criterias: [],
    brainstormings: [{ firstName: "issam" }]
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
                        <CommentModal
                            question={question}
                            predictibilityAnalysisId={1}
                            user={{ firstName: "issam" }}
                        />
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("switch between the profile view and the change your password view", () => {

        const text = screen.getByText("Ajouter une note");

        expect(text).toBeInTheDocument();
    })

    it("show the modal when we click on the span", async () => {

        const text = screen.queryByText("Ajouter une note");
        expect(text).toBeInTheDocument();
        fireEvent.click(text)

        const button = screen.queryByText("Valider");
        expect(button).toBeInTheDocument();
    })
});
