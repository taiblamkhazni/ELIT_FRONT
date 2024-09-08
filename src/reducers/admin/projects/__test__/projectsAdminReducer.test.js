/**
 * @file projectsAdminReducer.test.js
 * @brief Test suite for projectsAdminReducer.
 *
 * This file contains tests for the projectsAdminReducer, ensuring that it correctly handles actions and updates state.
 */
import projectsAdminReducer, {
    getProjectsAdminFetch,
    getProjectsAdminSuccess,
} from "../projectsAdminReducer";

/**
 * @brief Describe block for the projectsAdminReducer test suite.
 *
 * This block contains multiple describe and it blocks, testing different aspects of the reducer.
 */
describe("projectsAdminReducer", () => {
    /**
     * @brief Tests for the getProjectsAdminFetch action.
     *
     * This block tests how the reducer reacts to the getProjectsAdminFetch action.
     */
    describe("getProjectsAdminFetch", () => {
        /**
         * @brief Test to ensure the state remains unchanged on getProjectsAdminFetch action.
         *
         * It verifies that the reducer returns the initial state when the getProjectsAdminFetch action is dispatched.
         */
        it("should return the current state without modifying it", () => {
            const initialState = { projects: [] };

            const nextState = projectsAdminReducer(initialState, getProjectsAdminFetch());

            expect(nextState).toEqual(initialState);
        });
    });

    /**
     * @brief Tests for the getProjectsAdminSuccess action.
     *
     * This block tests how the reducer reacts to the getProjectsAdminSuccess action.
     */
    describe("getProjectsAdminSuccess", () => {
        /**
         * @brief Test to ensure the state is updated correctly on getProjectsAdminSuccess action.
         *
         * It verifies that the reducer correctly updates the state with the provided payload.
         */
        it("should update the projects state with the payload", () => {
            const initialState = { projects: [] };
            const payload = [{ id: 1, name: "Project A" }, { id: 2, name: "Project B" }];

            const nextState = projectsAdminReducer(initialState, getProjectsAdminSuccess(payload));

            expect(nextState).toEqual({ projects: payload });
        });
    });

    /**
     * @brief Test to ensure the reducer handles unknown actions.
     *
     * It verifies that the reducer returns the current state when an unknown action is dispatched.
     */
    it("should handle unknown action types by returning the current state", () => {
        const initialState = { projects: [] };
        const unknownAction = { type: "UNKNOWN_ACTION" };

        const nextState = projectsAdminReducer(initialState, unknownAction);

        expect(nextState).toEqual(initialState);
    });
    /**
     * @brief Test to ensure the reducer handles invalid input.
     *
     * It verifies that the reducer returns the current state when an invalid action is dispatched.
     */
    it("should handle invalid input by returning the current state", () => {
        const initialState = { projects: [] };
        const invalidAction = {};

        const nextState = projectsAdminReducer(initialState, invalidAction);

        expect(nextState).toEqual(initialState);
    });
});
