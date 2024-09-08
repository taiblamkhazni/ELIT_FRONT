/**
 * @file ProjectFilesUl.test.js
 * @brief Contient les tests unitaires pour le composant ProjectFilesUl.
 */
import React from 'react';
/**
 * @brief Importation du styled-components.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react"

import ProjectFilesUl from "../ProjectFilesUl"

import { themeMock } from './dataMock';

it('Render component ProjectFilesUl', () => {

  const files = [
    {
      fileName: 'file'
    },
  ]
  render(
    <ThemeProvider theme={themeMock}>
      <ProjectFilesUl title={'title'} files={files} />
    </ThemeProvider>
  )
  expect(screen.getByText(/title/i)).toBeInTheDocument()
  expect(screen.getByText(/file/i)).toBeInTheDocument()
})