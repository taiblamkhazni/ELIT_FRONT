/**
 * @file NotFoundPage.test.js
 * @brief This file contains tests for the NotFoundPage component.
 */


import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import NotFoundPage from '../NotFoundPage'; // Adjust the import path as necessary

// Mock the assets to prevent errors during testing
jest.mock('../../../assets/images/arrow-right-circle.png', () => 'mock-arrow-right-circle.png');
jest.mock('../../../assets/images/LogoElit.png', () => 'mock-logo.png');
jest.mock('../../../assets/images/robotNotFound.png', () => 'mock-robot.png');



describe('NotFoundPage component tests', () => {
  /**
   * @brief Renders the NotFoundPage component before each test.
   */
  beforeEach(() => {
    render(
      
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
     
    );
  });

  /**
   * @brief Clears all mocks after each test.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @test Checks if the ELiT logo is displayed.
   */
  it('should display the ELiT logo', () => {
    const logo = screen.getByAltText('ELiT Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mock-logo.png');
  });

  /**
   * @test Checks if the robot image is displayed.
   */
  it('should display the robot image', () => {
    const robot = screen.getByAltText('Robot');
    expect(robot).toBeInTheDocument();
    expect(robot).toHaveAttribute('src', 'mock-robot.png');
  });

  /**
   * @test Checks if the error message is displayed.
   */
  it('should display the error message', () => {
    const message = screen.getByText(/Il semblerait que la page que vous demandez n'existe plus ou n'est plus disponible./i);
    expect(message).toBeInTheDocument();
  });

  /**
   * @test Checks if the home button is displayed with the correct text and icon.
   */
  it('should display the home button with correct text and icon', () => {
    const icon = screen.getByAltText('New Icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'mock-arrow-right-circle.png');
  });
});
