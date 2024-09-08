/**
 * @file ConfirmProject.test.js
 * @brief Contient les tests unitaires pour le composant ConfirmProject.
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
/**
 * @brief Importaion du @testing-library/user-event.
 */
import userEvent from '@testing-library/user-event';

/**
 * @brief Importation du composant ConfirmProject pour le tester
 */
import ConfirmProject from "../ConfirmProject";

/**
 * @brief Utilisation de Jest pour simuler le hook useProjectCreationContext.
 */
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

/**
 * @brief Création d'un nouvel client pour les requêtes.
 */
const queryClient = new QueryClient();
/**
 * @brief Overriding console.error to suppress error outputs during test execution.
 */
console.error = jest.fn()

/**
 * @brief Mock theme data for styled-components.
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
 * @brief Test suite for the ConfirmProject component.
 */
describe("testing the ConfirmProject component", () => {
    /**
     * Render the ConfirmProject component before each test.
     */
    beforeEach(() => {
        render(
            <ThemeProvider theme={themeMock}>
                <QueryClientProvider client={queryClient}>
                    <ConfirmProject />
                </QueryClientProvider>
            </ThemeProvider>
        );
    });

    /** Clear all mocks after each test.*/
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** Test to ensure the correct title is displayed.*/
    it("should display the correct title", () => {

        let title = screen.getByText("Confirmation ou rejet des projets en attente", { exact: false })

        expect(title).toBeInTheDocument()
    });

    /** Test to ensure the correct input fields and buttons are displayed and functional.*/
    it("should display the correct title", async () => {

        const confirmInput = screen.getByLabelText("Entrer l'ID du projet à confirmer");
        const rejectInput = screen.getByLabelText("Entrer l'ID du projet à rejeter");
        expect(confirmInput).toBeInTheDocument()
        expect(rejectInput).toBeInTheDocument()

        const confirmButton = screen.getByText('CONFIRMER');
        const rejectButton = screen.getByText('REJETER');
        expect(confirmButton).toBeInTheDocument()
        expect(rejectButton).toBeInTheDocument()

        //userEvent.clear(confirmInput);
        await waitFor(() => userEvent.type(confirmInput, '123'))
        await waitFor(() => userEvent.type(rejectButton, '456'))
        //userEvent.clear(rejectInput);
        // userEvent.type(rejectInput, '456');

        fireEvent.submit(confirmInput);
        fireEvent.submit(rejectInput);

        expect(confirmInput.value).toBe('0123');
        expect(rejectInput.value).toBe('0');
    });

});
