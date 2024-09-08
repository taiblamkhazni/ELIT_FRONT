/* eslint-disable no-import-assign */
/**
 * @file ReceiveMail.test.js
 * @brief Contient les tests unitaires pour le composant Reçu de mail.
 */
import { BrowserRouter } from "react-router-dom";
/**
 * @brief Importation du de ThemeProvider.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant ReceiveMail pour le tester
 */
import ReceiveMail from "../ReceiveMail";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/",
    })
}))

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
 * @brief Test suite for the ProtectedRoutesProjects component.
 */
describe("testing the connexion component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={themeMock}>
                    <ReceiveMail />
                </ThemeProvider>
            </BrowserRouter >
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @brief Test to check if it shows the right title
     */
    it("should show the right title", () => {
        const button = screen.getByText("Vous y êtes presque !");

        expect(button).toBeInTheDocument();
    });
});
