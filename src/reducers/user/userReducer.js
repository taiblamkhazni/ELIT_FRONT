/**
 * @file userReducer.js
 * @brief This module exports the userReducer component.
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * @var userReducer
 * @brief userReducer.
 */
export const userReducer = createSlice({
    name: "userReducer",
    initialState: {
        userInfo: null,
        avatarUrl: null,
    },
    reducers: {
        getUserInfoByIdFetch: (state) => {
            return state
        },
        getUserInfoByIdSuccess: (state, action) => {
            state.userInfo = action.payload
        },
        getUserAvatarFetch: (state) => {
            return state
        },
        getUserAvatarSuccess: (state, action) => {
            state.avatarUrl = action.payload
        },
    },
})

export const {
    getUserInfoByIdFetch,
    getUserInfoByIdSuccess,
    getUserAvatarFetch,
    getUserAvatarSuccess,
} = userReducer.actions

export default userReducer.reducer
