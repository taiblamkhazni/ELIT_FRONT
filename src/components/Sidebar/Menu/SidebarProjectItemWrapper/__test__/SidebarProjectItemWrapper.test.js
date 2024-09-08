/**
 * @file ProjectItemWrapper.test.js
 * @brief This file contains tests for the ProjectItemWrapper component.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from 'reducers/rootReducers';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';
import { base } from 'theme/base';

import { render, screen } from '@testing-library/react';

import SidebarProjectItemWrapper from '../SidebarProjectItemWrapper';

import 'jest-styled-components';

/**
 * @brief Redux store for testing.
 */
const store = createStore(rootReducer);

/**
 * @brief Test suite for the ProjectItemWrapper component.
 */
describe('ProjectItemWrapper component', () => {
  /**
   * @brief Test that the ProjectItemWrapper component renders correctly with given children and dataItem.
   */
  it('renders the ProjectItemWrapper component with the given children and dataItem', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={base}>
          <MemoryRouter>
            <SidebarProjectItemWrapper dataItem={1} status="Confirmed">
              Sample Item
            </SidebarProjectItemWrapper>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    const projectItem = screen.getByText('Sample Item');
    expect(projectItem).toBeInTheDocument();
  });
});
