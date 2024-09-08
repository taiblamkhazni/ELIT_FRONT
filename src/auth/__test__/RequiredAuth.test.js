/**
 * @file RequiredAuth.test.js
 * @brief This file contains tests for the RequireAuth component
 */
import * as redux from 'react-redux';
import { MemoryRouter, Route,Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import RequireAuth from '../RequiredAuth';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

/**
 * @brief Test suite for the ConnexionPage component.
 */
describe('RequireAuth', () => {

    /**
     * @brief Test to check if it redirects to home for user without allowed role
     */
  it('redirects to home for user without allowed role', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({ user: { roles: ['user'] } });
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/test" element={<RequireAuth allowedRoles={['admin']} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});
