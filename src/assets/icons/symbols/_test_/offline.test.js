/**
 * @file offline.test.js
 * @brief Ce fichier contient des tests pour le symbole Offline.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Offline from '../offline';
/**
 * @brief Suite of tests for the Offline symbol component, ensuring its proper rendering and functionality.
 */
describe('Offline', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Offline />)
  });
});
