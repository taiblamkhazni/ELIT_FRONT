/**
 * @file loading.test.js
 * @brief Ce fichier contient des tests pour le symbole Loading.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Loading from '../loading';
/**
 * @brief Suite of tests for the Loading symbol component, ensuring its proper rendering and functionality.
 */
describe('Loading', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<Loading />)
  });
});
