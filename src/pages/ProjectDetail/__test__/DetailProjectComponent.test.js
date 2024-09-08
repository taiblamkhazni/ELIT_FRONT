/**
 * @file DetailProjectComponent.test.js
 * @brief Unit tests for the DetailProjectComponent component.
 */

// Import render and screen functions from '@testing-library/react' package
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

// Import DetailProjectComponent component
import DetailProjectComponent from '../DetailProjectComponent';

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

// Helper function to render component with Redux provider
const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}><ThemeProvider theme={themeMock}><Router>{component}</Router></ThemeProvider></Provider>),
    store,
  };
};
// Create a dummy reducer as a placeholder
//const dummyReducer = (state = {}, action) => state;

// Configure store with the dummy reducer
//const store = configureStore({ reducer: dummyReducer });

const initialState = {
  multicriteriaAnalysisReducer: { isFinished: false },
  previsibilityAnalysisReducer: { isFinished: false },
  executionPlanReducer: { isFinished: false },
  authentificationReducer: {
    user: { id: 1, name: "John Doe" }, // Utilisateur simulé
  },
};

// Test case: renders project name correctly
test('renders project name correctly', () => {
  // Define test data
  const projectName = 'Test Project';
  const createdAtFormated = '01/01/2023';
  const description = 'This is a test project description.';
  

  // Render the DetailProjectComponent component with test data
    renderWithRedux( <DetailProjectComponent
      chefId="1"
        id="1"
        name={projectName}
        createdAtFormated={createdAtFormated}
        description={description}
      />, { initialState });



  // Assertion: check if project name text exists in the component
  const projectNameElement = screen.getByText(projectName);
  expect(projectNameElement).toBeInTheDocument();
});

// Test case: renders creation date correctly
test('renders creation date correctly', () => {
  // Define test data
  const projectName = 'Test Project';
  const createdAtFormated = '01/01/2023';
  const description = 'This is a test project description.';

  // Render the DetailProjectComponent component with test data
  renderWithRedux( <DetailProjectComponent
    chefId="1"
      id="1"
      name={projectName}
      createdAtFormated={createdAtFormated}
      description={description}
    />, { initialState });

  // Assertion: check if creation date text exists in the component
  const creationDateElement = screen.getByText(`Crée le ${createdAtFormated}`);
  expect(creationDateElement).toBeInTheDocument();
});

// Test case: renders project description correctly
test('renders project description correctly', () => {
  // Define test data
  const projectName = 'Test Project';
  const createdAtFormated = '01/01/2023';
  const description = 'This is a test project description.';

  // Render the DetailProjectComponent component with test data
  renderWithRedux( <DetailProjectComponent
    chefId="1"
      id="1"
      name={projectName}
      createdAtFormated={createdAtFormated}
      description={description}
    />, { initialState });

  // Assertion: check if project description text exists in the component
  const descriptionElement = screen.getByText(description);
  expect(descriptionElement).toBeInTheDocument();
});
