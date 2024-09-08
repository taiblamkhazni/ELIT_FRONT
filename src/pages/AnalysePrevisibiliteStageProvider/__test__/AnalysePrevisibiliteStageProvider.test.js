/**
 * @file analysePrevisibiliteStage.test.js
 * @brief This file contains tests for the AnalysePrevisibiliteStageProvider component,
 * ensuring it correctly renders its children when nested within React Router.
 */
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import AnalysePrevisibiliteStageProvider from '../AnalysePrevisibiliteStageProvider';

/**
 * @brief Test suite for the AnalysePrevisibiliteStagePage component.
 */
describe('AnalysePrevisibiliteStageProvider', () => {
  /**
   * @brief Test to check if it renders child component
   */
  it('renders child component', () => {
    const TestComponent = () => <div>Test Component</div>;

    render(
      <MemoryRouter initialEntries={['/test/child']}>
        <Routes>
          <Route path="/test" element={<AnalysePrevisibiliteStageProvider />}>
            <Route path="child" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
