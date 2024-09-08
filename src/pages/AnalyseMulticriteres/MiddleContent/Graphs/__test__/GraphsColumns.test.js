/**
 * @file GraphsColumns.test.js
 * @brief fichier de test pour la colonne des graphes
 */

import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from 'reducers/rootReducers';
import { initiateAllState } from "store/features/AnalyseMulticritereFeatures/critereColumnSlice";

import { configureStore } from "@reduxjs/toolkit";
import { act, render } from "@testing-library/react";

import GraphsColumns from "../GraphsColumns";


/**
 * @brief mocks of components and hooks
 *
 */
jest.mock("store/features/AnalyseMulticritereFeatures/critereColumnSlice", () => ({
    initiateAllState: jest.fn()
}));

const mockDispatch = jest.fn();
const mockState = {
    critereColumn: {
        specificite: {
            base64: "some_value"
        },
    }
};
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockImplementation((selector) => selector(mockState)),
    useDispatch: () => mockDispatch
}));

jest.mock('../CritereColumn', () => () => <div data-testid="mock-critere-column">Mock CritereColumn</div>);


describe("GraphsColumns", () => {
    let container = null;
    let store;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        store = configureStore({
            reducer: rootReducer,
        });
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    /**
     * @brief Test to check if it renders without crashing
     *
     */
    it('renders without crashing', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <GraphsColumns graph={{}} />
                </Provider>,
                container
            );
        });
    });

    /**
     * @brief Test to check if it dispatches initiateAllState on mount
     *
     */
    it('dispatches initiateAllState on mount', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <GraphsColumns graph={{}} />
                </Provider>,
                container
            );
        });
        expect(mockDispatch).toHaveBeenCalledWith(initiateAllState());
    });

    /**
     * @brief Test to check if it renders CritereColumn when graph.value is true
     *
     */
    it('renders CritereColumn when graph.value is true', () => {

        const { getByTestId } = render(
            <Provider store={store}>
                <GraphsColumns graph={{ value: true, name: "Test Graph" }} />
            </Provider>
        );

        const mockedCritereColumn = getByTestId('mock-critere-column');

        expect(mockedCritereColumn).not.toBeNull();
        expect(mockedCritereColumn.textContent).toBe("Mock CritereColumn");
    });

    /**
     * @brief Test to check if it does not render CritereColumn when graph.value is false
     *
     */
    it('does not render CritereColumn when graph.value is false', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <GraphsColumns graph={{ value: false }} />
                </Provider>,
                container
            );
        });

        const mockedCritereColumn = container.querySelector("[data-testid='mock-critere-column']");
        expect(mockedCritereColumn).toBeNull();
    });
});
