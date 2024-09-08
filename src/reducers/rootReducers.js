/**
 * @file rootReducers.js
 * @brief This module exports the rootReducers.
 */
import { combineReducers } from "@reduxjs/toolkit"

import projectsAdminReducer from "./admin/projects/projectsAdminReducer"
import authentificationReducer from "./authentification/authentificationReducer"
import brainStormingResumeReducer from "./brainStormingResume/brainStormingResumeReducer"
import executionPlanReducer from "./executionPlan/executionPlanReducer"
import graphsReducer from "./graphs/graphsReducer"
import multicriteriaAnalysisReducer from "./multicriteriaAnalysis/multicriteriaAnalysisReducer"
import previsibilityAnalysisReducer from "./previsibilityAnalysis/previsibilityAnalysisReducer"
import projectReducer from "./project/projectReducer"
import projectsReducer from "./projects/projectsReducer"
import userReducer from "./user/userReducer"
import welcomeTooltipReducer from "./welcomeTooltip/welcomeTooltipReducer"

/**
 * @var rootReducers
 * @brief Reducers to export.
 */
const rootReducers = combineReducers({
    ...graphsReducer,
    projectsReducer,
    projectReducer,
    executionPlanReducer,
    multicriteriaAnalysisReducer,
    previsibilityAnalysisReducer,
    authentificationReducer,
    projectsAdminReducer,
    brainStormingResumeReducer,
    welcomeTooltipReducer,
    userReducer
})

export default rootReducers