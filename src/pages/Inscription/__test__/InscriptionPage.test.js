/**
 * @file Inscription.test.js
 * @brief Contient les tests unitaires pour le composant Inscription.
 */
import { createContext, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ERROR_MESSAGES } from "../../../validation/regexPatterns";
import Inscription from "../InscriptionPage";
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
console.error = jest.fn();
/**
 * @brief Configuration du magasin Redux simulé.
 */
const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
  authentificationReducer: {
    user: {
      firstname: "John",
      lastname: "Doe",
    },
  },
  userReducer: {
    userInfo: {},
    avatarUrl: "https://exaplme.com"
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
 * @brief Création d'une variable simulé pour le dispatche.
 */
let dispatchMock;

describe("testing the inscription component", () => {
  beforeEach(() => {
    dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    const InscriptionContext = createContext({});

    const setPasswordHidden = jest.fn();
    const setConfirmPasswordHidden = jest.fn();

    let passwordHidden = true;
    let confirmPasswordHidden = true;

    const contextValue = { passwordHidden, setPasswordHidden, confirmPasswordHidden, setConfirmPasswordHidden }

    const TestProvider = () => {
      const memoValue = useMemo(() => contextValue, [])
      return (
        <InscriptionContext.Provider value={memoValue}>
          <Inscription />
        </InscriptionContext.Provider>
      )
    }
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={themeMock}>
            <TestProvider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show the right title", () => {
    const button = screen.getByText("La méthodologie à la mesure de votre projet");

    expect(button).toBeInTheDocument();
  });


  it("click on submit with form empty", async () => {
    const submit = screen.getByRole("button", { name: "S'inscrire" });
    fireEvent.submit(submit);

    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGES.LASTNAME_REQUIRED)).toBeInTheDocument();
      expect(
          screen.getByText(ERROR_MESSAGES.FIRSTNAME_REQUIRED)
      ).toBeInTheDocument();
      expect(
          screen.getByText(ERROR_MESSAGES.EMAIL_INVALID)
      ).toBeInTheDocument();
      expect(
          screen.getAllByText(ERROR_MESSAGES.NEW_PASSWORD_REQUIRED)[0]
      ).toBeInTheDocument();
  });
  });
});
