/**
 * @file methodsPieSlice.js
 * @brief Redux slice for managing the methods pie chart state.
 *
 * This module defines a Redux slice named 'methodsPie'. It manages the state related to the methods pie chart,
 * particularly for handling base64 encoding of the chart data. The slice includes actions and reducers
 * for updating the state in the Redux store.
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * @brief Creates a slice for methods pie chart state management.
 *
 * The slice includes an initialState object that defines the initial state, and reducers to handle changes to the state.
 */
export const methodsPieSlice = createSlice({
    name: "methodsPie",
    initialState: {
        base64: ""
    },
    reducers: {
      /**
       * Reducer to set the base64 state for the pie chart.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The dispatched action containing the payload.
       */
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = methodsPieSlice.actions
export default methodsPieSlice.reducer
