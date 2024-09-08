/**
 * @file useAvatarsList.test.js
 * @brief Contient les tests unitaires pour le composant useAvatarsList.
 */
import { getAvatarByUserIdApi } from "hooks/apis/UserApi";

import { act, renderHook } from "@testing-library/react";

/**
 * @brief Importation du composant useAvatarsList pour le tester.
 */
import useAvatarsList from "../useAvatarsList";
/**
 * @brief Utilisation de Jest pour simuler le hook getAvatarByUserIdApi de UserApi.
 */
jest.mock("hooks/apis/UserApi", () => ({
    getAvatarByUserIdApi: jest.fn(),
}));

describe("useAvatarsList", () => {
    console.error = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns an empty array if no contributors are provided", () => {
        const { result } = renderHook(() => useAvatarsList([]));

        expect(result.current).toEqual([]);
    });

    it("fetches avatar URLs and updates the state", async () => {
        const contributors = [
            { contributerId: 1 },
            { contributerId: 2 },
            { contributerId: 3 },
        ];
        const mockedUrls = [
            { userId: 1, url: "avatar1.png" },
            { userId: 2, url: "avatar2.png" },
            { userId: 3, url: "avatar3.png" },
        ];
        getAvatarByUserIdApi.mockImplementation((userId) => {
            const foundUrl = mockedUrls.find((url) => url.userId === userId);
            return Promise.resolve(foundUrl ? foundUrl.url : null);
        });

        const { result } = renderHook(() =>
            useAvatarsList(contributors)
        );

        expect(result.current).toEqual([]);
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        })
        expect(result.current).toEqual(mockedUrls);
    });
})
