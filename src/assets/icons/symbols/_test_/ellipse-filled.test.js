/**
 * @file ellipse-filled.test.js
 * @brief Ce fichier contient des tests pour le symbole EllipseFilled.
 */
import React from 'react';

import { render } from '@testing-library/react';

import EllipseFilled from '../ellipse-filled';
/**
 * @brief Suite of tests for the Ellipse filled symbol component, ensuring its proper rendering and functionality.
 */
describe('EllipseFilled', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<EllipseFilled />)
  });
});
