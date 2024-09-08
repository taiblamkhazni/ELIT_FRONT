/**
 * @file brainStormingResumeReducer.js
 * @brief Ce fichier définit le composant brainStormingResumeReducer.
 */
import { createSlice } from "@reduxjs/toolkit"

const brainStormingResumeReducer = createSlice({
    name: "brainStormingResumeReducer",
    initialState: {
        isLoading: false,
        brainStormingResume: [],
        isLoadingBrainstorming:false,
        brainStorming:[]
    },
    reducers: {
        getBrainStormingResumeFetch: (state) => {
            state.isLoading = true
            return state
        },
        getBrainStormingResumeSuccess: (state, action) => {
            state.isLoading = false
            state.brainStormingResume = action.payload
        },
        getBrainStormingFetch: (state) => {
            state.isLoadingBrainstorming = true
            return state
        },
        getBrainStormingSuccess: (state, action) => {
            state.isLoadingBrainstorming = false
            state.brainStorming = action.payload
        },
        postBrainStormingFetch: (state) => {
            state.isLoadingBrainstorming = true
            return state
        },
        putBrainStormingFetch: (state) => {
            state.isLoadingBrainstorming = true
            return state
        },
        deleteBrainStormingFetch: (state) => {
            state.isLoadingBrainstorming = true
            return state
        }
        
    }
})

export const {
    getBrainStormingResumeFetch,
    getBrainStormingResumeSuccess,
    getBrainStormingFetch,
    getBrainStormingSuccess,
    postBrainStormingFetch,
    putBrainStormingFetch,
    deleteBrainStormingFetch
} = brainStormingResumeReducer.actions

export default brainStormingResumeReducer.reducer