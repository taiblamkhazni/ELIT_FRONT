/**
 * @file SurveyModal.test.js
 * @brief Contient les tests unitaires pour le composant SurveyModal.
 */
import { Provider, useSelector } from 'react-redux';
/**
 * @brief Importation du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react"

import SurveyModal from "../SurveyModal"

import { initialState, themeMock } from './dataMock';
/**
 * @brief utilisée pour surcharger la fonction console.warn pour empêche la console d'afficher les warnning pendant l'exécution des tests.
 */
console.warn = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

let store
const mockStore = configureStore();

describe("render component ProjectReportsUl", () => {
  beforeEach(() => {

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);
    const setIsModalOpen = jest.fn()
    const handlePasseSurVey = jest.fn()
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <SurveyModal
            isModalOpen={true}
            setIsModalOpen={setIsModalOpen}
            handlePasseSurVey={handlePasseSurVey} />
        </ThemeProvider>
      </Provider>
    )
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('test', () => {
  })

})


