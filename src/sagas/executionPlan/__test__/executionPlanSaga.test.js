/**
 * @file executionPlanSaga.test.js
 * @brief unit test executionPlanSaga
 */
import {
  createNewPlanExecution,
  getMethodesPlanExecution,
  getQuestionsPlanExecution,
  getResultatPlanExecution,
} from "hooks/apis/PlanExecutionApi";
import {
  getListQuestionsFailure,
  getListQuestionsSuccess,
  getMethodologiesArrayFailure,
  getMethodologiesArraySuccess,
  getResultsFailure,
  getResultsSuccess,
} from "reducers/executionPlan/executionPlanReducer";
import { call, takeEvery, takeLatest } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import {
  executionPlanSaga,
  workGetListQuestionsFetch,
  workGetMethodologiesArrayFetch,
  workGetNewPlanExecutionFetch,
  workGetResultsFetch,
} from "../executionPlanSaga";
/**
 * @brief Tests all generator and call functions.
 */
describe("test all generator and call functions", () => {
  /**
   * @brief Unit test to ensure the proper behavior of executionPlanSaga.
   */
  test("executionPlanSaga", () => {
    const saga = testSaga(executionPlanSaga);
    saga.next();
  });
  /**
   * @brief Unit test for the function workGetNewPlanExecutionFetch.
   */
  test("workGetNewPlanExecutionFetch", () => {
    const saga = testSaga(workGetNewPlanExecutionFetch);
    saga.next();
  });
  /**
   * unite test
   */
  let generator;

  beforeEach(() => {
    generator = executionPlanSaga();
  });

  /**
   * @brief Tests if the saga listens for the getListQuestionsFetch action.
   */
  it("should listen action getListQuestionsFetch", () => {
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery(
        "executionPlanReducer/getListQuestionsFetch",
        workGetListQuestionsFetch
      )
    );
  });

  /**
   * @brief Tests if the saga listens for the getResultsFetch action.
   */
  it("should listen action getResultsFetch", () => {
    generator.next();
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery("executionPlanReducer/getResultsFetch", workGetResultsFetch)
    );
  });

  /**
   * @brief Tests if the saga listens for the getMethodologiesArrayFetch action.
   */
  it("should listen action getMethodologiesArrayFetch", () => {
    generator.next();
    generator.next();
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery(
        "executionPlanReducer/getMethodologiesArrayFetch",
        workGetMethodologiesArrayFetch
      )
    );
  });

  /**
   * @brief Tests if the saga listens for the getNewPlanExecutionFetch action using takeLatest.
   */
  it("should listen action getNewPlanExecutionFetch", () => {
    generator.next();
    generator.next();
    generator.next();
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeLatest(
        "executionPlanReducer/getNewPlanExecutionFetch",
        workGetNewPlanExecutionFetch
      )
    );
  });

  /**
   * @brief Tests the Saga for fetching and handling list of questions.
   */
  expectSaga(workGetListQuestionsFetch)
    .provide([
      [call(getQuestionsPlanExecution, 1, 1), []], // Mock the API call to return an empty array
    ])
    .put(getListQuestionsSuccess([])) // Dispatch an action for a successful response
    .run(); // Run the Saga test

  /** @brief Test a Redux Saga for fetching and handling list of questions */
  expectSaga(workGetListQuestionsFetch)
    .provide([
      [call(getResultatPlanExecution, 1, 1), throwError("erreur produced")], // Mock the API call to return an empty array
    ])
    .put(getListQuestionsFailure())
    .run();
  // Run the Saga test

  /**
   * @brief Tests the Redux Saga for fetching and handling results. Assumes successful fetch.
   */
  expectSaga(workGetResultsFetch)
    .provide([
      [call(getResultatPlanExecution, 1, 1), []], // Mock the API call to return an empty array
    ])
    .put(getResultsSuccess([])) // Dispatch an action for successful results
    .run(); // Run the Saga test

  /**
   * @brief Tests the Redux Saga for fetching and handling results. Assumes an error occurs during fetch.
   */
  expectSaga(workGetResultsFetch)
    .provide([
      [call(getResultatPlanExecution, 1, 1), throwError("erreur produced")], // Create an exception
    ])
    .put(getResultsFailure([])) // Dispatch an action for successful results
    .run(); // Run the Saga test

  /**
   * @brief Tests the Redux Saga for fetching and handling methodologies array. Assumes successful fetch.
   */
  expectSaga(workGetMethodologiesArrayFetch)
    .provide([
      [call(getMethodesPlanExecution, 1, 1), []], // Mock the API call to return an empty array
    ])
    .put(getMethodologiesArraySuccess([])) // Dispatch an action for successful methodologies
    .run(); // Run the Saga test

  /**
   * @brief Tests the Redux Saga for fetching and handling methodologies array. Assumes an error occurs during fetch.
   */
  expectSaga(workGetMethodologiesArrayFetch)
    .provide([
      [call(getMethodesPlanExecution, 1, 1), throwError("erreur produced")], // Mock the API call to return an empty array
    ])
    .put(getMethodologiesArrayFailure([])) // Dispatch an action for successful methodologies
    .run();

  /**
   * @brief Tests the Redux Saga for creating a new plan execution. Assumes successful creation.
   */
  expectSaga(workGetNewPlanExecutionFetch)
    .provide([
      [call(createNewPlanExecution, 1), []], // Mock the API call to create a new plan execution and return an empty array
    ])
    .run(); // Run the Saga test
});
/**
 * @brief Tests that cover all the if conditions for workGetListQuestionsFetch.
 */
describe("test applied in all if condition for workGetListQuestionsFetch", () => {
  const iterator = workGetListQuestionsFetch({
    payload: { idPE: 1, projectId: 1 },
  });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});
/**
 * @brief Tests that cover all the if conditions for workGetResultsFetch.
 */
describe("test applied in all if condition for workGetResultsFetch", () => {
  const iterator = workGetResultsFetch({ payload: { idPE: 1, projectId: 1 } });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});
/**
 * @brief Tests that cover all the if conditions for workGetMethodologiesArrayFetch.
 */
describe("test applied in all if condition for workGetMethodologiesArrayFetch", () => {
  const iterator = workGetMethodologiesArrayFetch({ payload: { idPE: 1, projectId: 1 } });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});
