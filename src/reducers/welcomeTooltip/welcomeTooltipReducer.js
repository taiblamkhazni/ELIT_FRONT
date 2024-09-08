/**
 * @file welcomeTooltipReducer.js
 * @brief This module exports the welcomeTooltipReducer component.
 */
import { createSlice } from "@reduxjs/toolkit"
/**
 * @var welcomeTooltipReducer
 * @brief welcomeTooltipReducer.
 */
export const welcomeTooltipReducer = createSlice({
    name: "welcomeTooltipReducer",
    initialState: {
        stageNumber: -1,
    },
    reducers: {
        setStageNumberWelcomeTooltip: (state) => {
            state.stageNumber++
        },
        setStageNumberWelcomeTooltipEnd: (state, action) => {
            state.stageNumber = action.payload
        },
    },
})
/**
 * @var welcomeTooltipReducer.actions
 * @brief welcomeTooltipReducer.actions.
 */
export const { setStageNumberWelcomeTooltip, setStageNumberWelcomeTooltipEnd } = welcomeTooltipReducer.actions
/**
 * @var welcomeTooltipReducer.reducer
 * @brief welcomeTooltipReducer.reducer.
 */
export default welcomeTooltipReducer.reducer
