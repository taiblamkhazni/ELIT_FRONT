/**
 * @file projectReducer.js
 * @brief Ce fichier définit le reducer du composant project.
 */
import { createSlice } from "@reduxjs/toolkit"

export const projectReducer = createSlice({
    name: "projectReducer",
    initialState: {
        project: null,
        isLoading: true,
        projectId: null,
        resultsMulti: null,
        currentUser: null,
        currentUserRole: null,
        reportsList: null,
        reportsNumber: {
            multicriteria_report: 0,
            predictibility_report: 0,
            execution_report: 0,
        },
        checkUserIsObservateur: false,
        attachments: null,
    },
    reducers: {
        getProjectFetch: (state) => {
            state.isLoading = true
        },
        getProjectSuccess: (state, action) => {
            state.project = action.payload
            state.isLoading = false
        },
        getProjectFailure: (state) => {
            state.isLoading = false
        },
        setProjectId: (state, action) => {
            state.projectId = action.payload
        },
        getResultsMultiFetch: (state) => {
            return state
        },
        getResultsMultiFetchSuccess: (state, action) => {
            state.resultsMulti = action.payload
        },
        getCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        getCurrentUserRole: (state, action) => {
            state.currentUserRole = action.payload
        },
        getReportsListFetch: (state) => {
            return state
        },
        getReportsListSuccess: (state, action) => {
            state.reportsList = action.payload
        },
        setReportsNumber: (state, action) => {
            state.reportsNumber[action.payload.type] = action.payload.data
        },
        setCheckUserIsObservateur: (state, action) => {
            state.checkUserIsObservateur = action.payload
        },
        getAttachementsProjectById: (state) => { return state },
        setAttachements: (state, action) => {
            state.attachments = action.payload
        },
        addContributor: (state, action) => {
            state.project = state.project || {};
            if (state.project.contributors?.length > 0) {
                state.project.contributors.push(action.payload);
            } else {
                state.project.contributors = [action.payload]
            }
        },
        deleteContributor: (state, action) => {
            state.project = state.project || {};
            state.project.contributors = state.project.contributors?.filter((colab) => colab.contributerId !== action.payload)
        },
    },
})

export const {
    getProjectFetch,
    getProjectSuccess,
    getProjectFailure,
    setProjectId,
    getResultsMultiFetch,
    getResultsMultiFetchSuccess,
    getCurrentUser,
    getCurrentUserRole,
    getReportsListFetch,
    getReportsListSuccess,
    setReportsNumber,
    setCheckUserIsObservateur,
    setAttachements,
    getAttachementsProjectById,
    addContributor,
    deleteContributor
} = projectReducer.actions

export default projectReducer.reducer
