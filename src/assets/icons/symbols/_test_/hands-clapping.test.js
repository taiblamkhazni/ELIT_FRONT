/**
 * @file hands-clapping.test.js
 * @brief Ce fichier contient des tests pour le symbole HandsClapping.
 */
import React from 'react';

import { render } from '@testing-library/react';

import HandsClapping from '../hands-clapping';
/**
 * @brief Suite of tests for the HandsClapping symbol component, ensuring its proper rendering and functionality.
 */
describe('HandsClapping', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<HandsClapping />)
  });
});
