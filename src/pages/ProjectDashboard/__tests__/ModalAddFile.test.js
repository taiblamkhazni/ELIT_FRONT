/**
 * @file ModalAddFile.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant ModalAddFile.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
/**
 * @external hooks
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
/**
 * @brief Import de configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Import du composant ModalAddFile pour le tester.
 */
import ModalAddFile from "../ModalAddFile";

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

const mockStore = configureStore();

let store;

/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
};

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

describe("testing the ModalAddFile component", () => {
    beforeEach(() => {
        let uploadedFiles = [{ lastModified: new Date(2023, 1, 1), name: "test1" }]
        let mockOnChageFileUpload = jest.fn();
        let mocksetUploadedFiles = jest.fn();
        let projectId = 1

        useProjectCreationContext.mockReturnValue({
            uploadedFiles, mockOnChageFileUpload, mocksetUploadedFiles, projectId
        });
        store = mockStore(initialState);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("initially, it should display 'Ajouter un fichier' button", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <QueryClientProvider client={queryClient}>
                        <ModalAddFile />
                    </QueryClientProvider>
                </ThemeProvider>
            </Provider>
        );

        const title = screen.queryByText("Fichiers", { exact: false })

        expect(
            screen.getByText("Ajouter un fichier", { exact: false })
        ).toBeInTheDocument();
        expect(title).not.toBeInTheDocument()
    });

    it("when clicked on, it should display the modal", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <ModalAddFile />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </ThemeProvider>
            </Provider>
        );

        const button = screen.getByText("Ajouter un fichier", { exact: false })
        expect(button).toBeInTheDocument();

        fireEvent.click(button)

        const title = screen.queryByText("Fichiers", { exact: false })

        expect(title).toBeInTheDocument()
    });

    it("should show a pop up when clicked on 'Sauvegarder'", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={themeMock}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <ModalAddFile />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </ThemeProvider>
            </Provider>
        );

        const button = screen.getByText("Ajouter un fichier", { exact: false })
        expect(button).toBeInTheDocument();

        fireEvent.click(button)

        const title = screen.getByText("Fichiers", { exact: false })
        const saveButton = screen.getByText("Sauvegarder", { exact: false })

        expect(title).toBeInTheDocument()
        expect(saveButton).toBeInTheDocument()
    })
});
