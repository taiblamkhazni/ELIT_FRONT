/**
 * @file multicriteriaAnalysisSaga.js
 * @brief Ce fichier contient les sagas liées à MulticriteriaAnalysis.
 */
import { GetAnalyseMulticriteByProjectId } from "hooks/apis/AnalyseMulticritereApi"
import { getResultsMultiByProjectIdSuccess } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer"
import { call, put, takeLatest } from "redux-saga/effects"
/**
 * workGetResultsMultiByProjectIdFetch
 * @brief Handles fetching results for multicriteria analysis by project ID.
 * @param data Contains the project ID.
 */
export function* workGetResultsMultiByProjectIdFetch(data) {

    const res = yield call(() => GetAnalyseMulticriteByProjectId(data.payload))
    yield put(getResultsMultiByProjectIdSuccess(res))
}
/**
 * multicriteriaAnalysisSaga
 * @brief Main saga watcher for multicriteria analysis actions.
 */
export function* multicriteriaAnalysisSaga() {
    yield takeLatest(
        "multicriteriaAnalysisReducer/getResultsMultiByProjectIdFetch",
        workGetResultsMultiByProjectIdFetch
    )
}

