/**
 * @file Information.test.js
 * @brief Contient les tests unitaires pour le composant Information.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Information pour le tester
 */
import Information from "../Information";

/** 
 * @brief Mock pour le thème. 
 * */
const themeMock = {
    colors: {
        primaires: {
            blueLight: "#someColor",
            blueDark: "#someColor",
        },
        secondaires: {
            grisLight: "#someColor",
        },
    },
    fontWeights: {
        regular: "400",
    },
    lineHeights: {
        Deci: "1.5",
    },
};

describe("I want to see the information content", () => {
    it("the title should be displayed to the user", () => {
        render(
            <ThemeProvider theme={themeMock}>
                <Information />
            </ThemeProvider>
        );

        expect(screen.getByText(/Les critères d'évaluation :/i)).toBeInTheDocument();
    });

    it("the description should be displayed to the user", () => {
        render(
            <ThemeProvider theme={themeMock}>
                <Information />
            </ThemeProvider>
        );

        expect(
            screen.getByText(
                /Les critères d'évaluations aident les décideurs à évaluer quantitativement l’ensemble des questions. Les collaborateurs peuvent aussi définir un poids pour chaque critère afin d'indiquer si un critère est prépondérant par rapport à un autre critère./i
            )
        ).toBeInTheDocument();
    });
});
