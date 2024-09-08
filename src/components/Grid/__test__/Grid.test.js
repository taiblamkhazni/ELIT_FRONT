/**
 * @file Grid.test.js
 * @brief Contient les tests unitaires pour le composant StructureGrid.
 */
import React from "react";

/**
 * @brief Importation du @testing-library/react.
 */
import { render, screen } from "@testing-library/react";

import { StructureGrid } from "../Grid";

/**
 * @brief Importation du @testing-library/jest-dom.
 */
import "@testing-library/jest-dom";
/**
 * @brief Importation du jest-styled-components.
 */
import "jest-styled-components";
/**
 * @brief Teste le composant StructureGrid.
 *
 * Ce test vérifie le rendu du composant et son style.
 */
describe("StructureGrid Component", () => {
  it("renders the left and right children", () => {
    const leftChild = <div>Left Child</div>;
    const rightChild = <div>Right Child</div>;

    render(<StructureGrid leftChild={leftChild} rightChild={rightChild} />);

    expect(screen.getByText("Left Child")).toBeInTheDocument();
    expect(screen.getByText("Right Child")).toBeInTheDocument();
  });

  it("applies the margin correctly", () => {
    const margin = "16px";

    render(
      <StructureGrid
        leftChild={<div>Left Child</div>}
        rightChild={<div>Right Child</div>}
        margin={margin}
      />
    );

    const enhancedRow = screen.getByTestId("enhanced-row");
    expect(enhancedRow).toHaveStyle(`margin: ${margin}`);
  });

  it("applies props correctly", () => {
    const padding = "16px";

    render(
      <StructureGrid
        leftChild={<div>Left Child</div>}
        rightChild={<div>Right Child</div>}
        padding={padding}
        borderBottom="1px solid black"
        margin={false}
      />
    );

    const enhancedRow = screen.getByTestId("enhanced-row");
    expect(enhancedRow).toHaveStyle(`padding: ${padding}`);
  });
});
