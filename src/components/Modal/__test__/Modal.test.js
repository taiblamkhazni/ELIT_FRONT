/**
 * @file Modal.test.js
 * @brief Ce fichier contient des tests pour les composants CustomTextModalEdit,CustomTitleModal et CustomTitleModalEdit.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { CustomTextModalEdit, CustomTitleModal, CustomTitleModalEdit } from "../Modal";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/** 
 * @brief Test de l'échec du composant CustomTitleModal.
 * 
 */
test("CustomTitleModal component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <CustomTitleModal>CustomTitleModal</CustomTitleModal>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "600");
  expect(tree).toHaveStyleRule("font-size", "16px");
});

test("CustomTitleModalEdit component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <CustomTitleModalEdit>CustomTitleModalEdit</CustomTitleModalEdit>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "600");
  expect(tree).toHaveStyleRule("font-size", "16px");
});

test("CustomTextModalEdit component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <CustomTextModalEdit>CustomTextModalEdit</CustomTextModalEdit>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "700");
  expect(tree).toHaveStyleRule("font-style", "normal");
});

