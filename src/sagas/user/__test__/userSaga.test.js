/**
 * @file userSaga.test.js
 * @brief Ce fichier contient les tests sagas liées au User.
 */

/**
 * @brief Importation des APIs utilisées pour User.
 */
import { getAvatarByUserIdApi, getUserById } from "hooks/apis/UserApi";
import { call, takeEvery } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import {
  avatarDataFake,
  avatarUrl,
  userDataFake,
  userFake,
} from "sagas/fakeDataSagas/fakeDataSagas";

/**
 * @brief Importation des sagas à tester.
 */
import {
  userSaga,
  workGetUserAvatarFetch,
  workGetUserInfoByIdFetch,
} from "../userSaga";

/**
 * @brief Test suite pour userSaga.
 */
describe("userSaga", () => {
  let generator;
  /**
   * @brief Set up mocks and configure the initial state before each test.
   */
  beforeEach(() => {
    generator = userSaga();
  });

  /** @brief Test to detect if saga function is listening to the getUserInfoByIdFetch action. */
  it("should listen action getUserInfoByIdSuccess", () => {
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery("userReducer/getUserInfoByIdFetch", workGetUserInfoByIdFetch)
    );
  });

  /** @brief Test to detect if saga function is listening to the getUserAvatarFetch action. */
  it("should listen action getAvatarByUserIdApi", () => {
    generator.next();
    const takeLatestEffect = generator.next().value;
    expect(takeLatestEffect).toEqual(
      takeEvery("userReducer/getUserAvatarFetch", workGetUserAvatarFetch)
    );
  });

  /** @brief Test to see if the API call for getUserInfoByIdFetch works. */
  it("should trigger getUserInfoByIdFetch", () => {
    expectSaga(workGetUserInfoByIdFetch, userDataFake)
      .provide([[call(getUserById, userDataFake.payload), userFake]])
      .run();
  });

  /** @brief Test to see if the API call for getUserAvatarFetch works. */
  it("should trigger getUserAvatarFetch", () => {
    expectSaga(workGetUserAvatarFetch, avatarDataFake)
      .provide([
        [call(getAvatarByUserIdApi, avatarDataFake.payload), avatarUrl],
      ])
      .run();
  });

  /** @brief Test to see if the saga is triggered for the action getUserInfoByIdFetch. */
  it("should trigger getUserInfoByIdFetch", () => {
    return expectSaga(userSaga)
      .dispatch({
        type: "userReducer/getUserInfoByIdFetch",
        payload: userDataFake.payload,
      })
      .run();
  });

  /** @brief Test to see if the saga is triggered for the action getUserAvatarFetch. */
  it("should trigger getUserAvatarFetch", () => {
    return expectSaga(userSaga)
      .dispatch({
        type: "userReducer/getUserAvatarFetch",
        payload: userDataFake.payload,
      })
      .run();
  });
});
