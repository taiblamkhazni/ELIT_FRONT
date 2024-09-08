/**
 * @file uncheck.test.js
 * @brief Ce fichier contient des tests pour le symbole Uncheck.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Uncheck from '../uncheck';
/**
 * @brief Suite of tests for the Unchecked symbol component, ensuring its proper rendering and functionality.
 */
describe('Uncheck', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Uncheck />)
  });
  /**
   * @brief Test to check if it checks and fills
   */
  it('cas check + fill', () => {
    render(<Uncheck fill="value" check />)
  });
  /**
   * @brief Test to check if it checks only
   */
  it('cas check only', () => {
    render(<Uncheck check />)
  });
});
