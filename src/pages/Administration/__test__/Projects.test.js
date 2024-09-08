/**
 * @file Projects.test.js
 * @brief Contient les tests unitaires pour le composant Projects.
 */
import { deleteProjectAdminApi, putStateProject } from "hooks/apis/AdminApi";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

/**
 * @brief Importation du composant Projects pour le tester
 */
import Projects from "../Projects";

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/**
 * @brief Utilisation de Jest pour simuler le hook AdminApi.
 */
jest.mock("hooks/apis/AdminApi")

/**
 * @brief Overriding console.error to suppress error outputs during test execution.
 */
console.error = jest.fn()

const mockStore = configureStore();
let store;

/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    projectsAdminReducer: {
        projects: [
            {
                isArchived: false,
                confirmationState: "WAITING",
                name: "Project test",
                projectId: 1
            }

        ]
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
 * @brief Test suite for the Projects component.
 */
describe("testing the profil component", () => {
    /** Set up mocks and render the Projects component before each test. */
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
                    <Projects />
                </ThemeProvider>
            </Provider>
        );
    });

    /** Clear all mocks after each test.*/
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** Test to verify the correct rendering of the component.*/
    it("it should show the right component", () => {
        const text = screen.getByText("Project test");
        expect(text).toBeInTheDocument()
    });
    /** Test to ensure a popup is shown when the 'Supprimer' button is clicked. */
    it("should show a popup when Supprimer is clicked", async () => {
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
        deleteProjectAdminApi.mockResolvedValueOnce({ status: 200 })

        const button = screen.getByText("Supprimer");
        fireEvent.click(button)

        expect(SwalWithBootstrapButtons.fire).toHaveBeenCalledWith(
            {
                title: "Confirmation suppression du projet",
                text: `Confirmez-vous la suppression du projet "Project test" ? Cette action est irréversible. `,
                showCancelButton: true,
                confirmButtonColor: "#10B581",
                cancelButtonColor: "#C91432",
                confirmButtonText: "Supprimer",
                cancelButtonText: "Annuler",
            }
        )
    });


    /**
     * @brief Test to check if it calls the put API when Supprimer is clicked
     *
     */
    it("should call the delete API when Supprimer is clicked", async () => {
        // Mocks
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
        deleteProjectAdminApi.mockResolvedValueOnce({ status: 200 });

        // Find and click 'Supprimer' button
        const deleteButton = screen.getByText('Supprimer');
        fireEvent.click(deleteButton);

        // Wait for any run of the `deleteProjectAdminApi` mock
        await waitFor(() => {
            expect(deleteProjectAdminApi).toHaveBeenCalled();
        });

        expect(deleteProjectAdminApi).toHaveBeenCalledWith(1);
    });

    /**
     * @brief Test to ensure a popup is shown when the 'Confirmer' button is clicked.
     */
    it("should show a popup when Confirmer is clicked", async () => {
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
        putStateProject.mockResolvedValueOnce({ status: 200 })

        const button = screen.getByText("Confirmer");
        fireEvent.click(button)
    });

    /**
     * @brief Test to verify the correct API is called when the 'Confirmer' button is clicked.
     */
    it("should call the put API when Confirmer is clicked", async () => {
        // Mocks
        SwalWithBootstrapButtons.fire = jest.fn().mockResolvedValue({ isConfirmed: true });
        putStateProject.mockResolvedValueOnce({ status: 200 });

        // Find and click 'Confirmer' button
        const confirmButton = screen.getByText('Confirmer');
        fireEvent.click(confirmButton);

        // Wait for any run of the `putStateProject` mock
        await waitFor(() => {
            expect(putStateProject).toHaveBeenCalled();
        });

        expect(putStateProject).toHaveBeenCalledWith(1);
    });

});
