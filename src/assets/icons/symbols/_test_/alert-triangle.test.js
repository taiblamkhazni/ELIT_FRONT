/**
 * @file alert-triangle.test.js
 * @brief Ce fichier contient des tests pour le symbole alert triangle.
 */
import React from 'react';

import { render } from '@testing-library/react';

import AlertTriangle from '../alert-triangle';
/**
 * @brief Suite of tests for the Alert Triangle symbol component, ensuring its proper rendering and functionality.
 */
describe('alert triangle', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<AlertTriangle />)
  });
});
