/**
 * @file ListStage.test.js
 * @brief Unit tests for the ListStage component.
 */
import { Provider } from 'react-redux';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';

import { render } from '@testing-library/react';

import ListStage from '../ListStage';

import '@testing-library/jest-dom/extend-expect';

/**
 *
 * @brief Mock translation function.
 */ 
jest.mock('utils/translationUtils', () => ({
  t: (key) => key,
}));

/**
 *
 * @brief Mock StageBase component.
 */
jest.mock('../StageBase', () => ({ title, step, activated, completed }) => (
  <div data-testid={`stage-${step}`}>
    <span>{title}</span>
    <span>{`Activated: ${activated}`}</span>
    <span>{`Completed: ${completed}`}</span>
  </div>
));


/**
 *
 * @brief Mock reducers.
 */
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

/**
 * @brief Helper function to render a component with Redux provider for testing.
 * @param {ReactElement} component - The component to render.
 * @param {Object} options - Options for rendering (initialState, store).
 * @returns {Object} Render result with the rendered component and store.
 */
const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('ListStage component', () => {
  it('renders correctly with initial state', () => {
    const initialState = {
      multicriteriaAnalysisReducer: { isFinished: false },
      previsibilityAnalysisReducer: { isFinished: false },
      executionPlanReducer: { isFinished: false },
      authentificationReducer: {
        user: { id: 1, name: "John Doe" }, // Utilisateur simulé
      },
    };

    const { getByTestId } = renderWithRedux(<ListStage />, { initialState });

    expect(getByTestId('stage-1')).toHaveTextContent('projectDashboard.listStage.multicriteria');
    expect(getByTestId('stage-1')).toHaveTextContent('Activated: true');
    expect(getByTestId('stage-1')).toHaveTextContent('Completed: false');

    expect(getByTestId('stage-2')).toHaveTextContent('projectDashboard.listStage.predictibility');
    expect(getByTestId('stage-2')).toHaveTextContent('Activated: false');
    expect(getByTestId('stage-2')).toHaveTextContent('Completed: false');

    expect(getByTestId('stage-3')).toHaveTextContent('projectDashboard.listStage.execution');
    expect(getByTestId('stage-3')).toHaveTextContent('Activated: false');
    expect(getByTestId('stage-3')).toHaveTextContent('Completed: false');
  });

  // Add more test cases as needed
});
