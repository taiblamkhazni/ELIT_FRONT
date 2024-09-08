/**
 * @file ModalAnalyse.test.js
 * @brief Contient les tests unitaires pour le composant ModalAnalyse.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
import { setCurrent } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant ModalAnalyse pour le tester.
 */
import ModalAnalyse from "../ModalAnalyse";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
  previsibilityAnalysisReducer: {
    current: 0,
  },
};
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
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};
/**
 * @brief Création d'une variable simulé pour le dispatche.
 */
let dispatchMock;

describe("i start the predictability analysis", () => {
  beforeEach(() => {
    dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <ModalAnalyse />
        </ThemeProvider>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially, it should display the analysis start button and the modal shouldn't be visible", () => {
    const buttonStart = screen.getByRole("button", {
      name: "Lancer l'analyse",
    });

    const modalDisplay = screen.queryByRole("dialog", {
      name: "Choix de la méthodologie",
    });

    expect(buttonStart).toBeInTheDocument();
    expect(modalDisplay).not.toBeInTheDocument();
  });

  it("should display the modal when the user clicks on the start button", () => {
    const buttonStart = screen.getByRole("button", {
      name: "Lancer l'analyse",
    });

    fireEvent.click(buttonStart);

    const modalDisplay = screen.getByRole("dialog", {
      name: "Choix de la méthodologie",
    });

    expect(modalDisplay).toBeInTheDocument();
  });

  it("should go to the next step when the user clicks on the confirm button", () => {
    const buttonStart = screen.getByRole("button", {
      name: "Lancer l'analyse",
    });

    fireEvent.click(buttonStart);

    const buttonValidate = screen.getByRole("button", {
      name: "Oui, lancer l'analyse",
    });

    fireEvent.click(buttonValidate);

    const modalDisplay = screen.queryByRole("dialog", {
      name: "Choix de la méthodologie",
    });

    expect(modalDisplay).not.toBeInTheDocument();

    expect(dispatchMock).toHaveBeenCalledWith(
      setCurrent(initialState.previsibilityAnalysisReducer.current + 1)
    );
  });

  it("should hide the modal when the user clicks on cancel button", () => {
    const buttonStart = screen.getByRole("button", {
      name: "Lancer l'analyse",
    });

    fireEvent.click(buttonStart);

    const buttonCancel = screen.getByRole("button", {
      name: "Non, attendre",
    });

    fireEvent.click(buttonCancel);

    const modalDisplay = screen.queryByRole("dialog", {
      name: "Choix de la méthodologie",
    });

    expect(modalDisplay).not.toBeInTheDocument();

    expect(dispatchMock).not.toHaveBeenCalledWith(
      setCurrent(initialState.previsibilityAnalysisReducer.current + 1)
    );
  });
});
