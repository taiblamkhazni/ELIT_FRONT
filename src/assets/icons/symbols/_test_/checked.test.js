/**
 * @file checked.test.js
 * @brief Ce fichier contient des tests pour le symbole Checked.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Checked from '../checked';
/**
 * @brief Suite of tests for the checked symbol component, ensuring its proper rendering and functionality.
 */
describe('Checked', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Checked />)
  });
});
