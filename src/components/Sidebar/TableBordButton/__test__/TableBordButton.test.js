/**
 * @file TableBordButton.test.js
 * @brief Ce fichier contient des tests pour le composant TableBordButton.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';
import { base } from 'theme/base';

import { fireEvent, render, screen } from '@testing-library/react';

import HomePageTooltip from '../TableBordButton';

import 'jest-styled-components';

const renderWithProviders = (ui, { store = createStore(rootReducer) } = {}) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={base}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const fakeNavigate = jest.fn();
describe('HomePageTooltip component', () => {
  it('renders HomePageTooltip component with text and icons', () => {
    renderWithProviders(<HomePageTooltip />);

    const gridIcon = screen.getByTestId('grid-icon');
    const homePageText = screen.getByText("Page d'accueil");

    expect(gridIcon).toBeInTheDocument();
    expect(homePageText).toBeInTheDocument();
  });

  it('navigates to /dashboard when clicked', () => {
    useNavigate.mockImplementation(() => fakeNavigate);
    const { getByTestId } = renderWithProviders(<HomePageTooltip />);
    const wrapper = getByTestId('wrapper-sidebar-item');

    fireEvent.click(wrapper);
    expect(fakeNavigate).toHaveBeenCalledTimes(1);
  });
});
