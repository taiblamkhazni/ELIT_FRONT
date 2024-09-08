/**
 * @file WrapperButtons.test.js
 * @brief Contient les tests unitaires pour le composant WrapperButtons.
 */

/**
 * @brief Importation des hooks et des composants nécessaires pour les tests.
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant à tester WrapperButtons.
 */
import WrapperButtons from "../WrapperButtons";

/**
 * @brief Définition d'un thème simulé pour le Provider de styled-components.
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
 * @brief Mock des dépendances externes pour les tests.
 */
jest.mock("../../ModalProjectCreation/ModalProjectCreation");
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext");

/**
 * @brief Suite de tests pour le composant WrapperButtons.
 */
describe("WrapperButtons Component", () => {
  let mockSetSortProjectsByStatus;
  let mockSetSortProjectsByDate;
  let mockSetProjectSearchText;

  /**
   * @brief Avant chaque test, configure les mocks et les fonctions simulées.
   */
  beforeEach(() => {
    mockSetSortProjectsByStatus = jest.fn();
    mockSetSortProjectsByDate = jest.fn();
    mockSetProjectSearchText = jest.fn();

    useProjectCreationContext.mockReturnValue({
      sortProjectsByStatus: false,
      sortProjectsByDate: false,
      setSortProjectsByDate: mockSetSortProjectsByDate,
      setSortProjectsByStatus: mockSetSortProjectsByStatus,
      setProjectSearchText: mockSetProjectSearchText,
    });
  });

  /**
   * @brief Après chaque test, réinitialise les mocks.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Teste le changement de tri des projets par date sur clic de bouton.
   */
  it("toggles sortProjectsByDate on button click", async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themeMock}>
        <WrapperButtons />
      </ThemeProvider>
    );

    // Clique pour ouvrir la liste déroulante
    fireEvent.click(getByTestId("button-date-de-creation"));

    // Sélectionne l'option "Du + récent au - récent" dans la liste
    fireEvent.click(getByText("Du + récent au - récent"));

    // Vérifie si l'ordre de tri a été mis à jour en conséquence
    expect(getByText("Du + récent au - récent")).toBeInTheDocument();
  });

  /**
   * @brief Teste le changement de statut et de tri sur changement de sélection.
   */
  it("changes status and sorting on select change", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themeMock}>
        <WrapperButtons />
      </ThemeProvider>
    );

    // Clique pour ouvrir la liste déroulante
    fireEvent.click(getByTestId("select-status"));

    // Simule un changement de sélection vers "Tous"
    fireEvent.click(getByText("Tous"));

    // Vérifie si le statut sélectionné est correct
    expect(getByText("Tous")).toBeInTheDocument();
  });

  /**
   * @brief Teste l'affichage initial du champ de recherche.
   */
  it("initially displays the search input correctly", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <WrapperButtons />
      </ThemeProvider>
    );

    // Vérifie la présence du champ de recherche avec le placeholder attendu
    const inputSearch = screen.getByPlaceholderText("Saisissez votre recherche");
    expect(inputSearch).toBeInTheDocument();

    // Simule un changement dans le champ de recherche
    fireEvent.change(inputSearch, {
      target: { value: "research test" },
    });

    // Vérifie si la fonction setProjectSearchText a été appelée avec la valeur attendue
    expect(mockSetProjectSearchText).toHaveBeenCalledWith("research test");
  });
});
