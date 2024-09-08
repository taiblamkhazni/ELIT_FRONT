/**
 * @file bell.test.js
 * @brief Ce fichier contient des tests pour le symbole Bell.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Bell from '../bell';
/**
 * @brief Suite of tests for the Bell symbol component, ensuring its proper rendering and functionality.
 */
describe('Bell', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Bell />)
  });
});
