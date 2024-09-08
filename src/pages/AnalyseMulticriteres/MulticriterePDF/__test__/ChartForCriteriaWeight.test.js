/**
 * @file ChartForCriteriaWeight.test.js
 * @brief fichier de test pour ChartForCriteriaWeight component
 */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import ChartForCriteriaWeight from '../ChartForCriteriaWeight';

/**
 * @brief Mocks for hooks and libraries
 */
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
    Pie: jest.fn(() => null),
}));

/**
 * @brief unit test for ChartForCriteriaWeight component
 */
describe('<ChartForCriteriaWeight />', () => {
    let dispatch;

    beforeEach(() => {
        /** Set up mock implementations*/
        useSelector.mockImplementation((selector) => selector({
            weightPie: {
                specificite: { base64: 'someBase64' },
                certitude: { base64: null },
                manoeuvrabilite: { base64: null },
            },
        }));

        dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
    });

    afterEach(() => {
        /** Clear all mocks after each test*/
        jest.clearAllMocks();
    });

    /**
     * Test if it renders the Pie chart
     */
    it('renders Pie component', () => {
        const graphData = {
            name: "Spécificité",
            stepWeights: [
                { criteriaName: 'Criteria1', weightValue: 0.5 },
                { criteriaName: 'Criteria2', weightValue: 0.3 },
                { criteriaName: 'Criteria3', weightValue: 0.2 },
            ],
        };

        render(<ChartForCriteriaWeight graphData={graphData} />);

        expect(Pie).toHaveBeenCalled();
    });

    /**
     * Test if it calls useSelector and forms data and options correctly
     */
    it('calls useSelector and forms data and options correctly', () => {
        const graphData = {
            name: "Spécificité",
            stepWeights: [
                { criteriaName: 'Criteria1', weightValue: 0.5 },
                { criteriaName: 'Criteria2', weightValue: 0.3 },
                { criteriaName: 'Criteria3', weightValue: 0.2 },
            ],
        };

        render(<ChartForCriteriaWeight graphData={graphData} />);

        expect(useSelector).toHaveBeenCalled();
    });


    /**
     * Test if it calls dispatch when animation onComplete
     */
    it('calls dispatch when animation onComplete', () => {
        const graphData = {
            name: "Certitude",
            stepWeights: [
                { criteriaName: 'Criteria1', weightValue: 0.5 },
                { criteriaName: 'Criteria2', weightValue: 0.3 },
                { criteriaName: 'Criteria3', weightValue: 0.2 },
            ],
        };

        render(<ChartForCriteriaWeight graphData={graphData} />);

        const lastPieCall = Pie.mock.calls[Pie.mock.calls.length - 1];
        const pieProps = lastPieCall[0];

        pieProps.options.animation.onComplete();

        expect(dispatch).toHaveBeenCalled();
    });

});

