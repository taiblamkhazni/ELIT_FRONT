/**
 * @file authentificationReducer.js
 * @brief Ce fichier définit le reducer authentificationReducer.
 */
import jwtDecode from "jwt-decode"

import { createSlice } from "@reduxjs/toolkit"

export const authentificationReducer = createSlice({
    name: "authentificationReducer",
    initialState: {
        user: localStorage.getItem("authTokens")
            ? jwtDecode(
                JSON.parse(localStorage.getItem("authTokens"))["access-token"]
            )
            : null,
        isRefreshTokenValid: false,
    },
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload
        },
        setIsRefreshTokenValid: (state, action)=>{
            state.isRefreshTokenValid = action.payload
        }
    }
})

export const {
    setUser,
    setIsRefreshTokenValid
} = authentificationReducer.actions

export default authentificationReducer.reducer