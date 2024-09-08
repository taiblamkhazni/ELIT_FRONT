/**
 * @file Button.test.js
 * @brief Ce fichier contient des tests pour les composant  BlockButton, ButtonNoBackground, LinkButton et NextStepButton.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base.js"

import {
    BlockButton,
    ButtonNoBackground,
    LinkButton,
    NextStepButton,
} from "../Button.js"

import "jest-styled-components"

test("ButtonNoBackground tests props active", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <ButtonNoBackground
                    height="12px"
                    width="12px"
                    fontSize="5px"
                    optionalColor="red"
                    margin="12px"
                    padding="12px"
                    colorIcon="red"
                />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("height", "12px")
    expect(tree).toHaveStyleRule("width", "12px")
    expect(tree).toHaveStyleRule("font-size", "5px")
    expect(tree).toHaveStyleRule("border", "1px solid red")
    expect(tree).toHaveStyleRule("color", "red")
    expect(tree).toHaveStyleRule("background-color", "transparent")
    expect(tree).toHaveStyleRule("margin", "12px")
    expect(tree).toHaveStyleRule("padding", "12px")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "pointer")
})

test("ButtonNoBackground tests props deactivate", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <ButtonNoBackground />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border", "1px solid #116E9C")
    expect(tree).toHaveStyleRule("height", "initial")
    expect(tree).toHaveStyleRule("width", undefined)
    expect(tree).toHaveStyleRule("font-size", "inherit")
    expect(tree).toHaveStyleRule("color", "#116E9C")
    expect(tree).toHaveStyleRule("background-color", "transparent")
    expect(tree).toHaveStyleRule("margin", "0px 12px 10px 12px")
    expect(tree).toHaveStyleRule("padding", "8px 24px")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "pointer")
})

test("NextStepButton tests props deactivate", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <NextStepButton />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border", "1px solid #116E9C")
    expect(tree).toHaveStyleRule("color", "white")
    expect(tree).toHaveStyleRule("background-color", "#116E9C")
    expect(tree).toHaveStyleRule("margin", "0 0 1rem 0")
    expect(tree).toHaveStyleRule("padding", "8px 24px")
    expect(tree).toHaveStyleRule("font-size", "inherit")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "pointer")
    expect(tree).toHaveStyleRule("width", undefined)
})

test("NextStepButton tests props activate", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <NextStepButton
                    background="red"
                    margin="12px"
                    padding="12px"
                    fontSize="4px"
                    width="100px"
                />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border", "1px solid red")
    expect(tree).toHaveStyleRule("color", "white")
    expect(tree).toHaveStyleRule("background-color", "red")
    expect(tree).toHaveStyleRule("margin", "12px")
    expect(tree).toHaveStyleRule("padding", "12px")
    expect(tree).toHaveStyleRule("font-size", "4px")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "pointer")
    expect(tree).toHaveStyleRule("width", "100px")
})

test("BlockButton tests props deactivate", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <BlockButton />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border", "1px solid #E9E9E9")
    expect(tree).toHaveStyleRule("color", "#7A7A7A")
    expect(tree).toHaveStyleRule("background-color", "#E9E9E9")
    expect(tree).toHaveStyleRule("margin", "0px 12px 10px 12px")
    expect(tree).toHaveStyleRule("padding", "8px 24px")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "not-allowed")
    expect(tree).toHaveStyleRule("width", undefined)
})

test("BlockButton tests props activate", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <BlockButton reset margin="5px" width="10px" />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("border", "1px solid #E9E9E9")
    expect(tree).toHaveStyleRule("color", "#7A7A7A")
    expect(tree).toHaveStyleRule("background-color", "#E9E9E9")
    expect(tree).toHaveStyleRule("margin", "0px")
    expect(tree).toHaveStyleRule("padding", "8px 24px")
    expect(tree).toHaveStyleRule("border-radius", "4px")
    expect(tree).toHaveStyleRule("cursor", "not-allowed")
    expect(tree).toHaveStyleRule("width", "10px")
})

test("LinkButton tests props", () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={base}>
                <LinkButton reset={true} />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toHaveStyleRule("color", "#116E9C")
})
