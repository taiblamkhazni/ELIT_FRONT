/**
 * @file ModalReportsList.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant ModalReportsList.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @external redux-mock-store
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Import du composant ModalReportsList pour le tester.
 */
import ModalReportsList from "../ModalReportsList";

/**
 * @brief Substitution de la fonction console.error par une fonction vide de jest.
 */
console.error = jest.fn()

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Création d'un thème mock pour le provider de thème.
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

describe("testing the ModalReportsList component", () => {
    beforeEach(() => {

        let dispatchMock = jest.fn();

        const initialState = {
            projectReducer: {
                projectId: 1,
                reportsList: [{title: "test", iteration: 2, type: "test", creationDate: new Date(2023, 1, 1).toISOString()}]
            },
        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ModalReportsList
                        isModalOpen={true}
                        setIsModalOpen={jest.fn()}
                        title={"test"}
                        type={"test"}
                    />
                </Provider>
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {
        let title = screen.getByText("Historique des rapports", { exact: false })
        let text = screen.getByText("Retrouvez ici tous les rapports ELIT", { exact: false })
        expect(title).toBeInTheDocument()
        expect(text).toBeInTheDocument()
    })

    it("should show the infos of the report", () => {
        let title = screen.getByText("test")
        let iteration = screen.getByText("1")
        let date = screen.getByText("01/02/2023")
        expect(title).toBeInTheDocument()
        expect(iteration).toBeInTheDocument()
        expect(date).toBeInTheDocument()
    })

    it("should show the table columns", () => {
        let col1 = screen.getByText("Document")
        let col2 = screen.getByText("Itération")
        let col3 = screen.getByText("Date de création")
        let col4 = screen.getByText("Actions")
        expect(col1).toBeInTheDocument()
        expect(col2).toBeInTheDocument()
        expect(col3).toBeInTheDocument()
        expect(col4).toBeInTheDocument()
    })
});
