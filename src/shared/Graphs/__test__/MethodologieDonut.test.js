/**
 * @file MethodologieDonut.test.js
 * @brief fichier de test pour MethodologieDonut component
 */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import formatChartData from 'utils/formatting/formatChartData';

import { render } from '@testing-library/react';

import MethodologieDonut from '../MethodologieDonut';

import '@testing-library/jest-dom/extend-expect';

/**
 * @brief Mocks for components and libraries
 */
jest.mock('react-chartjs-2', () => ({
  Doughnut: jest.fn(() => null)
}));
jest.mock('utils/formatting/formatChartData', () => jest.fn());

/**
 * @brief unit test for MethodologieDonut component
 */
describe('MethodologieDonut', () => {
  const dummyResults = {
    chooseMethod: 'Method A'.toLowerCase(),
    allMethods: [
      { name: 'Method A'.toLowerCase(), votes: 10 },
      { name: 'Method B'.toLowerCase(), votes: 20 }
    ],
    countVotes: 30,
  };
  const formattedData = [
    { type: 'Method A'.toLowerCase(), value: 33.33 },
    { type: 'Method B'.toLowerCase(), value: 66.67 }
  ];

  beforeEach(() => {
    formatChartData.mockReturnValue(formattedData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Test if it renders the Doughnut chart
   */
  it('renders the Doughnut chart', () => {
    render(<MethodologieDonut results={dummyResults} />);
    expect(Doughnut).toHaveBeenCalled();
  });

  /**
   * @brief Test if it passes correct data to Doughnut component
   */
  it('passes correct data to Doughnut component', () => {
    render(<MethodologieDonut results={dummyResults} />);

    const expectedData = {
      labels: ['Method A'.toLowerCase(), 'Method B'.toLowerCase()],
      datasets: [
        {
          data: [33.33, 66.67],
          backgroundColor: ["#0070AD", "#004368", "#12ABDB", "#277F84"],
        },
      ],
    };

    expect(Doughnut).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
      }),
      {}
    );
  });

  /**
   * @brief Test if it formats the data correctly
   */
  it('formats the data correctly', () => {
    render(<MethodologieDonut results={dummyResults} />);
    expect(formatChartData).toHaveBeenCalledWith([
      { type: 'Method A'.toLowerCase(), value: (10 / 30) * 100 },
      { type: 'Method B'.toLowerCase(), value: (20 / 30) * 100 },
    ]);
  });

  /**
   * @brief Test if it handles zero votes correctly
   */
  it('handles zero votes correctly', () => {
    const newDummyResults = {
      ...dummyResults,
      allMethods: [
        ...dummyResults.allMethods,
        { name: 'Method C'.toLowerCase(), votes: 0 }
      ]
    };

    render(<MethodologieDonut results={newDummyResults} />);

    // Expecting only 'Method A' and 'Method B' to be in the Doughnut chart
    const expectedData = {
      labels: ['Method A'.toLowerCase(), 'Method B'.toLowerCase()],
      datasets: [
        {
          data: [33.33, 66.67],
          backgroundColor: ["#0070AD", "#004368", "#12ABDB", "#277F84"],
        }
      ]
    };

    expect(Doughnut).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
      }),
      {}
    );
  });

  /**
   * @brief Test if it calls the correct methods on the canvas context
   */
  it('calls the correct methods on the canvas context', () => {
    // Mocking CanvasRenderingContext2D
    const mockCtx = {
      textAlign: null,
      font: null,
      textBaseline: null,
      fillText: jest.fn(),
    };

    const mockChartInstance = {
      getDatasetMeta: jest.fn(() => ({ data: [{ x: 10, y: 20 }] })),
      ctx: mockCtx,
    };

    Doughnut.mockImplementation(({ plugins }) => {
      plugins[0].afterDatasetsDraw(mockChartInstance);
      return null;
    });

    render(<MethodologieDonut results={dummyResults} />);

    expect(mockCtx.textAlign).toBe('center');
    expect(mockCtx.font).toBe('1.2rem sans-serif');
    expect(mockCtx.textBaseline).toBe('middle');
    expect(mockCtx.fillText).toHaveBeenCalled();
  });


});
