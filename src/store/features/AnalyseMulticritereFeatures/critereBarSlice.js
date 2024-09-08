/**
 * @file critereBarSlice.js
 * @brief Ce fichier contient la création du slice redux: criteBarSlice.
 */
import { createSlice } from "@reduxjs/toolkit"

export const criteBarSlice = createSlice({
    name: "critereBar",
    initialState: {
        base64: ""
    },
    reducers: {
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = criteBarSlice.actions
export default criteBarSlice.reducer