/** 
 * @file Wrappers.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant Wrappers.
 */
import renderer from "react-test-renderer";
/** 
 * @external styled-components
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { AlertInfoWrapper, AvatarWrapper, FooterWrapper, HeaderWrapper } from "../Wrappers";

/** 
 * @external jest-styled-components
 */
import "jest-styled-components";
/**
 * Test du composant HeaderWrapper
 * Nous vérifions qu'il a bien les styles attendus.
 */
test("HeaderWrapper component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <HeaderWrapper>HeaderWrapper</HeaderWrapper>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("height", "4rem");
  expect(tree).toHaveStyleRule("display", "flex");
  expect(tree).toHaveStyleRule("border-radius", "4px 4px 0px 0px");
});

test("AvatarWrapper component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <AvatarWrapper>AvatarWrapper</AvatarWrapper>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("height", "2rem");
  expect(tree).toHaveStyleRule("width", "2rem");
  expect(tree).toHaveStyleRule("border-radius", "50%");
});

test("FooterWrapper component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <FooterWrapper>FooterWrapper</FooterWrapper>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("margin", "1.5rem");
  expect(tree).toHaveStyleRule("display", "flex");
  expect(tree).toHaveStyleRule("gap", "0.5rem");
  expect(tree).toHaveStyleRule("justify-content", "space-between");
  expect(tree).toHaveStyleRule("align-items", "center");
});

test("AlertInfoWrapper component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <AlertInfoWrapper>AlertInfoWrapper</AlertInfoWrapper>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("flex-direction", "row");
  expect(tree).toHaveStyleRule("display", "flex");
  expect(tree).toHaveStyleRule("gap", "0.5rem");
  expect(tree).toHaveStyleRule("align-items", "center");
});
