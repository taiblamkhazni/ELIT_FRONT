/**
 * @file AnalysisStatusComponent.test.js
 * @brief Ce fichier contient des tests pour le composant AnalysisStatusComponent.
 */
import { render, screen } from "@testing-library/react";

import AnalysisStatusComponent from "../AnalysisStatusComponent";

describe("AnalysisStatusComponent", () => {
  it.each([
    { status: "NOT_STARTED", content: "Analysis ia" },
    { status: "IN_PROGRESS", content: "Analyse collaborative en cours" },
    { status: "DONE", content: "Analyse collaborative en cours" },
  ])(".add($status,$content)", ({ status, content }) => {
    render(<AnalysisStatusComponent multiCriteriaStatus={status} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});