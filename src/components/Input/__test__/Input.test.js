/**
 * @file Input.test.js
 * @brief Ce fichier contient des tests pour le composant InputCustom.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { InputCustom } from "../Input";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/** 
 * @brief Test de l'échec du composant InputCustom.
 */
test("InputCustom component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base} hasError={true}>
        <InputCustom>InputCustom</InputCustom>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("width", "100%");
  expect(tree).toHaveStyleRule("line-height", "1em");
  expect(tree).toHaveStyleRule("height", "2.5rem");

});

test("InputCustom component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <InputCustom>InputCustom</InputCustom>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("width", "100%");
  expect(tree).toHaveStyleRule("line-height", "1em");
  expect(tree).toHaveStyleRule("height", "2.5rem");

});
