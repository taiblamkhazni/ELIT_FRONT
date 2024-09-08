/**
 * @file online.test.js
 * @brief Ce fichier contient des tests pour le symbole Online.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Online from '../online';
/**
 * @brief Suite of tests for the Online symbol component, ensuring its proper rendering and functionality.
 */
describe('Online', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Online />)
  });
});
