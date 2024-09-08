/**
 * @file clipboard-text.test.js
 * @brief Ce fichier contient des tests pour le symbole ClipboardText.
 */
import React from 'react';

import { render } from '@testing-library/react';

import ClipboardText from '../clipboard-text';
/**
 * @brief Suite of tests for the Clipboard symbol component, ensuring its proper rendering and functionality.
 */
describe('ClipboardText', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<ClipboardText />)
  });
});
