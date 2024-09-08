/**
 * @file TokenExpired.test.js
 * @brief Unit tests for TokenExpired component.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import ROUTES from "routes/routes";
import { ThemeProvider } from "styled-components";
import { Snackbar } from 'utils/Snackbar/Snackbar';

import { render, screen } from '@testing-library/react';

import TokenExpired from '../TokenExpired';

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

jest.mock('../../utils/Snackbar/Snackbar', () => ({
  Snackbar: jest.fn(),
}));
describe('TokenExpired Component', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ id: '5' }), () => { }]),
    }));
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <TokenExpired />
          </ThemeProvider>
        </Router>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Lien expiré')).toBeInTheDocument();
    expect(screen.getByText('La méthodologie à la mesure de votre projet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Renvoyer un e-mail' })).toBeInTheDocument();
  });

  it('does not display error snackbar if idUser is truthy', () => {
    expect(Snackbar).toHaveBeenCalledWith("error", "Erreur de récupération des données");
  });

  it('navigates to connexion after timeout', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <TokenExpired />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    jest.advanceTimersByTime(180000);

    expect(navigateMock).toHaveBeenCalledWith(ROUTES.connexion);

    jest.useRealTimers();
  });
});
