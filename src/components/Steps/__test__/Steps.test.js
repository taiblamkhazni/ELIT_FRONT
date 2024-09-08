/**
 * @file Steps.test.js
 * @brief Contient les tests unitaires pour le composant CustomSteps.
 */
/**
 * @brief Importation du react-test-renderer.
 */
import renderer from "react-test-renderer";
/**
 * @brief Importation du styled-components.
 */
import { ThemeProvider } from "styled-components";
import { base } from "theme/base";

import CustomSteps from "../Steps";
/**
 * @brief Désactive temporairement les erreurs console avant d'exécuter les tests.
 */
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

/**
 * @brief Restaure les erreurs console après l'exécution des tests.
 */
afterAll(() => {
  console.error.mockRestore();
});

/**
 * @brief Importation du jest-styled-components.
 */
import { render } from "@testing-library/react";

import "jest-styled-components";
/**
 * @brief Teste le composant CustomSteps.
 *
 * Ce test vérifie le rendu du composant.
 */
describe("CustomSteps component", () => {
  const stepsMock = [
    { title: "Step 1", position: 1 },
    { title: "Step 2", position: 2 },
    { title: "Step 3", position: 3 },
  ];

  /**
   * @brief Teste le composant CustomSteps avec des props par default.
   */
  it("renders correctly with default props", () => {
    const tree = renderer.create(
      <ThemeProvider theme={base}>
        <CustomSteps steps={stepsMock} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /**
  * @brief Teste le composant CustomSteps avec des props current et steps par default.
  */
  it("renders correctly with steps and current props", () => {
    const tree = renderer.create(
      <ThemeProvider theme={base}>
        <CustomSteps current={1} steps={stepsMock} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /**
   * @brief Teste le composant pour vérifier l'icon in progress.
   */
  it("renders InProgressStep icon for the current step", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={base}>
        <CustomSteps current={1} steps={stepsMock} />
      </ThemeProvider>
    );
    expect(getByTestId('in-progress-step')).toBeTruthy();
  });

  /**
  * @brief Teste le composant pour vérifier l'icon checked.
  */
  it("renders Checked icon for the completed steps", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={base}>
        <CustomSteps current={1} steps={stepsMock} />
      </ThemeProvider>
    );
    expect(getByTestId('checked-step')).toBeTruthy();
  });

  /**
  * @brief Teste le composant pour vérifier l'icon oval.
  */
  it("renders Oval icon for the future steps", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={base}>
        <CustomSteps current={1} steps={stepsMock} />
      </ThemeProvider>
    );
    expect(getByTestId('oval')).toBeTruthy();
  });
});

