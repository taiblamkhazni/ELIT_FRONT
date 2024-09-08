/**
 * @file useAvatarUrl.test.js
 * @brief Contient les tests unitaires pour le composant useAvatarUrl.
 */
import { getAvatarByUserIdApi } from "hooks/apis/UserApi";

import { act, renderHook } from "@testing-library/react";

/**
 * @brief Importation du composant useAvatarUrl pour le tester
 */
import useAvatarUrl from "../useAvatarUrl";
/**
 * @brief Utilisation de Jest pour simuler le hook getAvatarByUserIdApi de UserApi.
 */
jest.mock("hooks/apis/UserApi", () => ({
    getAvatarByUserIdApi: jest.fn(),
}));

describe("useAvatarUrl", () => {
    jest.setTimeout(10000)
    console.error = jest.fn()
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("fetches the avatar URL and updates the state", async () => {
        const userId = 1;
        const mockUrl = "avatar.png";
        getAvatarByUserIdApi.mockResolvedValue(mockUrl);

        const { result } = renderHook(() => useAvatarUrl(userId));

        expect(result.current).toBe(null);
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        })

        expect(result.current).toBe(mockUrl);
    });
});
