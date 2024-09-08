/**
 * @file chevron-down.test.js
 * @brief Ce fichier contient des tests pour le symbole ChevronDown.
 */
import React from 'react';

import { render } from '@testing-library/react';

import ChevronDown from '../chevron-down';
/**
 * @brief Suite of tests for the ChevronDown symbol component, ensuring its proper rendering and functionality.
 */
describe('ChevronDown', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<ChevronDown />)
  });
});
