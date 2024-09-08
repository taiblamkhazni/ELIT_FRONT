/**
 * @file ScrollingMenus.test.js
 * @brief Contient les tests unitaires pour le composant ScrollingMenus.
 */
import { ThemeProvider } from "styled-components"

import { render, screen } from "@testing-library/react"

import ScrollingMenus from "../ScrollingMenus"

import { themeMock } from "./dataMock"

console.log = jest.fn()


it('should be appear the description', () => {
  render(<ScrollingMenus title={'title'} content={'content'} open={true} />)
  expect(screen.getByText('title')).toBeInTheDocument()
  expect(screen.getByText('content')).toBeInTheDocument()
  screen.debug()
})

it('should be appear just the title when visible is false', () => {
  render(
    <ThemeProvider theme={themeMock}>
      <ScrollingMenus title={'title'} content={'content'} open={false} />
    </ThemeProvider>
  )
  expect(screen.getByText('title')).toBeInTheDocument()
  screen.debug()
})
