/**
 * @file executionPlanReducer.js
 * @brief Ce fichier définit le reducer executionPlanReducer.
 */
import { createSlice } from "@reduxjs/toolkit"

export const executionPlanReducer = createSlice({
    name: "executionPlanReducer",
    initialState: {
        idPlanExecution: null,
        current: 1,
        listQuestions: [],
        voteMethod: [],
        methodologiesArray: null,
        choosenMethodology: null,
        votes: null,
        results: null,
        isFinished: false,
        isLoading: true,
        reportDownload: false,
        isLoadingReport: false,
        inputForm: [],
        vote2MethodsHyBrid: [],
    },
    
    reducers: {
        // current
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        setIsFinished: (state, action) => {
            state.isFinished = action.payload
        },
        // list questions
        getListQuestionsFetch: (state) => {
            state.isLoading = true
        },
        getListQuestionsSuccess: (state, action) => {
            state.listQuestions = action.payload
            state.isLoading = false
        },
        getListQuestionsFailure: (state) => {
            state.isLoading = false
        },
        // vote method
        setVoteMethod: (state, action) => {
            state.voteMethod = action.payload
        },
        // methodologiesArray
        getMethodologiesArrayFetch: (state) => {
            state.isLoading = true
        },
        getMethodologiesArraySuccess: (state, action) => {
            state.methodologiesArray = action.payload
            state.isLoading = false
        },
        getMethodologiesArrayFailure: (state) => {
            state.isLoading = false
        },
        // methodology
        setMethodology: (state, action) => {
            state.choosenMethodology = action.payload
        },
        // results
        getResultsFetch: (state) => {
            state.isLoading = true
            return state
        },
        getResultsSuccess: (state, action) => {
            state.results = action.payload
            state.isFinished = true
            state.isLoading = false
        },
        getResultsFailure: (state) => {
            state.isLoading = false
        },
        setReportDownload: (state, action) => {
            state.reportDownload = action.payload
        },
        setIdPlanExecution: (state, action) => {
            state.idPlanExecution = action.payload
        },
        setIsFinishedPlanExecu: (state, action) => {
            state.isFinished = action.payload
        },
        setIsLoadingReport: (state, action) => {
            state.isLoadingReport = action.payload
        },
        getNewPlanExecutionFetch: (state) => {
            return state
        },
        getNewPlanExecutionSuccess: (state, action) => {
            state.idPlanExecution = action.payload
        },
        setInputForm: (state, action) => {
            state.inputForm = [...state.inputForm, action.payload]
        },
        setVote2MethodsHyBrid: (state, action) => {
            state.vote2MethodsHyBrid = action.payload
        },
    },
})

export const {
    getListQuestionsFetch,
    getListQuestionsSuccess,
    getListQuestionsFailure,
    setVoteMethod,
    setMethodology,
    getMethodologiesArrayFetch,
    getMethodologiesArraySuccess,
    getMethodologiesArrayFailure,
    getResultsFetch,
    getResultsSuccess,
    getResultsFailure,
    setReportDownload,
    setIdPlanExecution,
    setIsFinishedPlanExecu,
    setIsLoadingReport,
    getNewPlanExecutionFetch,
    getNewPlanExecutionSuccess,
    setInputForm,
    setVote2MethodsHyBrid,
    setCurrent
} = executionPlanReducer.actions

export default executionPlanReducer.reducer
