/**
 * @file Info.test.js
 * @brief This file contains tests for the Info component.
 * @details It uses React's testing-library to perform these tests.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base.js"

import { InfoWrapper } from "../Info"

import "jest-styled-components"

/**
 * @brief Tests the default props of InfoWrapper.
 * @details Ensures that the default styles are correctly applied when no additional props are provided.
 */
test("InfoWrapper tests props deactive", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <InfoWrapper />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("font-weight", "400")
    expect(tree).toHaveStyleRule("font-size", "12px")
    expect(tree).toHaveStyleRule("line-height", "24px")
    expect(tree).toHaveStyleRule("color", "#7A7A7A")
    expect(tree).toHaveStyleRule("min-height", "0px")
    expect(tree).toHaveStyleRule("display", "block")
    expect(tree).toHaveStyleRule("margin", "0")
})

/**
 * @brief Tests the active props of InfoWrapper.
 * @details Ensures that the styles are correctly applied when specific props are provided.
 * @param fontSize The font size to be applied.
 * @param minHeight The minimum height to be applied.
 * @param display The display style to be applied.
 * @param margin The margin to be applied.
 */
test("InfoWrapper tests props active", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <InfoWrapper
                    fontSize="10px"
                    minHeight="10px"
                    display="flex"
                    margin="10px"
                />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("font-weight", "400")
    expect(tree).toHaveStyleRule("font-size", "10px")
    expect(tree).toHaveStyleRule("line-height", "24px")
    expect(tree).toHaveStyleRule("color", "#7A7A7A")
    expect(tree).toHaveStyleRule("min-height", "10px")
    expect(tree).toHaveStyleRule("display", "flex")
    expect(tree).toHaveStyleRule("margin", "10px")
})
