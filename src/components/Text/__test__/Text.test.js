/**
 * @file Text.test.js
 * @brief Ce fichier contient des tests pour les composants SmallText, SmallTextHyperLink, SubText, Text, TextBold et TextLight.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { SmallText, SmallTextHyperLink, SubText, Text, TextBold, TextLight } from '../Text';

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";
/**
 * @brief Test de l'échec du composant Text.
 */
test("Text component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <Text>Affichage d'un texte</Text>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "1rem");
});

test("SmallText component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <SmallText>Affichage d'un texte</SmallText>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "12px");
});

test("SmallTextHyperLink component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <SmallTextHyperLink>Affichage d'un texte</SmallTextHyperLink>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "12px");
});

test("TextBold component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TextBold color="#248BC0">Affichage d'un texte</TextBold>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "700");
  expect(tree).toHaveStyleRule("font-size", "16px");
  expect(tree).toHaveStyleRule("color", "#248BC0");
});

test("TextLight component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TextLight color="#248BC0">Affichage d'un texte</TextLight>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "16px");
  expect(tree).toHaveStyleRule("color", "#248BC0");
});

test("SubText component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <SubText color="#248BC0">Affichage d'un texte</SubText>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "14px");
  expect(tree).toHaveStyleRule("color", "#248BC0");
});
