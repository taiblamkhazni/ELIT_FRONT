/**
 * @file weightPieSlice.js
 * @brief Ce fichier contient la création du slice redux: weightPieSlice.
 */
import { createSlice } from "@reduxjs/toolkit"

const weightPieSlice = createSlice({
    name: "weightPie",
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
        asBase64WeightImage: (state, action) => {
            let payload = action.payload
            switch (action.payload.name) {
            case "Spécificité":
                state.specificite.base64 = payload.value
                break
            case "Certitude":
                state.certitude.base64 = payload.value
                break
            case "Manoeuvrabilité":
                state.manoeuvrabilite.base64 = payload.value
                break
            default:
                break
            }
        },
        initiateAllStateWeight: (state)=>{
            state.specificite.base64=""
            state.certitude.base64=""
            state.manoeuvrabilite.base64=""
        }
    }
})

export const { asBase64WeightImage, initiateAllStateWeight } = weightPieSlice.actions
export default weightPieSlice.reducer