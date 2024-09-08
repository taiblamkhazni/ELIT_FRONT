/**
 * @file ProtectedRoutesProjects.test.js
 * @brief This file contains tests ensuring that the ProtectedRoutesProjects component behaves correctly when provided with different states and parameters. This includes dispatching actions correctly, reacting to different Redux states, and rendering appropriate components based on those states.
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getProjectFetch } from "reducers/project/projectReducer";
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react";

import ProtectedRoutesProjects from "../ProtectedRoutesProjects";

/** @brief Mocks for Redux and React Router hooks, and the projectReducer actions. */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: jest.fn(() => null),
  useParams: jest.fn(),
}));

jest.mock("reducers/project/projectReducer", () => ({
  getProjectFetch: jest.fn(),
}));

/**
 * @brief Mock pour le thème.
 */
const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
      blue: "#someColor",
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red",
    },
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};

/**
 * @brief Test suite for the ProtectedRoutesProjects component.
 */
describe("ProtectedRoutesProjects", () => {
  const mockProjectId = "123";
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockImplementation(() => dispatchMock);
    useParams.mockReturnValue({ projectId: mockProjectId });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Test to check if it dispatches getProjectFetch action with the correct projectId
   */
  it("dispatches getProjectFetch action with the correct projectId", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <ProtectedRoutesProjects />
      </ThemeProvider>
    );

    expect(getProjectFetch).toHaveBeenCalledWith(mockProjectId);
  });

  /**
   * @brief Test to check if it renders the Spinner when isLoading is true
   */
  it("renders the Spinner when isLoading is true", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("isLoading")) return true;
      return {};
    });

    const { container } = render(
      <ThemeProvider theme={themeMock}>
        <ProtectedRoutesProjects />
      </ThemeProvider>
    );

    const spinner = container.querySelector('[aria-busy="true"]');
    expect(spinner).toBeInTheDocument();
  });

  /**
   * @brief Test to check if it renders the Outlet when project is CONFIRMED
   */
  it("renders the Outlet when project is CONFIRMED", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("projectReducer.project"))
        return { confirmationState: "CONFIRMED" };
    });

    render(
      <ThemeProvider theme={themeMock}>
        <ProtectedRoutesProjects />
      </ThemeProvider>
    );

    expect(Outlet).toHaveBeenCalled();
  });

  /**
   * @brief Test to check if it renders the 'n'est pas encore validé pas l'administrateur.' message when project is NOT CONFIRMED
   */
  it("renders the 'n'est pas encore validé pas l'administrateur.' message when project is NOT CONFIRMED", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("projectReducer.project"))
        return { name: "Projet1", confirmationState: "NOT_CONFIRMED" };
    });

    const { getByText } = render(
      <ThemeProvider theme={themeMock}>
        <ProtectedRoutesProjects />
      </ThemeProvider>
    );

    expect(getByText("Projet1")).toBeInTheDocument();
  });

  /**
   * @brief Test to check if it renders 'Ce projet n'existe pas.' when projectData is null and isLoading is false
   */
  it("renders 'Ce projet n'existe pas.' when projectData is null and isLoading is false", () => {
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes("projectReducer.project")) return null;
    });

    const { container } = render(
      <ThemeProvider theme={themeMock}>
        <ProtectedRoutesProjects />
      </ThemeProvider>
    );

    const textElement = container.querySelector("strong");
    expect(textElement.textContent).toBe("Ce projet n'existe pas.");
  });
});
