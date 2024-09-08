/**
 * @file check-circle.test.js
 * @brief Ce fichier contient des tests pour le symbole CheckCircle.
 */
import React from 'react';

import { render } from '@testing-library/react';

import CheckCircle from '../check-circle';
/**
 * @brief Suite of tests for the Check Circle symbol component, ensuring its proper rendering and functionality.
 */
describe('CheckCircle', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<CheckCircle />)
  });
});
