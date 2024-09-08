/**
 * @file AdministrationPage.test.js
 * @brief This file contains tests for the PageAdminstration component.
 */
import React from 'react';

import { render } from '@testing-library/react';

import AdministrationPage from '../AdministrationPage';

import '@testing-library/jest-dom/extend-expect';

jest.mock("pages/Administration/AdministrationPage", () => () => <div>AdministrationPage</div>);
jest.mock("pages/PageBase/PageBase", () => ({ children }) => <div>{children}</div>);

/**
 * @brief Test suite for the PageAdminstration component.
 */
describe('AdministrationPage', () => {

  /**
   * @brief Test to check if the PageAdminstration component renders without crashing
   * and correctly renders the mocked Administration component.
   */
  it('renders without crashing', () => {
    const { getByText } = render(<AdministrationPage />);
    expect(getByText("AdministrationPage")).toBeInTheDocument();
  });

});
