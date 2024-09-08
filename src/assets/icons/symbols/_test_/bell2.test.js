/**
 * @file bell2.test.js
 * @brief Ce fichier contient des tests pour le symbole Bell2.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Bell2 from '../bell2';
/**
 * @brief Suite of tests for the Bell2 symbol component, ensuring its proper rendering and functionality.
 */
describe('Bell2', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Bell2 />)
  });
  /**
   * @brief Test to check if cas count > 0 && checked
   */
  it('cas count > 0 && checked', () => {
    render(<Bell2 count={2} checked />)
  });
});
