/**
 * @file MethodologiesPresentation.test.js
 * @brief Contient les tests unitaires pour le composant MethodologiesPresentation.
 */
import React from 'react';
/**
 * @brief Importation du react-redux.
 */
import { Provider, useSelector } from 'react-redux';
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import MethodologiesPresentation from '../MethodologiesPresentation';

import { initialState, themeMock } from './dataMock';
/**
 * @brief Utilisation de Jest pour simuler le hook useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

let store
const setIsVoted = jest.fn()

const mockStore = configureStore();
describe("render component MethodologiesPresentation", () => {
  beforeEach(() => {

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be appear the method hybrid type when the user select Hybrid as methodology', () => {

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <MethodologiesPresentation isAdmin={false} setIsVoted={setIsVoted} methodologieChoosed={'HYBRID'} />
        </ThemeProvider>
      </Provider>
    )
    const methodType = screen.getByText(/cascade/i)
    expect(methodType).toBeInTheDocument()
    screen.debug()
  })
  it('should be checked when i click on the checkbox', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <MethodologiesPresentation isAdmin={false} setIsVoted={setIsVoted} methodologieChoosed={'HYBRID'} />
        </ThemeProvider>
      </Provider>
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()

    fireEvent.click(checkboxes[0])
    waitFor(() => expect(checkboxes[0]).toBeChecked())
    screen.debug()
  })
  it('should be appear more information when i click on the icon "+" on the column "Méthode"', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <MethodologiesPresentation isAdmin={true} setIsVoted={setIsVoted} methodologieChoosed={'HYBRID'} />
        </ThemeProvider>
      </Provider>
    )
    const iconPlus = screen.getAllByTestId('icon')
    expect(iconPlus[0]).toBeInTheDocument()

    fireEvent.click(iconPlus[0])

    expect(screen.getByText(/Quand l'utiliser ?/i)).toBeInTheDocument()
    expect(screen.getByText(/Quand l'éviter ?/i)).toBeInTheDocument()
    screen.debug()
  })

  it('should be appear the method agile type when the user select agile as methodology', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <MethodologiesPresentation isAdmin={false} setIsVoted={setIsVoted} methodologieChoosed={'AGILE'} />
        </ThemeProvider>
      </Provider>
    )

    const methodType = screen.getAllByText(/Agile/i)[0]
    const radios = screen.getAllByRole('checkbox')

    expect(methodType).toBeInTheDocument()
    expect(radios[0]).not.toBeChecked()

    fireEvent.click(radios[0])
    waitFor(() => expect(radios[0]).toBeChecked())
    screen.debug();
  })

    it('should be appear the method agile type when the user select Hybrid as methodology', () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={themeMock}>
            <MethodologiesPresentation isAdmin={true} setIsVoted={setIsVoted} methodologieChoosed={'Hybrid'} />
          </ThemeProvider>
        </Provider>
      )
      const radios = screen.getAllByRole('checkbox')
      const text = screen.getByText("Méthode Hybrid")

      expect(radios[0]).not.toBeChecked()
      expect(text).toBeInTheDocument()

      fireEvent.click(radios[0])
      waitFor(() => expect(radios[0]).toBeChecked())
      screen.debug();
    })
})
