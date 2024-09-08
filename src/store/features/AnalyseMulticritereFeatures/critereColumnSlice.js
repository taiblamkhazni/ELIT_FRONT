/**
 * @file critereColumnSlice.js
 * @brief Ce fichier contient la création du slice redux: critereColumnSlice.
 */
import { createSlice } from "@reduxjs/toolkit"

export const critereColumnSlice = createSlice({
    name: "critereColumn",
    initialState: {
        specificite: {
            base64: ""
        },
        certitude: {
            base64: ""
        },
        manoeuvrabilite: {
            base64: ""
        }
    },
    reducers: {
        asBase64: (state, action) => {
            let column = action.payload
            switch (action.payload.name) {
            case "Spécificité":
                state.specificite.base64 = column.value
                break
            case "Certitude":
                state.certitude.base64 = column.value
                break
            case "Manoeuvrabilité":
                state.manoeuvrabilite.base64 = column.value
                break
            default:
                break
            }
        },
        initiateAllState: (state)=>{
            state.specificite.base64=""
            state.certitude.base64=""
            state.manoeuvrabilite.base64=""
        }
    }
})

export const { asBase64, initiateAllState } = critereColumnSlice.actions
export default critereColumnSlice.reducer