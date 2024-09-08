/**
 * @file previsibilityAnalysisReducer.js
 * @brief Ce fichier définit le reducer de previsibility Analysis.
 */
import { createSlice } from "@reduxjs/toolkit"

export const previsibilityAnalysisReducer = createSlice({
    name: "previsibilityAnalysisReducer",
    initialState: {
        id: null,
        iteration: null,
        votes: [],
        isLoading: false,
        current: 0,
        percentages: 0,
        methodologies: null,
        elementalEscores: null,
        isFinished: false,
        isLoadingReport: false,
        isHavingComments: false,
        isLoadingApResult: false,
        isUpdateQuestion:false,
        isBrainStorming:false,
    },
    reducers: {
        getIdPreviAnalysisFetch: (state) => {
            state.isLoading = false
        },
        getIdPreviAnalysisSuccess: (state, action) => {
            state.id = action.payload
            state.isLoading = true
        },
        getIteration: (state, action) => {
            state.iteration = action.payload
        },
        setIsBrainStorming: (state, action) => {
            state.isBrainStorming = action.payload
        },
        inscreaseIterationFetch: (state) => {
            return state
        },
        inscreaseIterationSuccess: (state) => {
            state.iteration = state.iteration + 1
        },
        getVotesFetch: (state) => {
            return state
        },
        getVotesSuccess: (state, action) => {
            state.votes = action.payload
        },
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        runFirstIterationAP: (state) => {
            return state
        },
        getResultsFetch: (state) => {
            return state
        },
        getPercentageSuccess: (state, action) => {
            state.percentages = action.payload
        },
        getMethodologiesSuccess: (state, action) => {
            state.methodologies = action.payload
        },
        getElementalEscoresSuccess: (state, action) => {
            state.elementalEscores = action.payload
        },
        setFinished: (state, action) => {
            state.isFinished = action.payload
        },
        setIsLoadingReport: (state, action) => {
            state.isLoadingReport = action.payload
        },
        setIsHavingComments: (state, action) => {
            state.isHavingComments = action.payload
        },
        setIsUpdateQuestion: (state, action) => {
            state.isUpdateQuestion = action.payload
        },
        setIsLoadingApResult: (state, action) => {
            state.isLoadingApResult = action.payload
        },
    },
})

export const {
    getIdPreviAnalysisFetch,
    getIdPreviAnalysisSuccess,
    getIteration,
    getVotesFetch,
    getVotesSuccess,
    setCurrent,
    inscreaseIterationFetch,
    inscreaseIterationSuccess,
    runFirstIterationAP,
    getPercentageSuccess,
    getMethodologiesSuccess,
    getElementalEscoresSuccess,
    setFinished,
    getResultsFetch,
    setIsLoadingReport,
    setIsHavingComments,
    setIsUpdateQuestion,
    setIsLoadingApResult,
    setIsBrainStorming
} = previsibilityAnalysisReducer.actions

export default previsibilityAnalysisReducer.reducer
