/**
 * @file Tab.test.js
 * @brief Ce fichier contient des tests pour les composant Tab.
 */
import renderer from "react-test-renderer";

import { render } from '@testing-library/react'

import { Tab } from "../Tab";

import "jest-styled-components"

test("Tab tests props active", () => {

    const tree = renderer.create(<Tab />).toJSON();

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("border-bottom", "2px solid transparent")
    expect(tree).toHaveStyleRule("color", "#6a6a6a")
})

test('with props', () => {
    const { container } = render(<Tab $isactive={true} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toHaveStyleRule("border-bottom", "2px solid #116E9C")
    expect(container.firstChild).toHaveStyleRule("color", "#116E9C")
})