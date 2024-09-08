/**
 * @file step2.test.js
 * @brief Ce fichier contient des tests pour le symbole Step2.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Step2 from '../step2';
/**
 * @brief Test suite for Step2 component.
 *
 * This suite includes various tests to ensure the Step1 component
 * renders correctly and behaves as expected under different scenarios.
 */
describe('Step2', () => {
  /**
   * @brief Test if the Step2 component renders without crashing.
   *
   * This test verifies that the Step1 component can be rendered
   * in the DOM without throwing any errors, ensuring basic stability.
   */
  it('renders with no problem / cas validated false', () => {
    render(<Step2 />)
  });
});
