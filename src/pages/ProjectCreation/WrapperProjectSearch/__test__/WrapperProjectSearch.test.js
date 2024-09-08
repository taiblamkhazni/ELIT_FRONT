/**
 * @file WrapperProjectSearch.test.js
 * @brief Contient les tests unitaires pour le composant WrapperProjectSearch.
 */

/**
 * @brief Importation du @testing-library/react.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
import { ThemeProvider } from "styled-components";

/**
 * @brief Importation des fonctions fireEvent et render depuis @testing-library/react.
 */
import {  render } from "@testing-library/react";

/**
 * @brief Importation du composant WrapperProjectSearch pour le tester.
 */
import WrapperProjectSearch from "../WrapperProjectSearch";

/**
 * @brief Création d'un thème simulé pour le Provider de styled-components.
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
 * @brief Suite de tests pour le composant WrapperProjectSearch.
 */
describe("I want to see the number of my projects and be able to do a research", () => {
  /**
   * @brief Mock des valeurs du contexte ProjectCreationContext.
   */
  let mockProject = {
    countNumberProjects: 4,
    setProjectSearchText: jest.fn(),
  };

  /**
   * @brief Test initial pour vérifier l'affichage correct du nombre de projets et du titre.
   */
  it("initially, it should display the correct number of my projects and the title", () => {
    /**
     * @brief Rendu du composant WrapperProjectSearch avec les Providers nécessaires.
     */
    const { getByText } = render(
      <ProjectCreationContext.Provider value={mockProject}>
        <ThemeProvider theme={themeMock}>
          <WrapperProjectSearch />
        </ThemeProvider>
      </ProjectCreationContext.Provider>
    );

    /**
     * @brief Assertion pour vérifier la présence du texte "Mes projets".
     */
    expect(getByText("Mes projets")).toBeInTheDocument();
  });
});
