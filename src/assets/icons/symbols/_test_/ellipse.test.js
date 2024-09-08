/**
 * @file ellipse.test.js
 * @brief Ce fichier contient des tests pour le symbole Ellipse.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Ellipse from '../ellipse';
/**
 * @brief Suite of tests for the Ellipse symbol component, ensuring its proper rendering and functionality.
 */
describe('Ellipse', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Ellipse />)
  });
});
