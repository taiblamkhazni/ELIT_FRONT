/**
 * @file HeaderDescription.test.js
 * @brief This file contains tests for the HeaderDescription component.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";

import { render, screen } from "@testing-library/react";

import HeaderDescription from "../HeaderDescription";

/**
 * @brief Mock the react-redux module.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/**
 * @brief Create a mock store for Redux.
 */
const mockStore = configureStore();

let store;
let dispatchMock;

/**
 * @brief Test suite for HeaderDescription component.
 */
describe("I want to see the header of the description", () => {
    /**
     * @brief Clear all mocks after each test.
     */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @brief Test that instructions are displayed to the user when not all phases are completed.
     */
    it("instructions should be display to the user when he's not done with all phases", () => {
        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1,
            },
        };

        dispatchMock = jest.fn();

        useDispatch.mockImplementation(() => dispatchMock);

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <HeaderDescription phasesLength={3} />
            </Provider>
        );

        expect(
            screen.getByText(
                "Organiser une session collaborative, à distance ou en présentiel, avec toutes les parties prenantes du projet afin de compléter collectivement ce formulaire (environ 1 heure).",
                { exact: false }
            )
        ).toBeInTheDocument();
    });
});
