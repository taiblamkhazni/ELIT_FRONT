/**
 * @file ReglagesButton.test.js
 * @brief Ce fichier contient des tests pour le composant ReglagesButton.
 */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { base } from 'theme/base';

import { render, screen } from '@testing-library/react';

import SettingsLink from '../ReglagesButton';

import 'jest-styled-components';

describe('SettingsLink component', () => {
  it('renders the SettingsLink component with the icon and text', () => {
    render(
      <ThemeProvider theme={base}>
        <SettingsLink />
      </ThemeProvider>
    );

    const settingsIcon = screen.getByTestId('settings-icon');
    const settingsText = screen.getByText('Réglages');

    expect(settingsIcon).toBeInTheDocument();
    expect(settingsText).toBeInTheDocument();
  });
});


