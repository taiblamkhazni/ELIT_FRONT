/**
 * @file Table.test.js
 * @brief Ce fichier contient des tests pour le composant Table.
 */
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { TableWrapper } from "../Table";

import "jest-styled-components";

test("TableWrapper component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TableWrapper>TableWrapper</TableWrapper>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("padding", "16px 14px");
  expect(tree).toHaveStyleRule("text-align", "center");
  expect(tree).toHaveStyleRule("margin-top", "24px");
  expect(tree).toHaveStyleRule("background", "white");
  expect(tree).toHaveStyleRule("box-shadow", "0px 2px 5px 0px rgb(0 0 0 / 10%)");
  expect(tree).toHaveStyleRule("border-radius", "4px");
});
