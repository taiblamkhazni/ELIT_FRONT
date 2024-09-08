/**
 * @file info-fill.test.js
 * @brief Ce fichier contient des tests pour le symbole InfoFill.
 */
import React from 'react';

import { render } from '@testing-library/react';

import InfoFill from '../info-fill';
/**
 * @brief Suite of tests for the infoFill symbol component, ensuring its proper rendering and functionality.
 */
describe('InfoFill', () => {
  /**
   * @brief Test to check if it renders without problems
   */
  it('renders with no problem', () => {
    render(<InfoFill />)
  });
});
