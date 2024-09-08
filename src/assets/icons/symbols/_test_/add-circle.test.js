/**
 * @file add-circle.test.js
 * @brief Ce fichier contient des tests pour le symbole add circle.
 */
import React from 'react';

import { render } from '@testing-library/react';

import AddCircle from '../add-circle';

/**
 * @brief Suite of tests for the Add Circle symbol component, ensuring its proper rendering and functionality.
 */
describe('add circles', () => {

  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<AddCircle />)
  });
});
