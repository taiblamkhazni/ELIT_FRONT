/**
 * @file ModalProjectCreation.test.js
 * @brief Ce fichier contient des tests pour le composant ModalProjectCreation.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

import ModalProjectCreation from "../ModalProjectCreation";

jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

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
 * Mock du thème.
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

/**
* Test du composant ModalProjectCreation
**/
describe("testing the ModalProjectCreation component", () => {
    /**
     * Exécute avant chaque test.
     **/
    beforeEach(() => {
        let invitedColabs = []
        let uploadedFiles = []
        let setUploadedFiles = jest.fn()
        let setInvitedColabs = jest.fn()
        let colabList = []
        let listSelected = []
        let deleteColabById = jest.fn()
        let handleInviterColabs = jest.fn()
        let onChangeFileUpload = jest.fn()

        let dispatchMock = jest.fn();

        const initialState = {
            authentificationReducer: {
                user: {
                    roles: ["USER"]
                }
            },
            projectsReducer: {
                showMessageCreationModal: true, // Adjust according to your state structure
            },
            projectReducer: {
                projectId: 1, 
            }
        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useProjectCreationContext.mockReturnValue({
            invitedColabs,
            uploadedFiles,
            setUploadedFiles,
            setInvitedColabs,
            colabList,
            listSelected,
            deleteColabById,
            handleInviterColabs,
            onChangeFileUpload,
        });

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <ModalProjectCreation />
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )
    });

    /**
     * Exécute après chaque test.
     **/
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Teste le titre du composant.
     */
    it("should show the right title", () => {
        let button = screen.getByText("Créer un nouveau projet")
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        let text = screen.getByText("Soumettre une demande de création d'un projet")
        expect(text).toBeInTheDocument()
    })

    /**
     * Teste la fonctionnalité showModal.
     */
    it("should initialize with correct state", () => {
        const button = screen.getByText("Créer un nouveau projet");
        fireEvent.click(button);

        expect(screen.getByText("Soumettre une demande de création d'un projet")).toBeInTheDocument();
        expect(useProjectCreationContext).toHaveBeenCalled();
        expect(useDispatch).toHaveBeenCalled();
        expect(useSelector).toHaveBeenCalled();
    });

    /**
     * Teste la fonctionnalité showModal.
     */
    it("should handle showModal correctly", () => {
        const button = screen.getByText("Créer un nouveau projet");
        fireEvent.click(button);

        expect(screen.getByText("Soumettre une demande de création d'un projet")).toBeInTheDocument();
    });
});
