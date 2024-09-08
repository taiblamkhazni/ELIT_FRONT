/**
 * @file TabContainer.test.js
 * @brief Ce fichier contient des tests pour les composant  TabContainer.
 */
import renderer from "react-test-renderer";
import { base } from "theme/base";

import { render } from '@testing-library/react'

import { TabContainer } from "../TabContainer";

import "jest-styled-components"

test("Tab tests props active", () => {

    const tree = renderer.create(<TabContainer theme={base} />).toJSON();

    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("display", "flex")
    // expect(tree).toHaveStyleRule("background-color", "#CCCCCC")
})

test('with props', () => {
    const { container } = render(<TabContainer theme={base} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toHaveStyleRule("display", "flex")
    // expect(tree).toHaveStyleRule("background-color", "#CCCCCC")
})