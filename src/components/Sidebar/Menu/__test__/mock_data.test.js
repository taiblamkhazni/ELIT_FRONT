/**
 * @file mock_data.test.js
 * @brief Ce fichier contient des tests pour le composant mock_data.
 */
import { projetData } from "../mock_data";

describe("mock projetData", () => {
  it("testing size", () => {
    expect(projetData).toHaveLength(3);
  });
});
