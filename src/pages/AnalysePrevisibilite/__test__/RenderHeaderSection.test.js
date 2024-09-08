/**
 * @file RenderHeaderSection.test.js
 * @brief Contient les tests unitaires pour le composant RenderHeaderSection.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant RenderHeaderSection pour le tester
 */
import RenderHeaderSection from "../RenderHeaderSection";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("hooks/apis/AdminApi")

console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    previsibilityAnalysisReducer: {
        id: 1,
        votes: [],
        current: 1,
        percentages: ["", ""],
        methodologies: [],
        elementalEscores: [],
    },
    multicriteriaAnalysisReducer: {
        isFinished: false,
    },
    projectReducer: {
        project: {
            contributors: [
                { name: 'John', role: 'Developer' },
                { name: 'Jane', role: 'Designer' },
            ],
            multiCriteriaAnalysisList: []
        },
        currentUserRole: "CDP",
        projectId: 1,
    },
    authentificationReducer: {
        user: {

        },
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
describe("RenderHeaderSection component", () => {
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
                    <RenderHeaderSection
                        current={1} iteration2={false}
                    />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders correctly when current is not 0', () => {
        const { container } = render(<Provider store={store}>
            <ThemeProvider theme={themeMock}>
                <RenderHeaderSection
                    current={1} iteration2={false}
                />
            </ThemeProvider>
        </Provider>);

        // Expect nothing to be rendered when current is not 0
        expect(container.firstChild).toBeNull();
    });

    it('renders correctly when current is 0 and iteration2 is false', () => {
        render(<RenderHeaderSection current={0} iteration2={false} />);

        expect(screen.getByText(/Un échange collaboratif avec les parties prenantes/)).toBeInTheDocument();
        expect(screen.getByText(/Dans quelle mesure estimez-vous que la prédiction de la méthodologie/)).toBeInTheDocument();
    });

    it('renders correctly when current is 0 and iteration2 is true', () => {
        render(<RenderHeaderSection current={0} iteration2={true} />);

        expect(screen.getByText(/Iteration 2 de cette étape/)).toBeInTheDocument();
        expect(screen.getByText(/Dans quelle mesure estimez-vous que la prédiction de la méthodologie/)).toBeInTheDocument();
    });


});
