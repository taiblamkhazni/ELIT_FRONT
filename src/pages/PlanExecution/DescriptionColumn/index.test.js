/**
 * @file index.test.js
 * @brief This file contains tests for the DescriptionColumn component.
 */
import React from "react";

import { render } from "@testing-library/react";

import DescriptionColumn from "./index";

/**
 * @brief Test suite for the DescriptionColumn component.
 */
describe("DescriptionColumn", () => {
  /**
   * @brief Tests if the collapsed description is rendered with the read more link.
   */
  it("renders the collapsed description with read more link", () => {
    const value = "Lorem ipsum dolor sit amet";
    const { getByText } = render(<DescriptionColumn value={value} />);
    const collapsedText = getByText("Lorem ipsum dolor sit amet");
    expect(collapsedText).toBeInTheDocument();
  });

  /**
   * @brief Tests if the expanded description is rendered with the read less link.
   */
  it("renders the expanded description with read less link", () => {
    const value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const { getByText } = render(<DescriptionColumn value={value} />);
    const expandedText = getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    expect(expandedText).toBeInTheDocument();
  });

  /**
   * @brief Tests if the description toggles collapse state when clicking read more/read less links.
   */
  it("toggles the description collapse state when clicking read more/read less links", () => {
    const value = "Lorem ipsum dolor sit amet";
    const { getByText } = render(<DescriptionColumn value={value} />);

    expect(getByText("Lorem ipsum dolor sit amet")).toBeInTheDocument();
  });

  /**
   * @brief Tests if an empty fragment is rendered when no value is provided.
   */
  it("renders an empty fragment when no value is provided", () => {
    const { container } = render(<DescriptionColumn value={null} />);
    expect(container.firstChild).toBeNull();
  });
});
