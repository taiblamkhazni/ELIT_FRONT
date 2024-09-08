/**
 * @file CritereColumn.test.js
 * @brief fichier de test pour le composant CritereColumn
 */

import { Provider } from "react-redux";
import rootReducer from "reducers/rootReducers";

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

import CritereColumn from "../CritereColumn";

const mockColumnProps = {};

jest.mock("react-chartjs-2", () => ({
    Bar: (props) => {
        Object.assign(mockColumnProps, props); // Capture the props
        // Mock the ref and toBase64Image function
        props.refs.current = {
            toBase64Image: jest.fn().mockReturnValue("mockDataURL"),
        };
        const formattedValue = props.options.plugins.datalabels.formatter(50);

        return (
            <div
                data-testid="mock-column-chart"
                data-formatted-value={formattedValue}
            >
                Mock Column Chart
            </div>
        );
    },
}));

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

function createMockStore(initialState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
}

describe("CritereColumn", () => {
    let store;

    const mockGraph = {
        name: "Spécificité",
        value: [
            { criteriaName: "Criterion1", criteriaScore: 4 },
            { criteriaName: "Criterion2", criteriaScore: 2 },
        ],
    };

    beforeEach(() => {
        store = createMockStore({
            critereColumn: {
                specificite: { base64: null },
                certitude: { base64: null },
                manoeuvrabilite: { base64: null },
            },
        });
        mockDispatch.mockClear();
    });

    /**
     * @brief Test to check if it renders without crashing
     *
     */
    it("renders without crashing", () => {
        const { container } = render(
            <Provider store={store}>
                <CritereColumn graph={mockGraph} />
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

    /**
     * @brief Test to check if it renders the column chart
     *
     */
    it("renders the Column chart", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CritereColumn graph={mockGraph} />
            </Provider>
        );

        const chart = getByTestId("mock-column-chart");
        expect(chart).toBeInTheDocument();
    });

    /**
     * @brief Test to check if it dispatches dataURL correctly based on graph name
     *
     */
    it("dispatches dataURL correctly based on graph name", () => {
        const scenarios = [
            {
                graphName: "Spécificité",
                expectedDispatch: {
                    type: "critereColumn/asBase64",
                    payload: {
                        name: "Spécificité",
                        value: expect.any(String),
                    },
                },
            },
            {
                graphName: "Certitude",
                expectedDispatch: {
                    type: "critereColumn/asBase64",
                    payload: {
                        name: "Certitude",
                        value: expect.any(String),
                    },
                },
            },
            {
                graphName: "Manoeuvrabilité",
                expectedDispatch: {
                    type: "critereColumn/asBase64",
                    payload: {
                        name: "Manoeuvrabilité",
                        value: expect.any(String),
                    },
                },
            },
            {
                graphName: "Unrecognized",
                expectedDispatch: null,
            },
        ];

        scenarios.forEach((scenario) => {
            // Reset the mock dispatch to avoid contamination
            mockDispatch.mockReset();

            // Create the current graph scenario
            const currentGraph = {
                ...mockGraph,
                name: scenario.graphName,
            };

            // Render with the current scenario graph name
            render(
                <Provider store={store}>
                    <CritereColumn graph={currentGraph} />
                </Provider>
            );

            // Manually call the onComplete prop
            mockColumnProps.options.animation.onComplete();

            // Check the expected dispatch behavior
            if (scenario.expectedDispatch) {
                expect(mockDispatch).toHaveBeenCalledWith(scenario.expectedDispatch);
            } else {
                expect(mockDispatch).not.toHaveBeenCalled();
            }
        });
    });

    /**
     * @brief Test to check if it does not dispatch dataURL when base64 is true for each graph
     *
     */
    it("does not dispatch dataURL when base64 is true for each graph", () => {
        const scenarios = [
            { graphName: "Spécificité", base64Key: "specificiteBase64" },
            { graphName: "Certitude", base64Key: "certitudeBase64" },
            { graphName: "Manoeuvrabilité", base64Key: "manoeuvrabiliteBase64" },
        ];

        scenarios.forEach((scenario) => {
            // Reset or recreate mock store for each scenario to avoid state contamination
            store = createMockStore({
                critereColumn: {
                    specificite: {
                        base64: scenario.graphName === "Spécificité" ? "someData" : null,
                    },
                    certitude: {
                        base64: scenario.graphName === "Certitude" ? "someData" : null,
                    },
                    manoeuvrabilite: {
                        base64:
                            scenario.graphName === "Manoeuvrabilité" ? "someData" : null,
                    },
                },
            });

            render(
                <Provider store={store}>
                    <CritereColumn graph={{ name: scenario.graphName, value: [] }} />
                </Provider>
            );

            mockColumnProps.options.animation.onComplete();

            expect(mockDispatch).not.toHaveBeenCalledWith({
                type: "critereColumn/asBase64",
                payload: {
                    name: scenario.graphName,
                    value: expect.any(String),
                },
            });

            mockDispatch.mockReset();
        });
    });

    /**
     * @brief Test to check if it checks the formatter function for datalabels in CritereColumn
     *
     */
    it("checks the formatter function for datalabels in CritereColumn", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CritereColumn graph={mockGraph} />
            </Provider>
        );

        const chart = getByTestId("mock-column-chart");
        expect(chart.getAttribute("data-formatted-value")).toBe("50");
    });

    /**
     * @brief Test to check if it handles sorting and data passing correctly for CritereColumn
     *
     */
    it("handles sorting and data passing correctly for CritereColumn", () => {
        const testCases = [
            {
                mockValues: [
                    { criteriaName: "C", criteriaScore: 3 },
                    { criteriaName: "A", criteriaScore: 5 },
                    { criteriaName: "B", criteriaScore: 1 },
                ],
                expectedLabels: ["A", "B", "C"],
            },
            {
                mockValues: [
                    { criteriaName: "B", criteriaScore: 2 },
                    { criteriaName: "A", criteriaScore: 3 },
                ],
                expectedLabels: ["A", "B"],
            },
            {
                mockValues: [
                    { criteriaName: "A", criteriaScore: 3 },
                    { criteriaName: "A", criteriaScore: 5 },
                    { criteriaName: "B", criteriaScore: 1 },
                ],
                expectedLabels: ["A", "A", "B"],
            },
            {
                mockValues: [
                    { criteriaName: "A", criteriaScore: null },
                    { criteriaName: "B", criteriaScore: 0 },
                ],
                expectedData: [null, 0],
            },
        ];

        testCases.forEach(({ mockValues, expectedLabels, expectedData }) => {
            render(
                <Provider store={store}>
                    <CritereColumn graph={{ name: "Spécificité", value: mockValues }} />
                </Provider>
            );
            if (expectedLabels) {
                expect(mockColumnProps.data.labels).toEqual(expectedLabels);
            }
            if (expectedData) {
                expect(mockColumnProps.data.datasets[0].data).toEqual(expectedData);
            }
            mockDispatch.mockReset();
        });
    });
});
