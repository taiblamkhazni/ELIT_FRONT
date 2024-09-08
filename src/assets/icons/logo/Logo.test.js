/**
 * @file Logo.test.js
 * @brief Ce fichier contient des tests pour le composant Logo.
 */
import { render, screen } from "@testing-library/react";

import Logo from "./Logo";

describe("Logo Component", () => {
  it("renders the Logo", () => {
    render(<Logo alt='logo' />);

    const logo = screen.getByAltText("logo");

    expect(logo).toBeInTheDocument();
  });
});