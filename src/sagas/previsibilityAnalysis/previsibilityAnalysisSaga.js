/**
 * @file previsibilityAnalysisSaga.js
 * @brief Ce fichier contient les sagas liées à PrevisibilityAnalysis.
 */
import { numberIterationMaximum } from "common/injectGlobals"
import {
    createAnalysePrevisibilite,
    getAllVotesByAnalysePrevisibilityId,
    getResultPrevisibilite,
    updateIterationPrevisibility,
    updateStatusAnalysePrevisibility,
} from "hooks/apis/AnalysePrevisibiliteApi";
import {
    getElementalEscoresSuccess,
    getIdPreviAnalysisSuccess,
    getIteration,
    getMethodologiesSuccess,
    getPercentageSuccess,
    getVotesSuccess,
    inscreaseIterationFetch,
    inscreaseIterationSuccess,
    setCurrent,
    setFinished,
    setIsLoadingApResult,
} from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

/**
 * @brief Selects the project ID from the project reducer.
 * @param state The global state.
 * @return The project ID.
 */
export const selectProject = (state) => state.projectReducer.projectId;

/**
 * workGeneratingPreviAnalysisFetch
 * @brief Handles generating the analysis for previsibility.
 */
export function* workGeneratingPreviAnalysisFetch() {
    const projectId = yield select(selectProject)
    const res = yield call(() => createAnalysePrevisibilite(projectId))
    const apId = yield res.data
    yield put(getIdPreviAnalysisSuccess(apId))
    yield put(getIteration(1))
}
/**
 * workGetResultsAnalyse
 * @brief Retrieves the results for an analysis.
 * @param data Contains the analysis and project IDs.
 */
export function* workGetResultsAnalyse(data) {
    const { analyseId, projectId } = data.payload
    yield put(setIsLoadingApResult(true))
    const results = yield call(() => getResultPrevisibilite(analyseId, projectId))
    if (results) {
        yield put(setIsLoadingApResult(false))
    }
    const average = results.average * 100
    yield put(getPercentageSuccess(average))
    yield put(getMethodologiesSuccess(results.methodologies))
    yield put(
        getElementalEscoresSuccess(
            results.formSteps
                .sort((a, b) => {
                    if (a.stepRef > b.stepRef) {
                        return 1
                    }
                    return -1
                })
                .map((s) => {
                    return { stepName: s.stepName, escore: s.escore }
                })
        )
    )
}
/**
 * workRunAnaPreFirstIteration
 * @brief Handles the first iteration for an analysis.
 * @param data Contains the analysis and project IDs.
 */
export function* workRunAnaPreFirstIteration(data) {
    const { analyseId, projectId } = data.payload
    const results = yield call(() => getResultPrevisibilite(analyseId, projectId))
    const average = results.average * 100
    yield put(getPercentageSuccess(average))
    yield put(getMethodologiesSuccess(results.methodologies))
    yield put(
        getElementalEscoresSuccess(
            results.formSteps
                .sort((a, b) => {
                    if (a.stepRef > b.stepRef) {
                        return 1
                    }
                    return -1
                })
                .map((s) => {
                    return { stepName: s.stepName, escore: s.escore }
                })
        )
    )
    const iterationAP = yield select(
        (state) => state.previsibilityAnalysisReducer.iteration
    )

    if (average < 50) {
        if (iterationAP < parseInt(numberIterationMaximum)) {
            yield put(inscreaseIterationFetch(data.payload))
            yield put(setCurrent(1))
        } else if (parseInt(iterationAP) === parseInt(numberIterationMaximum)) {
            yield call(() => updateStatusAnalysePrevisibility(analyseId, projectId))
            yield put(setCurrent(1))
            yield put(setFinished(true))
        }
    }

    if (average >= 50) {
        yield call(() => updateStatusAnalysePrevisibility(analyseId, projectId))
        yield put(setFinished(true))
        yield put(setCurrent(1))
    }
}
/**
 * @brief Handles upgrading the iteration.
 * @param data Contains the analysis and project IDs.
 */
export function* workUpgradeInteration(data) {
    const { analyseId, projectId } = data.payload
    yield call(() => updateIterationPrevisibility(analyseId, projectId))
    yield put(inscreaseIterationSuccess())
}
/**
 * @brief Retrieves votes by analysis ID.
 * @param data Contains the vote and project IDs.
 */
export function* workGetVotesByIdAP(data) {
    const votes = yield call(() =>
        getAllVotesByAnalysePrevisibilityId(data.payload)
    )
    yield put(getVotesSuccess(votes))
}
/**
 * @brief Main saga watcher for previsibility analysis actions.
 */
export function* previsibilityAnalysisSaga() {
    yield takeLatest(
        "previsibilityAnalysisReducer/getIdPreviAnalysisFetch",
        workGeneratingPreviAnalysisFetch
    )
    yield takeEvery(
        "previsibilityAnalysisReducer/getVotesFetch",
        workGetVotesByIdAP
    )
    yield takeEvery(
        "previsibilityAnalysisReducer/runFirstIterationAP",
        workRunAnaPreFirstIteration
    )
    yield takeLatest(
        "previsibilityAnalysisReducer/inscreaseIterationFetch",
        workUpgradeInteration
    )
    yield takeEvery(
        "previsibilityAnalysisReducer/getResultsFetch",
        workGetResultsAnalyse
    )
}

