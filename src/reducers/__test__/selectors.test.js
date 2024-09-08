/**
 * @file selector.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { chartMultiReportStateSelector, listStepweightsMultiAnalysisSelector } from '../selectors';

describe('selectors', () => {
    describe('chartMultiReportStateSelector', () => {
        it('should return the combined state of critereBar, critereColumn, and weightPie', () => {
            const mockState = {
                critereBar: {
                    base64: 'critereBarBase64'
                },
                critereColumn: {
                    specificite: {
                        base64: 'specificiteBase64'
                    },
                    certitude: {
                        base64: 'certitudeBase64'
                    },
                    manoeuvrabilite: {
                        base64: 'manoeuvrabiliteBase64'
                    }
                },
                weightPie: {
                }
            };

            const result = chartMultiReportStateSelector(mockState);

            expect(result).toEqual({
                bar: {
                    base64: 'critereBarBase64'
                },
                column: {
                    specificite: {
                        base64: 'specificiteBase64'
                    },
                    certitude: {
                        base64: 'certitudeBase64'
                    },
                    manoeuvrabilite: {
                        base64: 'manoeuvrabiliteBase64'
                    }
                },
                weight: {
                }
            });
        });
    });

    describe('listStepweightsMultiAnalysisSelector', () => {
        it('should transform the analyseMulticriteresResult into an array of step weights', () => {
            const mockState = {
                multicriteriaAnalysisReducer: {
                    analyseMulticriteresResult: {
                        formSteps: [
                            {
                                stepRef: 'step1',
                                stepWeights: [1, 2, 3],
                                stepName: 'Step 1'
                            },
                            {
                                stepRef: 'step2',
                                stepWeights: [4, 5, 6],
                                stepName: 'Step 2'
                            }
                        ]
                    }
                }
            };

            const result = listStepweightsMultiAnalysisSelector(mockState);

            expect(result).toEqual([
                {
                    currentStep: 'step1',
                    stepWeights: [1, 2, 3],
                    name: 'Step 1'
                },
                {
                    currentStep: 'step2',
                    stepWeights: [4, 5, 6],
                    name: 'Step 2'
                }
            ]);
        });
    });
});
