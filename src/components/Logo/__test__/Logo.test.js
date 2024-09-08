/**
 * @file Logo.test.js
 * @brief Ce fichier contient des tests pour le composant Logo.
 */
import { render, screen } from "@testing-library/react";

import LogoComponent from "../Logo";

describe("Logo Component", () => {
  it("renders the Logo and ELIT components", () => {
    render(<LogoComponent />);

    const logo = screen.getByTestId("logo");

    expect(logo).toBeInTheDocument();
  });
});
