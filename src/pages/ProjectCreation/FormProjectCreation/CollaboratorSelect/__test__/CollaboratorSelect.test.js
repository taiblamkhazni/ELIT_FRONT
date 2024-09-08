/**
 * @file CollaboratorSelect.test.js
 * @brief Contient les tests unitaires pour le composant CollaboratorSelect.
 */

/**
 * @brief Importation du @testing-library/react.
 */
import { ThemeProvider } from "styled-components";

import { fireEvent,render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant CollaboratorSelect pour le tester
 */
import CollaboratorSelect from "../CollaboratorSelect";
/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
 */
const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
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
 * @brief Utilisation de Jest pour simuler le composant ColabsTable.
 */
jest.mock("../ColabsTable/ColabsTable", () => {
  return ({ invitedColabs }) => <table>{invitedColabs}</table>;
});

jest.mock("../SearchInputColab/SearchInputColab", () => {
  return ({ placeHolderText }) => (
    <input placeholder={placeHolderText} role="search-input" />
  );
});

describe("I want to see the collaborator select component", () => {
  const handleInviterColabsMock = jest.fn();

  let baseProps = {
    listSelected: [],
    role: "",
    func: "",
    handleInviterColabs: handleInviterColabsMock,
    colabList: [],
    invitedColabs: [],
    isCDP: { check: false },
    chefId: "",
    modeCreation: true,
  };

  it("initially, it should renders to the user without crashing", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );
  });

  it("should does not render title and sections when isCDP.check is false", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    expect(
      screen.queryByText(
        /Ajouter un collaborateur/
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText(/Adresse mail, nom, prénom ou fonction/)
    ).not.toBeInTheDocument();
  });

  it("should renders title and sections when isCDP.check is true", () => {
    baseProps.isCDP.check = true;

    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    expect(
      screen.getByText(
        /Ajouter un collaborateur/
      )
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Adresse mail, nom, prénom ou fonction/)
    ).toBeInTheDocument();
  });

  it("should renders invite button disabled when no role or listSelected is empty", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Ajouter')).toHaveStyle("cursor: not-allowed");
  });

  it("should renders invite button enabled when role is set and listSelected is not empty", () => {
    baseProps.role = "Role";
    baseProps.listSelected = ["Selected"];

    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Ajouter')).not.toHaveStyle("cursor: not-allowed");
  });

  it("should calls handleInviterColabs function on invite button click when enabled", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Ajouter'));

    expect(handleInviterColabsMock).toHaveBeenCalled();
  });

  it("should renders ColabsTable when invitedColabs is not empty", () => {
    baseProps.invitedColabs = ["Colab"];

    render(
      <ThemeProvider theme={themeMock}>
        <CollaboratorSelect {...baseProps} />
      </ThemeProvider>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
