/**
 * @file ProjectDetailPage.test.js
 * @brief Contient les tests unitaires pour le composant ProjectDetail.
 */

import { QueryClient, QueryClientProvider } from "react-query"; // Importer QueryClient et QueryClientProvider
import { Provider } from "react-redux"; // Importer le provider
import { BrowserRouter } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react"; // Importer render pour le rendu de composants

import ProjectDetailPage from "../ProjectDetailPage.js";
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
      danger: "red"
    }
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};



// Mock reducers
jest.mock('reducers/executionPlan/executionPlanReducer', () => ({
  __esModule: true,
  default: (state = { isFinished: false }, action) => {
    switch (action.type) {
      // handle action types if needed
      default:
        return state;
    }
  },
}));

jest.mock('reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer', () => ({
  __esModule: true,
  default: (state = { isFinished: false }, action) => {
    switch (action.type) {
      // handle action types if needed
      default:
        return state;
    }
  },
}));

jest.mock('reducers/previsibilityAnalysis/previsibilityAnalysisReducer', () => ({
  __esModule: true,
  default: (state = { isFinished: false }, action) => {
    switch (action.type) {
      // handle action types if needed
      default:
        return state;
    }
  },
}));
const queryClient = new QueryClient(); // Créer une instance de QueryClient
// Helper function to render component with Redux provider
const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<QueryClientProvider client={queryClient}><Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider></QueryClientProvider>),
    store,
  };
};

/**
 * @brief Réalisation d'un test de base pour vérifier l'existence du composant sans plantage.
 */
describe("ProjectDetailPage", () => {
  it("renders correctly without crashing", () => {
    const initialState = {
      multicriteriaAnalysisReducer: { isFinished: false },
      previsibilityAnalysisReducer: { isFinished: false },
      executionPlanReducer: { isFinished: false },
      // Configuration initiale du state du reducer de projet pour simuler un état initial du store Redux
      projectReducer: {
        project: {
          chefId: "1", // ID du chef de projet simulé
          createdAt: "2024-02-06T12:00:00Z", // Date de création du projet simulée
          name: "Test Project", // Nom du projet simulé
          description: "This is a test project", // Description du projet simulée
          contributors: [], // Liste vide de contributeurs simulée
          attachments: [], // Liste vide de pièces jointes simulée
          projectId: "123456789", // ID du projet simulé
        },
      },
      authentificationReducer: {
        user: { id: 1, name: "John Doe" }, // Utilisateur simulé
      },
    };

    //const store = mockStore(initialState); // Créer un store Redux simulé avec l'état initial

    // const queryClient = new QueryClient(); // Créer une instance de QueryClient

    // Rendre le composant ProjectDetailPage dans un environnement de test
    renderWithRedux(<ThemeProvider theme={themeMock}><ProjectDetailPage /></ThemeProvider>, { initialState });
  });
});
