/**
 * @file previsibilityAnalysisSaga.js
 * @brief Ce fichier contient les tests sagas liées à PrevisibilityAnalysis.
 */
import {
  createAnalysePrevisibilite,
  getAllVotesByAnalysePrevisibilityId,
  getResultPrevisibilite,
  updateIterationPrevisibility,
} from "hooks/apis/AnalysePrevisibiliteApi";
import {
  getIdPreviAnalysisSuccess,
  getPercentageSuccess,
  getVotesSuccess,
  inscreaseIterationSuccess,
  setIsLoadingApResult,
} from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import { call, select, takeEvery, takeLatest } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import {
  previsibilityAnalysisSaga,
  selectProject,
  workGeneratingPreviAnalysisFetch,
  workGetResultsAnalyse,
  workGetVotesByIdAP,
  workRunAnaPreFirstIteration,
  workUpgradeInteration,
} from "../previsibilityAnalysisSaga";
/**
 * @brief Tests for previsibilityAnalysisSaga.
 */
describe("test file previsibilityAnalysisSaga", () => {
  let generator;
  beforeEach(() => {
    generator = previsibilityAnalysisSaga();
  });

  /**
   * @brief Tests if the saga listens to the 'getIdPreviAnalysisFetch' action.
   */
  it("should listen action getResultsSuccess", () => {
    const functionEffect = generator.next().value;
    expect(functionEffect).toEqual(
      takeLatest(
        "previsibilityAnalysisReducer/getIdPreviAnalysisFetch",
        workGeneratingPreviAnalysisFetch
      )
    );
  });

  /**
   * @brief Tests if the saga listens to the 'getVotesFetch' action.
   */
  it("should listen action getResultPrevisibilite", () => {
    generator.next();
    const functionEffect = generator.next().value;
    expect(functionEffect).toEqual(
      takeEvery(
        "previsibilityAnalysisReducer/getVotesFetch",
        workGetVotesByIdAP
      )
    );
  });

  /**
   * @brief Tests if the saga listens to the 'runFirstIterationAP' action.
   */
  it("should listen action runFirstIterationAP", () => {
    generator.next();
    generator.next();
    const functionEffect = generator.next().value;
    expect(functionEffect).toEqual(
      takeEvery(
        "previsibilityAnalysisReducer/runFirstIterationAP",
        workRunAnaPreFirstIteration
      )
    );
  });

  /**
   * @brief Tests if the saga listens to the 'inscreaseIterationFetch' action.
   */
  it("should listen action runFirstIterationAP", () => {
    generator.next();
    generator.next();
    generator.next();
    const functionEffect = generator.next().value;
    expect(functionEffect).toEqual(
      takeLatest(
        "previsibilityAnalysisReducer/inscreaseIterationFetch",
        workUpgradeInteration
      )
    );
  });

  /**
   * @brief Tests if the saga listens to the 'getResultsFetch' action.
   */
  it("should listen action getResultsFetch", () => {
    generator.next();
    generator.next();
    generator.next();
    generator.next();
    const functionEffect = generator.next().value;
    expect(functionEffect).toEqual(
      takeEvery(
        "previsibilityAnalysisReducer/getResultsFetch",
        workGetResultsAnalyse
      )
    );
  });

  /**
   * @brief Tests the saga function that generates Previsibility Analysis.
   */
  expectSaga(workGeneratingPreviAnalysisFetch)
    .provide([
      [call(createAnalysePrevisibilite, 1), 1], // Mock the API call to return an empty array
    ])
    .put(getIdPreviAnalysisSuccess(1)) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  /**
   * @brief Tests the saga function that gets results of the analysis.
   */
  expectSaga(workGetResultsAnalyse)
    .provide([
      [call(getResultPrevisibilite, 1, 1), 1], // Mock the API call to return an empty array
    ])
    .put(setIsLoadingApResult(false)) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  /**
   * @brief Tests the saga function that runs the first iteration of the analysis.
   */
  expectSaga(workRunAnaPreFirstIteration)
    .provide([
      [call(getResultPrevisibilite, 1, 1), 1], // Mock the API call to return an empty array
    ])
    .put(getPercentageSuccess(1)) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  /**
   * @brief Tests the saga function that upgrades the iteration.
   */
  expectSaga(workUpgradeInteration)
    .provide([
      [call(updateIterationPrevisibility, 1, 1), 1], // Mock the API call to return an empty array
    ])
    .put(inscreaseIterationSuccess()) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  /**
   * @brief Tests the saga function that fetches votes by ID for the Previsibility Analysis.
   */
  expectSaga(workGetVotesByIdAP)
    .provide([
      [call(getAllVotesByAnalysePrevisibilityId, 1, 1), 1], // Mock the API call to return an empty array
    ])
    .put(getVotesSuccess(1)) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  const iterator = workGeneratingPreviAnalysisFetch();
  /**
   * @brief Tests if the workGeneratingPreviAnalysisFetch function yields the correct select Effect.
   */
  it("should yield an Effect select", () => {
    const effect = iterator.next().value;
    const expected = select(selectProject);
    expect(effect).toEqual(expected);
  });
});

/**
 * @brief Test suite for checking all conditions in the workGeneratingPreviAnalysisFetch function.
 */
describe("test applied in all if condition for workGeneratingPreviAnalysisFetch", () => {
  const iterator = workGeneratingPreviAnalysisFetch();
  iterator.next();
  iterator.next(1);
  iterator.next({ data: 1 });
  iterator.next(1);
  iterator.next();
  iterator.next();
});

/**
 * @brief Test suite for checking all conditions in the workGetResultsAnalyse function.
 */
describe("test applied in all if condition for workGetResultsAnalyse", () => {
  const iterator = workGetResultsAnalyse({
    payload: { analyseId: 1, projectId: 1 },
  });
  iterator.next();
  iterator.next();
  iterator.next({ average: 2, formSteps: [{ stepRef: 1 }, { stepRef: 2 }] });
  iterator.next();
  iterator.next();
  iterator.next();
});

/**
 * @brief Test suite for checking all conditions in the workGetProject function.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workRunAnaPreFirstIteration({
    payload: { analyseId: 1, projectId: 1 },
  });
  iterator.next();
  iterator.next({ average: 2, formSteps: [{ stepRef: 1 }, { stepRef: 2 }] });
  iterator.next();
  iterator.next();
  iterator.next();
  iterator.next(1);
  iterator.next();
  iterator.next();
});

/**
 * @brief Test suite for checking all conditions in the workUpgradeInteration function.
 */
describe("test applied in all if condition for workUpgradeInteration", () => {
  const iterator = workUpgradeInteration({
    payload: { voteId: 1, projectId: 1 },
  });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});

/**
 * @brief Test suite for checking all conditions in the workGetVotesByIdAP function.
 */
describe("test applied in all if condition for workGetVotesByIdAP", () => {
  const iterator = workGetVotesByIdAP({ payload: { voteId: 1, projectId: 1 } });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});
