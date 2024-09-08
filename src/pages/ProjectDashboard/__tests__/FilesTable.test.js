/** 
 * @file FilesTable.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant FilesTable.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
/** 
 * @external hooks
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
/** 
 * @external redux-mock-store
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Import du composant FileTables pour le tester.
 */
import FileTables from "../FilesTable";

/**
 * @brief Utilisation de Jest pour simuler le hook useProjectCreationContext
 */
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

/** 
 * @brief Création d'un nouvel client pour les requêtes.
 */
const queryClient = new QueryClient();

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

describe("testing the FileTable component", () => {
    beforeEach(() => {
        let uploadedFiles = [{ lastModified: "03/03/2022" }]
        let mockOnChageFileUpload = jest.fn()
        let mocksetUploadedFiles = jest.fn()
        let projectId = 1

        let dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useProjectCreationContext.mockReturnValue({
            uploadedFiles, mockOnChageFileUpload, mocksetUploadedFiles, projectId
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should display the correct title in singular", () => {
        const initialState = {
            projectReducer: {
                attachments: [{ fileName: "name1", attachmentId: 1 }],
                projectId: 1
            },
        };

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState)

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <FileTables />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )

        let title = screen.getByText("associé", { exact: false })

        expect(title).toBeInTheDocument()
    });

    it("should display the correct title in plural", () => {
        const initialState = {
            projectReducer: {
                attachments: [{ fileName: "name1", attachmentId: 1 }, { fileName: "name2", attachmentId: 2 }],
                projectId: 1
            },
        };

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState)

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <FileTables />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )

        let title = screen.getByText("associés", { exact: false })

        expect(title).toBeInTheDocument()
    });

    it("should display the other component if attachment is empty", () => {
        const initialState = {
            projectReducer: {
                attachments: [],
                projectId: 1
            },
        };

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState)

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <FileTables />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )

        let title = screen.getByText("Aucun fichier", { exact: false })

        expect(title).toBeInTheDocument()
    });
});
