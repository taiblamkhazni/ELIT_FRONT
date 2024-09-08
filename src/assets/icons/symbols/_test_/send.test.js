/**
 * @file send.test.js
 * @brief Ce fichier contient des tests pour le symbole Send.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Send from '../send';
/**
 * @brief Suite of tests for the Send symbol component, ensuring its proper rendering and functionality.
 */
describe('Send', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Send />)
  });
});
