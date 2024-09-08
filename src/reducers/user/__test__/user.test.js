/**
 * @file user.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import userReducer, { getUserAvatarFetch, getUserAvatarSuccess, getUserInfoByIdFetch, getUserInfoByIdSuccess } from "../userReducer";

describe("userReducer", () => {
    const initialState = {
        userInfo: null,
        avatarUrl: null,
    };

    it("should return the initial state", () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle getUserInfoByIdFetch", () => {
        const newState = userReducer(initialState, getUserInfoByIdFetch());
        expect(newState).toEqual(initialState);
    });

    it("should handle getUserInfoByIdSuccess", () => {
        const user = {
            id: 1,
            name: "John",
        };
        const newState = userReducer(initialState, getUserInfoByIdSuccess(user));
        expect(newState.userInfo).toEqual(user);
    });

    it("should handle getUserAvatarFetch", () => {
        const newState = userReducer(initialState, getUserAvatarFetch());
        expect(newState).toEqual(initialState);
    });

    it("should handle getUserAvatarSuccess", () => {
        const avatarUrl = "https://example.com/avatar.png";
        const newState = userReducer(initialState, getUserAvatarSuccess(avatarUrl));
        expect(newState.avatarUrl).toEqual(avatarUrl);
    });
});
