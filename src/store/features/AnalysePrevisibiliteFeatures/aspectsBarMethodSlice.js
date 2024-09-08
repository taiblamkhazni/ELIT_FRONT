/**
 * @file aspectsBarMethodSlice.js
 * @brief Ce fichier définit le reducer aspectsBarMethod.
 */
import { createSlice } from "@reduxjs/toolkit"

export const aspectsBarMethod = createSlice({
    name: "aspectsBarMethod",
    initialState: {
        base64: ""
    },
    reducers: {
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = aspectsBarMethod.actions
export default aspectsBarMethod.reducer