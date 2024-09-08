/**
 * @file multicriteriaAnalysisSaga.test.js
 * @brief Ce fichier contient les sagas liées à MulticriteriaAnalysis.
 *
 */
import { GetAnalyseMulticriteByProjectId } from "hooks/apis/AnalyseMulticritereApi";
import { getResultsMultiByProjectIdFetch } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import { call, takeLatest } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import {
  multicriteriaAnalysisSaga,
  workGetResultsMultiByProjectIdFetch,
} from "../multicriteriaAnalysisSaga";

/**
 * @brief Test suite for the multicriteriaAnalysisSaga.
 */
describe("multicriteriaAnalysisSaga", () => {
  let generator;
  /**
   * @brief Set up before each test case.
   */
  beforeEach(() => {
    generator = multicriteriaAnalysisSaga();
  });
  /**
   * @brief Test case to check if the function is listening to the action getResultsMultiByProjectIdFetch.
   */
  it("should listen action getResultsMultiByProjectIdFetch", () => {
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeLatest(
        "multicriteriaAnalysisReducer/getResultsMultiByProjectIdFetch",
        workGetResultsMultiByProjectIdFetch
      )
    );
  });

  /**
   * @brief Test case to check if the API call works when triggering getBrainStormingResumeFetch.
   */
  it("should trigger getBrainStormingResumeFetch", () => {
    expectSaga(workGetResultsMultiByProjectIdFetch)
      .provide([
        [
          call(GetAnalyseMulticriteByProjectId),
          [],
        ],
      ])
      .put(getResultsMultiByProjectIdFetch([]))
      .run();
  });

});
