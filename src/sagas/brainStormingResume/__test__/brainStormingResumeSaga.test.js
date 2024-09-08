/**
 * @file brainStormingResumeSaga.test.js
 * @brief Unit tests for the brainStormingResumeSaga.
 */
import { GetBrainStormingByIdAL } from "hooks/apis/Brainstorming";
import { getBrainStormingResumeSuccess } from "reducers/brainStormingResume/brainStormingResumeReducer";
import { call, takeEvery } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  brainDataFake,
  fakeBrainstormingData,
} from "sagas/fakeDataSagas/fakeDataSagas";

import {
  brainStormingResumeSaga,
  workBrainStormingResumeSaga,
} from "../brainStormingResumeSaga";
/**
 * @brief Group of tests related to the brainStormingResumeSaga.
 */
describe("projectsAdminSaga", () => {
  let generator;
  /** @brief Initialize the generator saga before each test*/
  beforeEach(() => {
    generator = brainStormingResumeSaga();
  });
  /**
   * @brief Test to check if the saga listens to the getBrainStormingResumeFetch action.
   */
  it("should listen action getBrainStormingResumeFetch", () => {
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery(
        "brainStormingResumeReducer/getBrainStormingResumeFetch",
        workBrainStormingResumeSaga
      )
    );
  });

  /**
   * @brief Test the primary saga listener for brainStormingResumeSaga.
   */
  test("brainStormingResumeSaga", () => {
    testSaga(brainStormingResumeSaga);
  });
  /**
   * @brief Test the worker saga for brainStormingResumeSaga.
   */
  test("workBrainStormingResumeSaga", () => {
    testSaga(workBrainStormingResumeSaga);
  });

  /**
   * @brief Test to verify the API call is working as expected.
   */
  it("should trigger getBrainStormingResumeFetch", () => {
    expectSaga(workBrainStormingResumeSaga).provide([
      [call(GetBrainStormingByIdAL, brainDataFake.payload), []]
    ])
      .run();
  });

  /**
   * @brief Test to check the API call results and action dispatching.
   */
  it("should trigger getBrainStormingResumeFetch", () => {
    expectSaga(workBrainStormingResumeSaga)
      .provide([
        [
          call(GetBrainStormingByIdAL, brainDataFake.payload),
          fakeBrainstormingData,
        ],
      ])
      .put(getBrainStormingResumeSuccess(fakeBrainstormingData))
      .run();
  });

});
/**
 * @brief Group of tests to cover all conditions in the workBrainStormingResumeSaga.
 */
describe("test applied in all if condition for workBrainStormingResumeSaga", () => {
  const iterator = workBrainStormingResumeSaga({ payload: { idAL: 1, projectId: 1 } });
  iterator.next();
  iterator.next("succeed");
  iterator.next();
});
