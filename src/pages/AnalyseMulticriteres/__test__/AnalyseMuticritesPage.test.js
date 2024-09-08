/**
 * @file AnalyseMuticritesPage.test.js
 * @brief This file contains tests for the AnalyseMulticriteres component.
 */
import React from "react";
import { Provider } from "react-redux";
import rootReducer from "reducers/rootReducers";
import { createStore } from "redux";

import { render } from "@testing-library/react";

import AnalyseMuticritesPage from "../AnalyseMulticriteresPage";

import "@testing-library/jest-dom/extend-expect";

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage", () => () => <div>Mocked AnalyseMulticriteres</div>);

/**
 * @brief Test suite for the PageAdminstration component.
 */
describe("AnalyseMuticritesPage", () => {
  let store;

  /**
   * @brief Set up a mock store with predefined states for testing purposes.
   * Here, initial states are set for projectReducer and multicriteriaAnalysisReducer.
   */
  beforeEach(() => {
    store = createStore(rootReducer, {
      projectReducer: { projectId: "123" },
      multicriteriaAnalysisReducer: { isFinished: true },
    });
  });

  /**
   * @brief Test to check if the AnalyseMuticritesPage component renders without crashing
   * and correctly renders the mocked AnalyseMulticriteresFeatures component.
  */
  it("renders without crashing", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AnalyseMuticritesPage />
      </Provider>
    );

    expect(getByText("Mocked AnalyseMulticriteres")).toBeInTheDocument();
  });
});
