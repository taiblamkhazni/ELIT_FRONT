/**
 * @file RenderBodySection .test.js
 * @brief Contient les tests unitaires pour le composant RenderBodySection .
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react";

import RenderBodySection from "../RenderBodySection";

/**
 * @brief Importation du composant RenderBodySection  pour le tester
 */

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
            multiCriteriaAnalysisList: [],
            reportsNumber: {
                multicriteria_report: 1,
                predictibility_report: 0,
                execution_report: 0
            },

            attachments: {
                attachmentId: 2,
                fileName: "file2.docx",
                filePath: "path",
                contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                createdAt: "2024-04-29T09:04:05.167+00:00",
                updatedAt: "2024-04-29T09:04:05.167+00:00",
                creatorLastName: "John",
                creatorFirstName: "Doe"
            },
            currentUserRole: "CDP",
            projectId: 1,
        },
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
describe("RenderFooterSection component", () => {
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
                    <RenderBodySection
                        current={undefined}
                        votes={null}
                        projectData={undefined}
                    />
                </ThemeProvider>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders nothing when current or projectData is undefined', () => {
        const { container } = render(<RenderBodySection />);
        expect(container.firstChild).toBeNull();
    });


});
