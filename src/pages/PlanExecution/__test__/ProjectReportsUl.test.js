/**
 * @file ProjectReportsUl.test.js
 * @brief Contient les tests unitaires pour le composant ProjectReportsUl.
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

import { fireEvent, render, screen } from "@testing-library/react"

import ProjectReportsUl from '../ProjectReportsUl';

import { themeMock } from './dataMock';
/**
 * @brief Utilisation de Jest pour simuler le hook useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

let store
/**
 * @brief Création d'une variable simulé un tableaux de rapports
 */
const reports = [
  {
    step: "Analyse multicritère",
    type: "multicriteria_report"
  },
]

const mockStore = configureStore();

const initialState = {
  projectReducer: {
    reportsNumber: {
      "multicriteria_report": 0,
      "predictibility_report": 0,
      "execution_report": 0
    }
  }
}

describe("render component ProjectReportsUl", () => {
  beforeEach(() => {
    console.error = jest.fn();

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <ProjectReportsUl reports={reports} />
        </ThemeProvider>
      </Provider>
    )
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shoud be render components ProjectReportsUl', () => {
    const title = screen.getByText('Rapports')
    expect(title).toBeInTheDocument()
  })

  it('should be appear a modal when i click on the button', () => {
    const button = screen.getByText(/Voir le rapport/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.getByText(/Historique des rapports/i)).toBeInTheDocument()
  })
})
