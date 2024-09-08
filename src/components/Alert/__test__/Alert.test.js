/**
 * @file Alert.test.js
 * @brief Ce fichier contient des tests pour les composant  ErrorAlert.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base"

import { ErrorAlert } from "../Alert"

import "jest-styled-components"
/**
 * @brief test unitaire pour l'objet Alert.
 */
test("Alert component works", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <ErrorAlert />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("color", expect.stringContaining("#C91432"))
    expect(tree).toHaveStyleRule("font-style", "normal")
})
