/**
 * @file rootSaga.js
 * @brief This file configures the root saga for the application.
 */
import { all } from "redux-saga/effects"

import { projectsAdminSaga } from "./admin/projectsAdminSaga"
import { brainStormingResumeSaga } from "./brainStormingResume/brainStormingResumeSaga"
import { executionPlanSaga } from "./executionPlan/executionPlanSaga"
import { multicriteriaAnalysisSaga } from "./multicriteriaAnalysis/multicriteriaAnalysisSaga"
import { previsibilityAnalysisSaga } from "./previsibilityAnalysis/previsibilityAnalysisSaga"
import { projectSaga } from "./project/projectSaga"
import { projectsSaga } from "./projects/projectsSaga"
import { userSaga } from "./user/userSaga"

/**
 * @function rootSaga Root saga that combines all individual sagas.
 */
function* rootSaga() {
    yield all([
        projectsSaga(),
        projectSaga(),
        executionPlanSaga(),
        previsibilityAnalysisSaga(),
        projectsAdminSaga(),
        brainStormingResumeSaga(),
        multicriteriaAnalysisSaga(),
        userSaga(),
    ])
}
export default rootSaga
