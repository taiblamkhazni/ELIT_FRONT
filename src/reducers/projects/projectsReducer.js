/**
 * @file projectsReducer.js
 * @brief Ce fichier contient le composant projectsReducer.
 */

import { createSlice } from "@reduxjs/toolkit"

export const projectsReducer = createSlice({
    name: "projectsReducer",
    initialState: {
        projects: [],
        isLoading: true,
        showMessageCreationModal: false,
        showMessageCreationModalPlus: false
    },
    reducers: {
        getProjectsFetch: (state) => {
            state.isLoading = true
        },
        getProjectsSuccess: (state, action) => {
            state.projects = action.payload
            state.isLoading = false
        },
        getProjectsFailure: (state) => {
            state.isLoading = false
        },
        postNewProjectFetch: (state) => {
            return state
        },
        postNewProjectSuccess: (state, action) => {
            state.projects = [...state.projects, action.payload]
        },
        postUpdateProjectFetch: (state) => {
            return state
        },
        postUpdateProjectSuccess: (state, action) => {
            const updatedProjectIndex = state.projects.findIndex(e => e.projectId === action.payload.projectId);
            if (updatedProjectIndex >= 0) {
                state.projects[updatedProjectIndex].name = action.payload.name;
                state.projects[updatedProjectIndex].description = action.payload.description;
            }
        },
        deleteProjectFetch: (state) => {
            return state
        },
        deleteProjectSuccess: (state, action) => {
            // action.pay is project id
            const newProjectList = state.projects.filter(e => e.projectId !== action.payload)
            state.projects = [...newProjectList]
        },
        showProjectCreationSuccessModal : (state) => {
            state.showMessageCreationModal= true
        },
        closeProjectCreationModal : (state) => {
            state.showMessageCreationModal= false
        },
        showProjectCreationSuccessModalPlus : (state) => {
            state.showMessageCreationModalPlus= true
        },
        closeProjectCreationModalPlus : (state) => {
            state.showMessageCreationModalPlus= false
        }
    }
})

export const {
    getProjectsFetch,
    getProjectsSuccess,
    getProjectsFailure,
    postNewProjectFetch,
    postNewProjectSuccess,
    postUpdateProjectFetch,
    postUpdateProjectSuccess,
    deleteProjectFetch,
    deleteProjectSuccess,
    showProjectCreationSuccessModal,
    closeProjectCreationModal,
    showProjectCreationSuccessModalPlus,
    closeProjectCreationModalPlus
} = projectsReducer.actions

export default projectsReducer.reducer