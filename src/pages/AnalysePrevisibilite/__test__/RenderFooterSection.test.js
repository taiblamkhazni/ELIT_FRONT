/**
 * @file RenderFooterSection.test.js
 * @brief Contient les tests unitaires pour le composant RenderFooterSection.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant RenderFooterSection pour le tester
 */
import RenderFooterSection from "../RenderFooterSection";
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
let mockHandleClickButtonNoBackground
let mockHandleClickNextStepButtonRight
describe("RenderFooterSection component", () => {
    beforeEach(() => {
        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);
        mockHandleClickButtonNoBackground = jest.fn();
        mockHandleClickNextStepButtonRight = jest.fn();

        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <RenderFooterSection
                        current={0}
                        result={null}
                        currentUserRole="CDP"
                        passToStage3={jest.fn()}
                        handleClickButtonNoBackground={mockHandleClickButtonNoBackground}
                        handleClickNextStepButtonRight={mockHandleClickNextStepButtonRight}
                        handleClickleftChild={jest.fn()}
                        handleClickNextStepButton={jest.fn()}
                        handleClickrightChild={jest.fn()}
                    />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders correctly with current = 0', () => {
        expect(screen.getByText('Lancer l\'analyse')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Lancer l\'analyse'));

        expect(mockHandleClickNextStepButtonRight).toHaveBeenCalledTimes(1);
    });


});
