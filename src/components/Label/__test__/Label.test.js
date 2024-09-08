/**
 * @file Label.test.js
 * @brief Ce fichier contient des tests pour le composant Label.
 */
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import { base } from "theme/base.js"

import { LabelCustom } from "../Label"

import "jest-styled-components"
describe("<LabelCustom />", () => {
    test("LabelCustom has the correct styles", () => {
        const wrapper = renderer
            .create(<ThemeProvider theme={base}>
                <LabelCustom />
            </ThemeProvider>).toJSON()
        expect(wrapper).toHaveStyleRule("display", "flex")

        expect(wrapper).toHaveStyleRule("font-style", "normal")
        expect(wrapper).toHaveStyleRule("font-weight", "700")

    })
})
