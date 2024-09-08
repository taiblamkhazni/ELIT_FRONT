/**
 * @file Title.test.js
 * @brief Ce fichier contient des tests pour les composants AuthentificationSubtitle, AuthentificationTitle, HeaderTitle, TitleSection et TitleStep.
 */
import renderer from "react-test-renderer";
/**
 * @brief Import de styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { render, screen } from "@testing-library/react";

import { AuthentificationSubtitle, AuthentificationTitle, HeaderTitle, TitleSection, TitleStep } from "../Title";

/**
 * @brief Import de jest-styled-components.
 */
import "jest-styled-components";

/**
 * @brief Test de l'échec du composant HeaderTitle.
 */
test("HeaderTitle component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <HeaderTitle>Affichage d'un titre</HeaderTitle>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "12px");
});

/**
 * @brief Test de l'échec du composant TitleSection.
 */
test("TitleSection component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TitleSection>title</TitleSection>
      </ThemeProvider>
    ).toJSON();
  render(
    <ThemeProvider theme={base}>
      <TitleSection>title</TitleSection>
    </ThemeProvider>
  );
  expect(screen.getByText('title')).toBeInTheDocument();
  expect(tree).toHaveStyleRule("font-weight", "700");
  expect(tree).toHaveStyleRule("line-height", "24px");
  expect(tree).toHaveStyleRule("color", "#116E9C");
});

/**
 * @brief Test de l'échec du composant TitleStep.
 */
test("TitleStep component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <TitleStep>Affichage d'un titre</TitleStep>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "700");
  expect(tree).toHaveStyleRule("line-height", "40px");
  expect(tree).toHaveStyleRule("color", "#116E9C");
});

/**
 * @brief Test de l'échec du composant AuthentificationTitle.
 */
test("AuthentificationTitle component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <AuthentificationTitle color="#248BC0">Affichage d'un texte</AuthentificationTitle>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "700");
  expect(tree).toHaveStyleRule("font-size", "32px");
  expect(tree).toHaveStyleRule("line-height", "54px");
  expect(tree).toHaveStyleRule("color", "#1F1A28");
});

/**
 * @brief Test de l'échec du composant AuthentificationSubtitle.
 */
test("AuthentificationSubtitle component failed", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={base}>
        <AuthentificationSubtitle color="#248BC0">Affichage d'un titre</AuthentificationSubtitle>
      </ThemeProvider>
    ).toJSON();
  expect(tree).toHaveStyleRule("font-weight", "400");
  expect(tree).toHaveStyleRule("font-size", "20px");
  expect(tree).toHaveStyleRule("line-height", "32px");
  expect(tree).toHaveStyleRule("color", "#1F1A28");
});
