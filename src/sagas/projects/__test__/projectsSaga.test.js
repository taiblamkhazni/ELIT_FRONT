/**
 * @file projectsSaga.js
 * @brief Ce fichier contient les tests liés aux fonctions sagas du fichier projectsSaga.js.
 *
 */
import { getProjectsNewApi, postProjectApi ,updateProjectApi} from "hooks/apis/ProjetApi";
import { getProjectSuccess } from 'reducers/project/projectReducer';
import {postUpdateProjectSuccess } from "reducers/projects/projectsReducer";
import { call, takeEvery, takeLatest } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { userDataFake } from "sagas/fakeDataSagas/fakeDataSagas";

import {
  projectsSaga,
  workDeleteProjectFetch,
  workGetProjectsFetch,
  workPostNewProjectFetch,
  workUpdateProjectFetch,
} from "../projectsSaga";

/** @brief Test suite for projectsSaga */
describe("test file projectsSaga", () => {
  let generator;
  /** @brief Initialize generator before each test */
  beforeEach(() => {
    generator = projectsSaga();
  });

  /**
   * @brief Check if the saga listens to the getProjectsFetch action.
   */
  it("should listen action getProjectsSuccess", () => {
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery("projectsReducer/getProjectsFetch", workGetProjectsFetch)
    );
  });

  /**
   * @brief Check if the saga listens to the postNewProjectFetch action.
   */
  it("should listen action postNewProjectSuccess", () => {
    generator.next();
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeLatest("projectsReducer/postNewProjectFetch", workPostNewProjectFetch)
    );
  });
  it('should listen action postUpdateProjectFetch', () => {
    generator.next(); // Skip the first takeEvery effect
    generator.next(); // Skip the takeLatest effect for postNewProjectFetch
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeLatest('projectsReducer/postUpdateProjectFetch', workUpdateProjectFetch)
    );
  });

  /**
   * @brief Check if the saga listens to the deleteProjectFetch action.
   */
  it("should listen for deleteProjectSuccess action", () => {
    generator.next(); // Skip the first takeEvery effect
    generator.next(); // Skip the takeLatest effect for postNewProjectFetch
    generator.next(); // Skip the takeLatest effect for postUpdateProjectFetch
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeLatest("projectsReducer/deleteProjectFetch", workDeleteProjectFetch)
    );
  });

  /**
   * @brief Test the API call for fetching projects.
   */
  it("should trigger getProjectsFetch", () => {
    expectSaga(workGetProjectsFetch).provide([[
      call(getProjectsNewApi, userDataFake.payload), []
    ]]).run();
  });

  /**
   * @brief Test the API call for posting a new project.
   */
  it("should trigger postNewProjectFetch", () => {
    expectSaga(workPostNewProjectFetch).provide([[
      call(postProjectApi, userDataFake.payload), []
    ]]).run();
  });
  it('should trigger workUpdateProjectFetch saga', () => {
    expectSaga(workUpdateProjectFetch, userDataFake.payload )
      .provide([[call(updateProjectApi, userDataFake.payload.projectId, userDataFake.payload), {}], [call(getProjectSuccess, userDataFake.payload.projectId), {}]])
      .put(postUpdateProjectSuccess({}))
      .put(getProjectSuccess({}))
      .run();
  });
});
