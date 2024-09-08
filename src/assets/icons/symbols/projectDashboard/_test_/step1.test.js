/**
 * @file step1.test.js
 * @brief Ce fichier contient des tests pour le symbole Step1.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Step1 from '../step1';
/**
 * @brief Test suite for Step1 component.
 *
 * This suite includes various tests to ensure the Step1 component
 * renders correctly and behaves as expected under different scenarios.
 */
describe('Step1', () => {
  /**
   * @brief Test if the Step1 component renders without crashing.
   *
   * This test verifies that the Step1 component can be rendered
   * in the DOM without throwing any errors, ensuring basic stability.
   */
  it('renders with no problem / cas validated false', () => {
    render(<Step1 />)
  });
});
