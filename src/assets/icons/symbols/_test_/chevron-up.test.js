/**
 * @file chevron-up.test.js
 * @brief Ce fichier contient des tests pour le symbole ChevronUp.
 */
import React from 'react';

import { render } from '@testing-library/react';

import ChevronUp from '../chevron-up';
/**
 * @brief Suite of tests for the ChevronUp symbol component, ensuring its proper rendering and functionality.
 */
describe('ChevronUp', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<ChevronUp />)
  });
});
