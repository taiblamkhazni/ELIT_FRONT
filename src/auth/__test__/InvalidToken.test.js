/**
 * @file InvalidToken.test.js
 * @brief Unit tests for InvalidToken component.
 */
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import ROUTES from "routes/routes";
import { ThemeProvider } from "styled-components";
import { Snackbar } from 'utils/Snackbar/Snackbar';

import { render, screen } from '@testing-library/react';

import InvalidToken from '../InvalidToken';

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

describe('InvalidToken Component', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useSearchParams: jest.fn().mockReturnValue([new URLSearchParams(), () => { }]),
    }));
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <InvalidToken />
          </ThemeProvider>
        </Router>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Erreur d\'activation de votre compte')).toBeInTheDocument();
    expect(screen.getByText('La méthodologie à la mesure de votre projet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Renvoyer un e-mail' })).toBeInTheDocument();
  });

  it('displays error snackbar if idUser is false', () => {
    expect(Snackbar).toHaveBeenCalledWith("error", "Erreur de récupération des données");
  });

  it('navigates to connexion after timeout InvalidToken', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <InvalidToken />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    jest.advanceTimersByTime(180000);

    expect(navigateMock).toHaveBeenCalledWith(ROUTES.connexion);

    jest.useRealTimers();
  });

});
