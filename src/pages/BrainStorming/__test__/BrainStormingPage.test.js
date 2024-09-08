/**
 * @file BrainStormingPage.test.js
 * @brief This file contains tests for the BrainStormingPage component,
 * ensuring that it correctly renders the BrainStorming component.
 */
import React from "react";

import { render, screen } from "@testing-library/react";

import BrainStormingPage from "../BrainStormingPage";

import "@testing-library/jest-dom/extend-expect";

jest.mock("pages/AnalysePrevisibilite/BrainStorming/BrainStorming", () => {
    return function MockedAnalysePrevisibiliteFeatures() {
        return <div data-testid="mockedBrainStorming">Mocked BrainStorming</div>;
    };
});

/**
 * @brief Test suite for the BrainStormingPage component.
 */
describe("BrainStormingPage", () => {
    /**
     * @brief Test to check if it renders BrainStorming component
     *
     */
    it("renders BrainStorming", () => {
        render(<BrainStormingPage />);
        expect(screen.getByTestId("mockedBrainStorming")).toBeInTheDocument();
    });
});
