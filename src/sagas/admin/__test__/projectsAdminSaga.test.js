/**
 * @file projectsAdminSaga.test.js
 * @brief Ce fichier contient les tests sagas liées au projects.
 *
 */
import { getProjectsAdmin } from 'hooks/apis/AdminApi';
import { getProjectsAdminSuccess } from "reducers/admin/projects/projectsAdminReducer"
import { call } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { fakeProjectsAdminData } from 'sagas/fakeDataSagas/fakeDataSagas';

import { projectsAdminSaga, workGetProjectsAdminFetch } from '../projectsAdminSaga';
/**
 * @brief Group of tests related to the projectsAdminSaga.
 */
describe('projectsAdminSaga', () => {
  /**
   * @brief Test to ensure that projects are fetched correctly and the success action is dispatched.
   */
  it('should fetch projects and dispatch success action', () => {
    // Define if request Get is working
    return expectSaga(workGetProjectsAdminFetch)
      .provide([
        [call(getProjectsAdmin), fakeProjectsAdminData],
      ])
      .put(getProjectsAdminSuccess(fakeProjectsAdminData))
      .run();
  });

  /**
   * @brief Test the primary saga listener for projectsAdminSaga.
   */
  test('projectsAdminSaga', () => {
    testSaga(projectsAdminSaga);
  });
  /**
   * @brief Test the worker saga for projectsAdminSaga.
   */
  test('workGetProjectsAdminFetch', () => {
    testSaga(workGetProjectsAdminFetch);
  });
});
