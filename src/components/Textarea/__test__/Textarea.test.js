/**
 * @file Textarea.test.js
 * @brief Ce fichier contient des tests pour le composant Textarea.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { TextareaCustom } from "../Textarea";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/**
 * Test de l'échec du composant Textarea.
 *
 */
test("Text component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TextareaCustom>Affichage d'un texte</TextareaCustom>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("padding", "0.5rem");
  expect(tree).toHaveStyleRule("border-radius", "4px");
  expect(tree).toHaveStyleRule("border", "1px solid #E9E9E9");
});
