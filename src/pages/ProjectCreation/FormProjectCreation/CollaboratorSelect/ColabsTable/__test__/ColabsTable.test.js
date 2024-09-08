/**
 * @file ColabsTable.test.js
 * @brief Contient les tests unitaires pour le composant ColabsTable.
 */
/**
 * @brief Importation du useProjectCreationContext.
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
/**
 * @brief Importation du ThemeProvider.
 */
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant ColabsTable pour le tester
 */
import ColabsTable from "../ColabsTable";

jest.mock("components/AvatarCustomUrl/AvatarCustomUrl");
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");
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
 * @brief un test unitaire pour tester la possibilité de voir la liste des collaborateurs et pouvoir supprimer l'un d'entre eux, en fonction de son rôle.
 */
describe("I want to see the list of collaborators and be able to delete one of them, depending of my role", () => {
  let mockIsCDP = {
    check: false,
    user: {
      contributerId: 7,
    },
  };

  let colabs = [
    {
      firstName: "John",
      lastName: "Doe",
      job: "",
      role: "CDP",
      contributerId: 4,
    },
  ];

  let mockdeleteColabById;

  beforeEach(() => {
    mockdeleteColabById = jest.fn();

    useProjectCreationContext.mockReturnValue({
      deleteColabById: mockdeleteColabById,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially, it should display the collaborators list correctly to the user", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={4} />
      </ThemeProvider>
    );

    expect(
      screen.getByText("Liste de collaborateurs ", { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText("Fonction")).toBeInTheDocument();

    expect(screen.getByText("Droit d'accès")).toBeInTheDocument();

    expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
  });

  it("initially, it should display the content of each collaborator correctly to the user", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={4} />
      </ThemeProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Chef de projet (principal)")).toBeInTheDocument();

    expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();

    const trashIcon = screen.queryByAltText("trash icon");

    expect(trashIcon).not.toBeInTheDocument();
  });

  it("if the user is the CDP of the project, he should see the column deletion and his content for each collaborator", () => {
    mockIsCDP.check = true;

    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={12} />
      </ThemeProvider>
    );

    expect(screen.getByText("Chef de projet")).toBeInTheDocument();

    expect(screen.getByText("Supprimer")).toBeInTheDocument();

    const trashIcon = screen.getByAltText("trash icon");

    expect(trashIcon).toBeInTheDocument();

    fireEvent.click(trashIcon);

    expect(mockdeleteColabById).toHaveBeenCalledWith(4);
  });

  it("if the user isn't the CDP of the project, he shouldn't be able to delete collaborators", () => {
    colabs[0].role = "Observateur";

    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={4} />
      </ThemeProvider>
    );

    const trashIcon = screen.queryByAltText("trash icon");

    expect(trashIcon).not.toBeInTheDocument();
  });

  it("if the user is the chefId and the contributerId collaborator aswell, deletion icon shouldn't be displayed", () => {
    mockIsCDP.user.contributerId = 9;
    colabs[0].contributerId = 9;

    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={9} />
      </ThemeProvider>
    );

    const trashIcon = screen.queryByAltText("trash icon");

    expect(trashIcon).not.toBeInTheDocument();
  });

  it("if the user is the chefId but not the collaboratorId, deletion icon should be displayed", () => {
    mockIsCDP.user.contributerId = 9;
    colabs[0].contributerId = 10;

    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={9} />
      </ThemeProvider>
    );

    const trashIcon = screen.getByAltText("trash icon");

    expect(trashIcon).toBeInTheDocument();

    fireEvent.click(trashIcon);

    expect(mockdeleteColabById).toHaveBeenCalledWith(10);
  });

  it("if the collaborator has a job specified and a different role, it should be displayed to the user", () => {
    colabs[0].func = "Developpeur";
    colabs[0].role = "Contributeur";

    render(
      <ThemeProvider theme={themeMock}>
        <ColabsTable colabs={colabs} isCDP={mockIsCDP} chefId={4} />
      </ThemeProvider>
    );

    expect(screen.getByText(colabs[0].role)).toBeInTheDocument();
    expect(screen.getByText(colabs[0].func)).toBeInTheDocument();
  });
});
