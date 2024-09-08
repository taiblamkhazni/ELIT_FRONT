/**
 * @file smile.test.js
 * @brief Ce fichier contient des tests pour le symbole Smile.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Smile from '../smile';
/**
 * @brief Suite of tests for the smile symbol component, ensuring its proper rendering and functionality.
 */
describe('Smile', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Smile />)
  });
});
