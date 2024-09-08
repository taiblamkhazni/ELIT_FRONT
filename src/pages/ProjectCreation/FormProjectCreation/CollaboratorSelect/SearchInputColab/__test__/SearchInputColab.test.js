/**
 * @file SearchInputColab.test.js
 * @brief Contient les tests unitaires pour le composant CollaboratorSelect.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
import { ThemeProvider } from "styled-components";

import { fireEvent, render } from "@testing-library/react";

import SearchInputColab from "../SearchInputColab";

import "@testing-library/jest-dom";

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

jest.mock("hooks/apis/UserApi", () => ({
  getUsersByKeywordApi: jest.fn(() => Promise.resolve(mockInfos)),
}));

let mockInfos = [
  {
    userFirstName: "John",
    userLastName: "Doe",
    userEmail: "envkt@example.com",
    userId: 4,
    userHasAvatar: false,
  },
];
let mockContext = {
  colabList: [],
  handleSelectColab: jest.fn(),
  handleDeselectedColab: jest.fn(),
  user: { id: "user-id" },
  getUsersByKeywordApi: jest.fn(() => Promise.resolve(mockInfos)),
};


describe("I want to be able to search a collaborator", () => {
  it("initially, it should render the component to the user", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <ProjectCreationContext.Provider value={mockContext}>
          <SearchInputColab placeHolderText="Chercher..." listSelected={[]} />
        </ProjectCreationContext.Provider>
      </ThemeProvider>
    );
  });

  it("initially, it should render the component to the user", () => {
    const { getByRole } = render(
      <ThemeProvider theme={themeMock}>
        <ProjectCreationContext.Provider value={mockContext}>
          <SearchInputColab placeHolderText="Chercher..." listSelected={[]} />
        </ProjectCreationContext.Provider>
      </ThemeProvider>
    );
    const inputSearch = getByRole("combobox");

    expect(inputSearch).toBeInTheDocument();
  });

  it("initially, it should render the component to the user", async () => {
    const { getByText, getByRole } = render(
      <ThemeProvider theme={themeMock}>
        <ProjectCreationContext.Provider value={mockContext}>
          <SearchInputColab
            placeHolderText="Chercher..."
            listSelected={mockInfos}
          />
        </ProjectCreationContext.Provider>
      </ThemeProvider>
    );

    const inputSearch = getByRole("combobox");

    fireEvent.click(inputSearch);

    fireEvent.change(inputSearch, { target: { value: "John" } });

    expect(inputSearch).toHaveValue("John");

    fireEvent.click(inputSearch, { target: { value: 4 } });

    expect(getByText("John", { exact: false })).toBeInTheDocument();
  });
});
