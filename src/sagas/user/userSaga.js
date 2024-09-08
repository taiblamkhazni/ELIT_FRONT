/**
 * @file userSaga.js
 * @brief This file contains sagas related to User operations.
 */

import { getAvatarByUserIdApi, getUserById } from "hooks/apis/UserApi";
import {
  getUserAvatarSuccess,
  getUserInfoByIdSuccess,
} from "reducers/user/userReducer";
import { call, put, takeEvery } from "redux-saga/effects";
import { Snackbar } from "utils/Snackbar/Snackbar";

/**
 * Saga function for fetching user information by ID.
 *
 * @param data - The user data object containing the user ID.
 * @brief Fetch user information by ID.
 */
export function* workGetUserInfoByIdFetch(data) {
  /** Logging for debugging purposes*/
  try {
    const user = yield call(() => getUserById(data.payload));
    if (user) {
      yield put(getUserInfoByIdSuccess(user));
    }
  } catch (error) {
    /** Handle errors and display a snackbar notification*/
    Snackbar(
      "error",
      "An error occurred while fetching user information by ID (new API)!"
    );
  }
}

/**
 * Saga function for fetching user avatar by ID.
 *
 * @param data - The user data object containing the user ID.
 * @brief Fetch user avatar by ID.
 */
export function* workGetUserAvatarFetch(data) {
  try {
    const url = yield call(() => getAvatarByUserIdApi(data.payload));
    yield put(getUserAvatarSuccess(url));
  } catch (error) {
    // Handle errors and display a snackbar notification
    Snackbar(
      "error",
      "An error occurred while fetching the user's avatar by ID!"
    );
  }
}

/**
 * Main User Saga that listens for actions.
 * @brief Listen for "getUserInfoByIdFetch" and "getUserAvatarFetch" actions.
 */
export function* userSaga() {
  /** @brief Listen for the "getUserInfoByIdFetch" and "getUserAvatarFetch" actions*/
  yield takeEvery("userReducer/getUserInfoByIdFetch", workGetUserInfoByIdFetch);
  yield takeEvery("userReducer/getUserAvatarFetch", workGetUserAvatarFetch);
}
