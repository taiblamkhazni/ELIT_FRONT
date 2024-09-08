/**
 * @file ModalMethodologie.test.js
 * @brief Contient les tests unitaires pour le composant ModalMethodologie.
 */
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react"

import ModalMethodologie from "../ModalMethodologie"

console.error = jest.fn()

const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red"
    }
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};
const setIsModalOpen = jest.fn()
describe('When the modal is open', () => {
  it('should be appear', () => {
    render(
      <ThemeProvider theme={themeMock} >
        <ModalMethodologie isModalOpen={true} methodologie={'Agile'} setIsModalOpen={setIsModalOpen} />
      </ThemeProvider>
    )
    expect(screen.getByText(/Caractéristiques de la méthodologie Agile/i))
  })
  it('should be close when i click on the button', () => {
    render(
      <ThemeProvider theme={themeMock} >
        <ModalMethodologie isModalOpen={true} methodologie={'Agile'} setIsModalOpen={setIsModalOpen} />
      </ThemeProvider>
    )
    const button = screen.getByText("Fermer")
    fireEvent.click(button)
    expect(setIsModalOpen).toHaveBeenCalled()
  })
})
