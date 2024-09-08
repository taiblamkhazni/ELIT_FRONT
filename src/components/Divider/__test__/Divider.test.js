/**
 * @file Divider.test.js
 * @brief Ce fichier contient des tests pour le composant HorizontalDividerBase.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base"

import { HorizontalDividerBase } from "../Divider"

import "jest-styled-components"

test("ButtonNoBackground tests props active", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <HorizontalDividerBase />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border-top", "1px solid #E9E9E9")
    expect(tree).toHaveStyleRule("padding", "0")
    expect(tree).toHaveStyleRule("margin", "0")
})
