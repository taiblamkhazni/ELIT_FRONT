/**
 * @file projectsAdminReducer.js
 * @brief This file contains the reducer and actions for managing the administration of projects.
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * @brief Reducer slice for project administration.
 *
 * This slice handles the state and actions related to the administration of projects.
 * It uses Redux Toolkit's createSlice to simplify the state management.
 */
const projectsAdminReducer = createSlice({
    /**
     * @brief Name of the reducer slice.
     */
    name: "projectsAdminReducer",
    /**
     * @brief Initial state of the projects administration slice.
     *
     * The initial state contains an empty array of projects.
     */
    initialState: {
        projects: []
    },
    /**
     * @brief Reducers and actions for the projects administration.
     *
     * Includes actions for fetching project data and successfully retrieving project data.
     */
    reducers: {
        /**
         * @brief Action for initiating the fetching of project administration data.
         *
         * This action doesn't alter the state, it's used to trigger the data fetching process.
         *
         * @param state The current state of the reducer.
         * @return The unaltered state.
         */
        getProjectsAdminFetch: (state)=>{
            return state
        },
        /**
         * @brief Action for handling the successful retrieval of project administration data.
         *
         * This action updates the state with the retrieved projects.
         *
         * @param state The current state of the reducer.
         * @param action The action object, containing the payload with the project data.
         */
        getProjectsAdminSuccess: (state, action)=>{
            state.projects = action.payload
        }
    }
})

/**
 * @brief Exporting the actions from the projects administration reducer.
 */
export const {
    getProjectsAdminFetch,
    getProjectsAdminSuccess
} = projectsAdminReducer.actions
/**
 * @brief Default export of the reducer function from the projects administration slice.
 */
export default projectsAdminReducer.reducer
