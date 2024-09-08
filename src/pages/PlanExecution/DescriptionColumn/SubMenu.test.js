/**
 * @file SubMenu.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import React from "react";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import { themeMock } from "../__test__/dataMock";

import SubMenu from "./SubMenu";

describe("render SubMenu", () => {
  it("renders the collapsed description with read more link", () => {
    console.error = jest.fn()
    const data = {
      methodologyName: "Classique",
      id: 1,
      methodName: "Cascade",
      methodDescription: "description",
      disadvantages: "disadvantages",
      advantages: "advantages",
      votes: []
    }
    render(
      <ThemeProvider theme={themeMock}>
        <SubMenu data={data} />
      </ThemeProvider>
    );
    expect(screen.getByText("Quand l'utiliser ?")).toBeInTheDocument()
    expect(screen.getByText("Quand l'éviter ?")).toBeInTheDocument()
    expect(screen.getByText('advantages')).toBeInTheDocument()
    expect(screen.getByText('disadvantages')).toBeInTheDocument()
  });
});
