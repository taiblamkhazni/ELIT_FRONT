/**
 * @file AnalysePrevisibiliteFeatures.test.js
 * @brief Contient les tests unitaires pour le composant AnalysePrevisibiliteFeatures.
 */
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant AnalysePrevisibiliteFeatures pour le tester
 */
import AnalysePrevisibilitePage from "../AnalysePrevisibilitePage";

/**
 * @brief Utilisation de Jest pour simuler le composant renderer de react-pdf.
 */
jest.mock("@react-pdf/renderer", () => ({
  Font: {
    register: jest.fn(),
  },
  StyleSheet: {
    create: jest.fn(),
  },
}));

jest.mock("../Steps");

/**
 * @brief Test of AnalysePrevisibiliteFeatures without iteration
 */
describe("i have no iteration", () => {
  it("should display this title", () => {
    render(
      <BrowserRouter>
        <AnalysePrevisibilitePage iteration2={false} />
      </BrowserRouter>
    );


    expect(screen.getByText('Etape 2 :')).toBeInTheDocument();
    expect(screen.getByText("Choix de la méthodologie")).toBeInTheDocument();
  });

  it("shouldn't display this title", () => {
    render(
      <BrowserRouter>
        <AnalysePrevisibilitePage iteration2={false} />
      </BrowserRouter>
    );

    expect(screen.getByText('Etape 2 :')).toBeInTheDocument();
    expect(screen.getByText("Choix de la méthodologie")).toBeInTheDocument();
  });
});

/**
 * @brief Test of AnalysePrevisibiliteFeatures with iteration
 */
describe("i have an iteration", () => {
  it("should display this title", () => {
    render(
      <BrowserRouter>
        <AnalysePrevisibilitePage iteration2={true} />
      </BrowserRouter>
    );

    expect(screen.getByText('BRAINSTORMING - Etape 2/2 :')).toBeInTheDocument();
    expect(screen.getByText("Choix de la méthodologie")).toBeInTheDocument();
  });

  it("shouldn't display this title", () => {
    render(
      <BrowserRouter>
        <AnalysePrevisibilitePage iteration2={true} />
      </BrowserRouter>
    );

    expect(screen.getByText('BRAINSTORMING - Etape 2/2 :')).toBeInTheDocument();
    expect(screen.getByText("Choix de la méthodologie")).toBeInTheDocument();
  });
});
