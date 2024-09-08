/**
 * @file Connexion.test.js
 * @brief Contient les tests unitaires pour le composant Connexion.
 */
import { createContext, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import ConnexionPage from "../ConnexionPage";

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

/**
 * @brief Describe block for Connexion component tests.
 *
 * Contains a series of tests to validate the functionality of the Connexion component.
 */
describe("testing the connexion component", () => {
  beforeEach(() => {
    dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    const ConnexionContext = createContext({});

    const setPasswordHidden = jest.fn();

    let passwordHidden = true;

    const contextValue = { passwordHidden, setPasswordHidden }

    const TestProvider = () => {
      const memoValue = useMemo(() => contextValue, [])
      return (
        <ConnexionContext.Provider value={memoValue} >
          <ConnexionPage />
        </ConnexionContext.Provider>
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

});
