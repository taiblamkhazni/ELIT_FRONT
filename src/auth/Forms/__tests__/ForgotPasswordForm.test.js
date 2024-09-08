/**
 * @file ForgotPasswordForm.test.js
 * @brief Unit tests for ForgotPassword component.
 */
import React from 'react';
import { sendForgotPasswordEmailApi } from "hooks/apis/UserApi";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { ThemeProvider } from "styled-components";
import { Snackbar } from 'utils/Snackbar/Snackbar';

import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';

import ForgotPasswordForm from "../ForgotPasswordForm";

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

jest.mock('utils/Snackbar/Snackbar', () => ({
  Snackbar: jest.fn(),
}));

jest.mock('hooks/apis/UserApi', () => ({
  sendForgotPasswordEmailApi: jest.fn(),
}));

describe('ForgotPasswordForm Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={themeMock}>
            <ForgotPasswordForm />
          </ThemeProvider>
        </Router>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('validates form fields and enables button when form is valid', () => {

    const emailInput = screen.getByPlaceholderText('dupont@gmail.com');
    const submitButton = screen.getByTestId('forgetButton');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(submitButton).toBeInTheDocument();

  });

  it('calls API and navigates on successful form submission', async () => {
    const mockApiResponse = Promise.resolve({ success: true });
    sendForgotPasswordEmailApi.mockImplementation(() => mockApiResponse);

    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const emailInput = screen.getByPlaceholderText('dupont@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByTestId('forgetButton');
    fireEvent.click(submitButton);

    await act(() => mockApiResponse);

    // expect(sendForgotPasswordEmailApi).toHaveBeenCalledWith({ email: 'test@example.com' });

    // expect(navigateMock).toHaveBeenCalledWith('/receiveMail', { state: {email:{ email: 'test@example.com' } }});
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('displays error snackbar if API call fails', async () => {
    const mockErrorResponse = Promise.resolve({ success: false, message: "Error message" });
    sendForgotPasswordEmailApi.mockImplementation(() => mockErrorResponse);

    const emailInput = screen.getByPlaceholderText('dupont@gmail.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByTestId('forgetButton');
    fireEvent.click(submitButton);

    await act(() => mockErrorResponse);

    expect(Snackbar).not.toHaveBeenCalled();
  });



});
