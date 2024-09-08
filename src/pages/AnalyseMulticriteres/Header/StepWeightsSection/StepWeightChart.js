/**
 * @file StepsWeightChart.js
 * @brief This module contains the Information StepsWeightChart component.
 *
 * The StepsWeightChart component visualizes the weight distribution of criteria across steps using a pie chart.
 * It's important to highlight that the component employs the ant-design/plots library for rendering the chart.
 * The module also provides a utility function `contentFunction` to format percentage values for display.
 */
import { memo, useEffect, useState } from "react"
import PropTypes from "prop-types"

import { Pie } from "@ant-design/plots"

/**
 * StepsWeightChart
 * @brief A functional component that renders a pie chart showcasing the weight distribution of criteria across different steps.
 *
 * @param {Object} props - Properties passed to the component, especially the list of weights for the current step.
 * @returns {JSX.Element} Rendered StepsWeightChart component.
 */
const StepsWeightChart = ({ phaseName,listCurrentStepWeights }) => {
    const [dataPie, setDataPie] = useState([])
    const weights = listCurrentStepWeights.sort((a, b) =>
        a.criteriaName > b.criteriaName ? 1 : -1
    )

    useEffect(() => {
        if (weights && weights.length) {
            setDataPie(weights)
        }
    }, [weights])

    const data = dataPie.map((w) => {
        const obj = {}
        obj["type"] = w.criteriaName
        obj["value"] = Number(
            parseFloat(parseFloat(w.weightValue) * 100).toFixed(2)
        )
        return obj
    })

    const config = {
        width: 300,
        height: 150,
        padding: "auto",
        angleField: "value",
        colorField: "type",
        color: listCurrentStepWeights.length> 2 ? 
            (phaseName === "Spécificité" ? ["#00E6E3", "#00B2A2", "#0F434A"] : ["#802B73", "#BA2980", "#E557AD"]) 
            : ["#12ABDB","#0070AD"],
        radius: 1,
        label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }) => {
                if (Number.isInteger(percent * 100)) {
                    return `${(percent * 100).toFixed(0)}%`
                } else {
                    return `${(percent * 100).toFixed(1)}%`
                }
            },
            style: {
                fontSize: 16,
                fontWeight: "bold",
                fill: "#000",
            },
        },
        interactions: [
            {
                type: "element-active",
            },
        ],
    }

    return <Pie {...config} data={data} />
}

StepsWeightChart.propTypes = {
    listCurrentStepWeights: PropTypes.array.isRequired,
}

/**
 * contentFunction
 * @brief Utility function to format the percentage values for display in the pie chart.
 *
 * @param {Object} param0 - An object containing the 'percent' property, which is a value between 0 and 1.
 * @returns {string} Formatted percentage string.
 */
export const contentFunction = ({ percent }) => {
    if (Number.isInteger(percent * 100)) {
        return `${(percent * 100).toFixed(0)}%`
    } else {
        return `${(percent * 100).toFixed(1)}%`
    }
};

export default memo(StepsWeightChart)
