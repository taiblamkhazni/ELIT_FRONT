/** 
 * @file Wrapper.test.js
 * @brief Importation des bibliothèques et modules nécessaires au test du composant Wrapper.
 */
import React from 'react';
/** 
 * @external styled-components
 */
import { ThemeProvider } from 'styled-components';
import { base } from 'theme/base';

import { render } from '@testing-library/react';

/**
 * @brief Import du composant Wrapper pour le tester.
 */
import Wrapper from '../Wrapper';

/**
 * Mock the Sidebar and Head components to avoid testing their internal implementation
 */
jest.mock('../../Sidebar/Sidebar', () => () => <div data-testid="mock-sidebar">Sidebar</div>);
jest.mock('../../Head/Head', () => () => <div data-testid="mock-head">Head</div>);

describe('Wrapper component', () => {
  it('renders the Wrapper component with its children', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={base}>
        <Wrapper>
          <div data-testid="child-element">Child element</div>
        </Wrapper>
      </ThemeProvider>
    );

    expect(getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(getByTestId('mock-head')).toBeInTheDocument();
    expect(getByTestId('child-element')).toBeInTheDocument();
    expect(getByText('Child element')).toBeInTheDocument();
  });
});
