/**
 * @file FirstPageReportPDF.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import FirstPageReportPDF from "../FirstPageReportPDF";

import "jest-localstorage-mock";

console.error = jest.fn()

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

        let project = {
            contributors: [],
            createdAt: new Date(2023, 1, 1).toISOString()
        }

        render(
            <ThemeProvider theme={themeMock}>
                <FirstPageReportPDF project={project} DisplayImages={""} subtitle={""} />
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {

        let title = screen.getByText("Collaborateurs du projet:", { exact: false })
        expect(title).toBeInTheDocument()

    })
});
