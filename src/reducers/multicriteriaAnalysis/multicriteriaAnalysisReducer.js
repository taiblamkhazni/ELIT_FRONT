/**
 * @file multicriteriaAnalysisReducer.js
 * @brief Ce fichier définit le reducer de multicriteria analysis.
 */
import { createSlice } from "@reduxjs/toolkit"

export const multicriteriaAnalysisReducer = createSlice({
    name: "multicriteriaAnalysisReducer",
    initialState: {
        isFinished: false,
        multiCriteriaAnalysisId: null,
        current: 1,
        editQuestionRef: null,
        isLoadingFullPage: false,
        isIteration2AP: false,
        isLoadingReport: false,
        analyseMulticriteresResult: null,
        listStepweights: null,
    },
    reducers: {
        setId: (state, action) => {
            state.multiCriteriaAnalysisId = action.payload
        },
        setIsFinished: (state, action) => {
            state.isFinished = action.payload
        },
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        setEditQuestionRef: (state, action) => {
            state.editQuestionRef = action.payload
        },
        setIsLoadingFullPage: (state, action) => {
            state.isLoadingFullPage = action.payload
        },
        setIsIteration2AP: (state, action) => {
            state.isIteration2AP = action.payload
        },
        setIsLoadingReport: (state, action) => {
            state.isLoadingReport = action.payload
        },
        getResultsMultiByProjectIdFetch: (state) => {
            return state
        },
        getResultsMultiByProjectIdSuccess: (state, action) => {
            state.analyseMulticriteresResult = action.payload
        },
        setListStepweights: (state, action) => {
            state.listStepweights = action.payload
        }
    },
})

export const {
    setId,
    setIsFinished,
    setCurrent,
    setFormSteps,
    setEditQuestionRef,
    setIsLoadingFullPage,
    setIsIteration2AP,
    setIsLoadingReport,
    getResultsMultiByProjectIdFetch,
    getResultsMultiByProjectIdSuccess,
    setListStepweights
} = multicriteriaAnalysisReducer.actions
export default multicriteriaAnalysisReducer.reducer
