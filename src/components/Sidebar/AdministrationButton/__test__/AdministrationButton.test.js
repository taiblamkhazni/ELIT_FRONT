/**
 * @file AdministrationButton.test.js
 * @brief Ce fichier contient des tests pour le composant AdministrationButton.
 */
import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import AdministrationButton from '../AdministrationButton';

describe('AdministrationButton component', () => {
  it('renders without crashing', () => {
    render(<AdministrationButton />);
  });

  it('calls onClick function when clicked', () => {
    const onClick = jest.fn();
    render(<AdministrationButton onClick={onClick} />);
    const button = screen.getByText('Administration');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
