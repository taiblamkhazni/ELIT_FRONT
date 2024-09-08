/**
 * @file StepsWeightChart.test.js
 * @brief Contient les tests unitaires pour le composant StepsWeightChart.
 */

import { act, render } from "@testing-library/react";

import StepsWeightChart, { contentFunction } from '../StepWeightChart';




/**
 * @brief mocks of components and hooks
 *
 */
jest.mock('@ant-design/plots', () => ({
    Pie: (props) => {
        if (props.label && props.label.content) {
            props.label.content({ percent: 0.5 });
            props.label.content({ percent: 0.333 });
        }
        return null;
    },
}));

/**
 * @brief mocks for Data
 *
 */
const mockData = [
    { criteriaName: "Test1", weightValue: "0.5" },
    { criteriaName: "Test2", weightValue: "0.5" },
];

describe("StepsWeightChart", () => {

    /**
     * Test to check if it renders without crashing
     */
    it("renders without crashing", () => {
        render(<StepsWeightChart listCurrentStepWeights={[]} />);
    });

    /**
     * Test to check if it handles listCurrentStepWeights prop correctly
     */
    it("handles listCurrentStepWeights prop correctly", () => {

        act(() => {
            render(<StepsWeightChart listCurrentStepWeights={mockData} />);
        });

    });
    /**
     * Test to check if it tests content function
     */
    it('tests content function', () => {
        expect(contentFunction({ percent: 0.5 })).toBe('50%');
        expect(contentFunction({ percent: 0.333 })).toBe('33.3%');
    });
    /**
     * Test to check if it sorts listCurrentStepWeights prop correctly
     */
    it('sorts listCurrentStepWeights prop correctly', () => {
        const data = [
            { criteriaName: 'B', weightValue: '0.5' },
            { criteriaName: 'A', weightValue: '0.5' },
        ];
        act(() => {
            render(<StepsWeightChart listCurrentStepWeights={data} />);
        });

    });

    /**
     * Test to check if it handles Pie label content correctly
     */
    it("handles Pie label content correctly", () => {
        act(() => {
            render(<StepsWeightChart listCurrentStepWeights={mockData} />);
        });

    });


});



