/**
 * @file selector.js
 * @brief This module exports MenuTitle component
 */
import { createSelector } from "reselect"

export const chartMultiReportStateSelector = createSelector(
    (state) => state?.critereBar,
    (state) => state?.critereColumn,
    (state) => state?.weightPie,
    (bar, column, weight) => {
        return { bar, column, weight }
    }
)

export const listStepweightsMultiAnalysisSelector = createSelector(
    (state) => state.multicriteriaAnalysisReducer.analyseMulticriteresResult,
    (result) => {
        if (result) {
            return [...result.formSteps].reduce((acc, step) => {
                acc = [
                    ...acc,
                    {
                        currentStep: step.stepRef,
                        stepWeights: step.stepWeights,
                        name: step.stepName,
                    },
                ]
                return acc
            }, [])
        }
    }
)
