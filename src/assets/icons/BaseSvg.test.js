/**
 * @brief Import de ThemeProvider.
 */ 
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import { render, screen } from "@testing-library/react";

import { BaseSvg } from "./BaseSvg";

/** 
 * Test de l'échec du composant BaseSvg.
 * 
 * Ce test vérifie que lors de l'affichage du composant BaseSvg avec une balise SVG vide,
 * le composant est rendu avec une largeur et une hauteur de "1em" par défaut.
 * 
*/
test("BaseSvg component failed", () => {
  render(
    <ThemeProvider theme={base}>
      <BaseSvg svg="<svg></svg>" />
    </ThemeProvider>
  );

  const img = screen.getByRole("img");
  expect(img.style.width).toBe("1em");
  expect(img.style.height).toBe("1em");
});
