/**
 * @file Li.test.js
 * @brief Ce fichier contient des tests pour le composant Li.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base.js"

import { NotifyLi } from "../Li"

import "jest-styled-components"

const themeColor = base.colors.secondaires.grisMedium

describe("<NotifyLi />", () => {
    test("Li has the correct styles", () => {
        const wrapper = renderer
            .create(
                <ThemeProvider theme={base}>
                    <NotifyLi />
                </ThemeProvider>)
            .toJSON()
        expect(wrapper).toMatchSnapshot()
        expect(wrapper).toHaveStyleRule("border-bottom", `1px solid ${themeColor}`)
        expect(wrapper).toHaveStyleRule("padding", "12px 0px 7px 0px")
        expect(wrapper).toHaveStyleRule("min-height", "56px")
    })
})
