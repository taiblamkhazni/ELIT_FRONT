/**
 * @file step3.test.js
 * @brief Ce fichier contient des tests pour le symbole Step3.
 */
import React from 'react';

import { render } from '@testing-library/react';

import Step3 from '../step3';
/**
 * @brief Test suite for Step3 component.
 *
 * This suite includes various tests to ensure the Step1 component
 * renders correctly and behaves as expected under different scenarios.
 */
describe('Step3', () => {
  /**
   * @brief Test suite for Step3 component.
   *
   * This suite includes various tests to ensure the Step1 component
   * renders correctly and behaves as expected under different scenarios.
   */
  it('renders with no problem / cas validated false', () => {
    render(<Step3 />)
  });
});
