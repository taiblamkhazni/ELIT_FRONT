/**
 * @file methodsBarSlice.js
 * @brief Redux slice for managing the methods bar state.
 *
 * This module defines a Redux slice named 'methodsBar'. It manages the state related to the methods bar,
 * particularly handling the base64 encoding of certain data. The slice provides actions and reducers
 * to manipulate the state in a Redux store.
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * @brief Creates a slice for methods bar state management.
 *
 * The slice includes an initialState object defining the initial state, and reducers to handle state changes.
 */
export const methodsBarSlice = createSlice({
    name: "methodsBar",
    initialState: {
        base64: ""
    },
  /**
   * Reducer to set the base64 state.
   *
   * @param {object} state - The current state of the slice.
   * @param {object} action - The dispatched action containing the payload.
   */
    reducers: {
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = methodsBarSlice.actions
export default methodsBarSlice.reducer
