/**
 * @file Link.test.js
 * @brief Ce fichier contient des tests pour les composant  BlockButton, ButtonNoBackground, LinkButton et NextStepButton.
 */
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { StyledLink } from "../Link"

import "jest-styled-components"

test("StyledLink tests props active", () => {

  const tree = renderer.create(
    <MemoryRouter>
      <StyledLink />
    </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule("text-decoration", "none")
  expect(tree).toHaveStyleRule("color", "#116E9C")
})

/*test('with props', () => {
    const { container } = render(
      <MemoryRouter>
        <StyledLink color="red" />
      </MemoryRouter>)
    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toHaveStyleRule("text-decoration", "none")
    expect(container.firstChild).toHaveStyleRule("color", "red")
})*/
