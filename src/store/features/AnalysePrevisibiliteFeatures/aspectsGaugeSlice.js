/**
 * @file aspectsGaugeSlice.js
 * @brief Ce fichier définit le reducer aspectsGauge.
 */
import { createSlice } from "@reduxjs/toolkit"

export const aspectsGauge = createSlice({
    name: "aspectsGauge",
    initialState: {
        base64: ""
    },
    reducers: {
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = aspectsGauge.actions
export default aspectsGauge.reducer