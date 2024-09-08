/**
 * @file ForgotPassword.test.js
 * @brief Unit tests for ForgotPassword component.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { ThemeProvider } from "styled-components";

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import ForgotPassword from '../ForgotPassword';
import ForgotPasswordForm from "../Forms/ForgotPasswordForm";
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

describe('ForgotPassword Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <ForgotPassword>
              <ForgotPasswordForm />
            </ForgotPassword>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Mot de passe oublié ?')).toBeInTheDocument();
    expect(screen.getByText('La méthodologie à la mesure de votre projet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument();
  });
});
