/**
 * @file CritereBar.test.js
 * @brief fichier de test pour la barre de critères
 */

import { Provider } from "react-redux";
import rootReducer from 'reducers/rootReducers';

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

import CritereBar from "../CritereBar";



/**
 * @brief mocks of components and hooks
 *
 */
jest.mock('react-chartjs-2', () => ({
    Bar: ({ options }) => {
        options.animation.onComplete();
        const tickValue = options.scales.x.ticks.callback(50);
        const formattedValue = options.plugins.datalabels.formatter(50);
        return <div data-testid="mock-bar-chart" data-tick-value={tickValue} data-formatted-value={formattedValue}>Mock Bar Chart</div>;
    }
}));

/**
 * @brief function for store mock
 *
 */
function createMockStore(initialState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState
    });
}
let store;

/**
 * @brief mocks for Data
 *
 */
const mockTrueData = {
    entry1: { type: 'Type1', value: 90 },
    entry2: { type: 'Type2', value: 80 },
    entry3: { type: 'Type3', value: 70 }
};

const mockFalseData = {
    entry1: { type: 'Type1', value: null },
    entry2: { type: 'Type2', value: 0 },
    entry3: { type: 'Type3', value: undefined }
};

describe('CritereBar', () => {
    beforeEach(() => {
        store = createMockStore({
            critereBar: {
                base64: null
            }
        });
        store.dispatch = jest.fn();
    });

    /**
     * @brief Test to check if it renders without crashing
     *
     */
    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

    /**
     * @brief Test to check if it renders the Bar chart
     *
     */
    it('renders the Bar chart', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        const chart = getByTestId('mock-bar-chart');
        expect(chart).toBeInTheDocument();
    });

    /**
     * @brief Test to check if it handles false values correctly
     *
     */
    it('handles false values correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <CritereBar data={mockFalseData} />
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

    /**
     * @brief Test to check if it dispatches when barBase24 is false
     *
     */
    it('dispatches when barBase64 is false', () => {
        render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledWith(expect.anything());
    });

    /**
     * @brief Test to check if it does not dispatch when barBase24 is false
     *
     */
    it('does not dispatch when barBase64 is true', () => {
        store = createMockStore({
            critereBar: {
                base64: "sampleBase64Data"
            }
        });
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        expect(store.dispatch).not.toHaveBeenCalled();
    });

    /**
     * @brief Test to check the ticks callback functionality
     *
     */
    it('checks the ticks callback functionality', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        const chart = getByTestId('mock-bar-chart');
        expect(chart.getAttribute('data-tick-value')).toBe('50%');
    });

    /**
     * @brief Test to check the formatter function for datalabels
     *
     */
    it('checks the formatter function for datalabels', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CritereBar data={mockTrueData} />
            </Provider>
        );

        const chart = getByTestId('mock-bar-chart');
        expect(chart.getAttribute('data-formatted-value')).toBe('50%');
    });

});
