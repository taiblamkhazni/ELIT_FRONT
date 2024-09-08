/**
 * @file ModalChangeNameFile.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant ModalChangeNameFile.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @external redux-mock-store
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Import du composant ModalChangeNameFile pour le tester.
 */
import ModalChangeNameFile from "../ModalChangeNameFile";

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
        let initialState = {}

        let dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState)

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <QueryClientProvider client={queryClient}>
                            <ModalChangeNameFile
                                isModalOpen={true}
                                setIsModalOpen={jest.fn()}
                                attachementId={1}
                                fileName={"File test"}
                            />
                        </QueryClientProvider>
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("should display the other component if attachment is empty", () => {

        let title = screen.getByText("Renommage du nom de fichier", { exact: false })

        expect(title).toBeInTheDocument()

        let button = screen.getByText("Valider")
        expect(button).toBeInTheDocument()

    });

    it("should show msg popup", () => {
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });

        let button = screen.getByText("Valider")
        expect(button).toBeInTheDocument()

        fireEvent.click(button)

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
            {
                title: "Êtes-vous sûr?",
                text: "Cette action est irréversible ! Ce fichier sera renommé définitivement",
                showCancelButton: true,
                cancelButtonColor: "#C91432",
                confirmButtonColor: "#10B581",
                confirmButtonText: "Valider",
                cancelButtonText: "Annuler",
                reverseButtons: true,
            }
        )
    })
});
