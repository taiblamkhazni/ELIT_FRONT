/**
 * @file brainStormingResumeSaga.js
 * @brief Ce fichier contient les sagas liées à BrainStormingResume.
 *
 */

import { AddCommentBrainstorming, DeleteCommentByCommentId, GetBrainStormingByIdAL,GetBrainStormingResumeByIdAL, ModifyCommentBrainstorming } from "hooks/apis/Brainstorming"
import { getBrainStormingResumeSuccess, getBrainStormingSuccess } from "reducers/brainStormingResume/brainStormingResumeReducer"
import { call, put, takeEvery } from "redux-saga/effects"
/**
 * workBrainStormingResumeSaga
 * @brief Saga to handle fetching a BrainStorming Resume for a given idAL and projectId.
 * @param {Object} data Contains idAL and projectId necessary for the API call.
 */
export function* workBrainStormingResumeSaga(data) {
    const { idAL, projectId } = data.payload
    const response = yield call(() => GetBrainStormingResumeByIdAL(idAL, projectId))
    yield put(getBrainStormingResumeSuccess(response))
}

/**
 * workBrainStormingSaga
 * @brief Saga to handle fetching a BrainStorming for a given idAL and projectId.
 * @param {Object} data Contains idAL and projectId necessary for the API call.
 */
export function* workBrainStormingSaga(data) {
    const { idAL, projectId } = data.payload
    const response = yield call(() => GetBrainStormingByIdAL(idAL, projectId))
    yield put(getBrainStormingSuccess(response))
}
/**
 * @brief Saga to handle adding a new BrainStorming comment.
 * @param {Object} data Contains data and projectId necessary for the API call.
 */
export function* workNewBrainStormingSaga(data) {
     yield call(() => AddCommentBrainstorming(data.payload.data, data.payload.projectId))
    const response = yield call(() => GetBrainStormingByIdAL(data.payload.idAL, data.payload.projectId))
    yield put(getBrainStormingSuccess(response))
}
/**
 * @brief Saga to handle modifying an existing BrainStorming comment.
 * @param {Object} data Contains data and projectId necessary for the API call.
 */
export function* workPutBrainStormingSaga(data) {
    yield call(() => ModifyCommentBrainstorming(data.payload.data, data.payload.projectId))
   const response = yield call(() => GetBrainStormingByIdAL(data.payload.idAL, data.payload.projectId))
   yield put(getBrainStormingSuccess(response))
}
/**
 * @brief Saga to handle deleting a BrainStorming comment by its ID.
 * @param {Object} data Contains commentId and projectId necessary for the API call.
 */
export function* workDeleteBrainStormingSaga(data) {
    yield call(() => DeleteCommentByCommentId(data.payload.commentId, data.payload.projectId))
   const response = yield call(() => GetBrainStormingByIdAL(data.payload.idAL, data.payload.projectId))
   yield put(getBrainStormingSuccess(response))
}

/**
 * brainStormingResumeSaga
 * @brief Primary saga listener for BrainStormingResume-related actions.
 */
export function* brainStormingResumeSaga() {
    yield takeEvery(
        "brainStormingResumeReducer/getBrainStormingResumeFetch",
        workBrainStormingResumeSaga
    )
    yield takeEvery(
        "brainStormingResumeReducer/getBrainStormingFetch",
        workBrainStormingSaga
    )
    yield takeEvery(
        "brainStormingResumeReducer/postBrainStormingFetch",
        workNewBrainStormingSaga
    )
    yield takeEvery(
        "brainStormingResumeReducer/putBrainStormingFetch",
        workPutBrainStormingSaga
    )
    yield takeEvery(
        "brainStormingResumeReducer/deleteBrainStormingFetch",
        workDeleteBrainStormingSaga
    )
}
