/**
 * @file CustomPasswordTooltip.test.js
 * @brief This file contains tests for the CustomPasswordTooltip component.
 */
import { fireEvent, render, waitFor } from "@testing-library/react";

import CustomPasswordTooltip from "../CustomPasswordTooltip";

console.error = jest.fn()

describe("CustomPasswordTooltip Component", () => {
  /**
   * @brief Test to check if info icon is displayed correctly in the document
   *
   */
  it("should render the tooltip icon", () => {
    const { getByTestId } = render(<CustomPasswordTooltip />);
    const icon = getByTestId('info-icon');

    expect(icon).toBeInTheDocument();
  });

  /**
   * @brief Test to check if each informations are displayed correctly in the document
   *
   */
  it("should render tooltip with correct content", async () => {
    const { getByTestId, getByText } = render(<CustomPasswordTooltip />);

    const icon = getByTestId('info-icon');
    fireEvent.mouseEnter(icon)
    const specialChars = "(~!@#$%^&*()_+`-=[];':\",./?)";
    await waitFor(() => {
      expect(getByText("12 caractères au minimum")).toBeInTheDocument();
      expect(getByText("Au moins une majuscule (A-Z)")).toBeInTheDocument();
      expect(getByText("Au moins une minuscule (a-z)")).toBeInTheDocument();
      expect(getByText("Pas d'espace")).toBeInTheDocument();
      expect(getByText("Au moins un chiffre (0-9)")).toBeInTheDocument();
      expect(getByText("Au moins un caractère spécial")).toBeInTheDocument();
      expect(getByText(specialChars)).toBeInTheDocument();
    })
  });
});
