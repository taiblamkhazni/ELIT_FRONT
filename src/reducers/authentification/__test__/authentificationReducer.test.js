/**
 * @file authentificationReducer.test.js
 * @brief Ce fichier contient des tests pour le reducer authentificationReducer et les actions setUser et setIsRefreshTokenValid  .
 */
import authentificationReducer, { setIsRefreshTokenValid, setUser } from "../authentificationReducer"

describe("authentificationReducer", () => {
    const initialState = {
        user: null,
        isRefreshTokenValid: false,
    }

    it("should return the initial state", () => {
        expect(authentificationReducer(undefined, {})).toEqual(initialState)
    })

    it("should handle setUser", () => {
        const user = {
            id: 1,
            name: "John",
        }
        const newState = authentificationReducer(initialState, setUser(user))
        expect(newState.user).toEqual(user)
    })

    it("should handle setIsRefreshTokenValid", () => {
        const newState = authentificationReducer(initialState, setIsRefreshTokenValid(true))
        expect(newState.isRefreshTokenValid).toBe(true)
    })
})
