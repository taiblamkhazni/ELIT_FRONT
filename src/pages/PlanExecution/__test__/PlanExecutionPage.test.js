/**
 * @file PlanExecution.test.js
 * @brief Contient les tests unitaires pour le composant Connexion.
 */
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MemoryRouter  } from "react-router-dom";
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Connexion pour le tester
 */
import PlanExecution from "../PlanExecutionPage";
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
console.warn = jest.fn();
/**
 * @brief Configuration du magasin Redux simulé.
 */
const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */

jest.mock('hooks/apis/PlanExecutionApi.js', () => ({
  getSurveyAnswersByUserId: jest.fn(),
  getSurveyQuestions: jest.fn(),
}));

const initialState = {
  projectReducer: {
    currentUser: {
      role: "CDP"
    },
    project: {
      contributors: [],
      attachments: []
    },
    reportsNumber: []
  },
  executionPlanReducer: {
    idPlanExecution: 1,
    isFinished: true,
    results: {
      chooseMethod: [],
      allMethods: [],
      predictibilityResults: [
        { name: "AGILE", value: 15 },
        { name: "CLASSIC", value: 10 },
        { name: "HYBRID", value: 18 },
      ]
    }
  },
  previsibilityAnalysisReducer: {
    methodologies: [
      { name: "AGILE", value: 15 },
      { name: "CLASSIC", value: 10 },
      { name: "HYBRID", value: 18 },
    ],
  },
  authentificationReducer: {
    user: {
      firstname: "John",
      lastname: "Doe",
    },
  },
  methodsPie: {
    base64: null,
  },
  methodsBar: {
    base64: null,
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

describe("testing the connexion component", () => {
  beforeEach(() => {
    dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={themeMock}>
            <PlanExecution />
          </ThemeProvider>
        </QueryClientProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("test the tilte", () => {

    const text = screen.getByText("Choix de la méthode");

    expect(text).toBeInTheDocument();
  });

});

