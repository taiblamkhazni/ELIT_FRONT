/**
 * @file ELIT.test.js
 * @brief Ce fichier contient des tests pour le composant ELIT.
 */
import { render, screen } from "@testing-library/react";

import ELIT from "./ELIT";

describe("ELIT Component", () => {
  it("renders the ELIT", () => {
    render(<ELIT alt='elit-logo' />);

    const elitLogo = screen.getByAltText("elit-logo");

    expect(elitLogo).toBeInTheDocument();
  });
});
