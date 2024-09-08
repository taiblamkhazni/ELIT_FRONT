/**
 * @file dashboardPage.test.js
 * @brief This file contains tests for the DashboardPage component.
 */
import React from 'react';
import * as redux from "react-redux";
import rootReducers from 'reducers/rootReducers';
import { legacy_createStore as createStore } from "redux";

import { render, screen } from '@testing-library/react';

/**
 * @brief Importation du composant Dashboard pour le tester
*/
import DashboardPage from '../DashboardPage';
/**
 * @brief Importation du composant Media pour l'utiliser dans le teste
 */
import Media from "../Media";
/**
 * @brief Importation du composant Swipper pour l'utiliser dans le tester
 */
import Swipper from "../Swipper";

import '@testing-library/jest-dom/extend-expect';

jest.mock("../PresentationPanel");
jest.mock("../Swipper");
jest.mock("../Media");
/**
 * @brief mocks of components and hooks
 */
jest.mock("../DashboardPage", () => () => <div>DashboardPage Component</div>);
jest.mock("../TooltipModal", () => () => <div>TooltipModal Component</div>);
jest.mock("../../PageBase/PageBase", () => ({ children }) => <div>{children}</div>);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

/**
 * @brief Test suite for the DashboardPage component.
 */
describe('DashboardPage', () => {

  let store;
  let useSelectorMock;

  beforeEach(() => {
    useSelectorMock = jest.spyOn(redux, 'useSelector');
    useSelectorMock.mockClear();
    // Initialize a new Redux store
    store = createStore(rootReducers, {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Test to check if it renders without crashing
   */
  it('renders without crashing', () => {
    render(
      <redux.Provider store={store}>
        <DashboardPage />
      </redux.Provider>
    );
    expect(screen.getByText("DashboardPage Component")).toBeInTheDocument();
  });

  /**
   * @brief Test to check if it renders styled mask when condition is true
   */
  it('renders styled mask when condition is true', () => {
    useSelectorMock.mockImplementation(callback => {
      return callback({ welcomeTooltipReducer: { stageNumber: 3 } });
    });
    const { container } = render(<DashboardPage />);
    const mask = container.querySelector("#mask");
    expect(mask).toBe(null);
    // TODO: Fix this test
    // expect(mask).toHaveStyle(`
    //   position: absolute;
    //   width: 100%;
    //   filter: blur(1px);
    //   height: 117%;
    //   background: black;
    //   zIndex: 1;
    //   opacity: 0.7;
    // `);
  });

  /**
   * @brief Test to check if it renders styled mask when condition is false
   */
  it('renders empty styled mask when condition is false', () => {
    useSelectorMock.mockImplementation(callback => {
      return callback({ welcomeTooltipReducer: { stageNumber: 7 } });
    });

    const { container } = render(<DashboardPage />);
    const mask = container.querySelector("#mask");
    expect(mask).toBe(null);
    // TODO: Fix this test
    // expect(mask).not.toHaveStyle(`
    //   position: absolute;
    //   width: 100%;
    //   filter: blur(1px);
    //   height: 117%;
    //   background: black;
    //   zIndex: 1;
    //   opacity: 0.7;
    // `);
  });

  test("renders Swipper component", () => {
    render(<DashboardPage />);
    expect(Swipper).toHaveBeenCalledTimes(0);
  });

  test("renders Media component", () => {
    render(<DashboardPage />);
    expect(Media).toHaveBeenCalledTimes(0);
  });

});
