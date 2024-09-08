/**
 * @file ChartForCriteriaWeight.js
 * @brief This file contains the ChartForCriteriaWeight component, responsible for rendering
 * a Pie chart for criteria weight representation in a multi-criteria analysis context.
 * It utilizes the 'react-chartjs-2' library to render Pie charts based on provided data.
 */
import { useRef } from "react";
import {
    ArcElement,
    Chart as ChartJS,
    defaults,
    Legend,
    Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { asBase64WeightImage } from "store/features/AnalyseMulticritereFeatures/weightPieSlice";

/** Registering necessary components for Chart.js.*/
ChartJS.register(ArcElement, Tooltip, Legend);
/** Disabling default display of the legend in the chart.*/
defaults.plugins.legend.display = false;

/**
 * ChartForCriteriaWeight component renders a Pie chart based on the passed graphData.
 * It is designed to visually represent the weights of different criteria in a multi-criteria analysis.
 * @param {Object} graphData - Data for constructing the Pie chart.
 */
const ChartForCriteriaWeight = ({ graphData }) => {
    /** Extracting base64 encoded images for specific weights from the Redux state.*/
    const specificiteWeightBase64 = useSelector(
        (state) => state.weightPie.specificite.base64
    );
    const certitudeWeightBase64 = useSelector(
        (state) => state.weightPie.certitude.base64
    );
    const manoeuvrabiliteWeightBase64 = useSelector(
        (state) => state.weightPie.manoeuvrabilite.base64
    );

    const dispatch = useDispatch();
    let myRef = useRef(null);

    /** Sorting and preparing the data for the Pie chart.*/
    const values = [...graphData.stepWeights].sort((a, b) => {
        if (a.criteriaName < b.criteriaName) {
            return -1;
        }
        if (a.criteriaName > b.criteriaName) {
            return 1;
        }
        return 0;
    });

    const data = {
        labels: values.map((w) => w.criteriaName),
        datasets: [
            {
                label: graphData.name,
                data: values.map((w) => Number(parseFloat(parseFloat(w.weightValue) * 100).toFixed(2))),
                backgroundColor: graphData.stepWeights.length > 2
                    ? (graphData.name === "Spécificité" ? ["#00E6E3", "#00B2A2", "#0F434A"] : ["#802B73", "#BA2980", "#E557AD"])
                    : ["#12ABDB", "#0070AD"],
                borderColor: ["#FFFFFF"],
                borderWidth: 1,
            }
        ],
    };
    /** Options for chart appearance and behavior. */
    const options = {
        /** Handling the 
         * completion of chart animation.*/
        animation: {
            onComplete: () => {
                /** Dispatching actions based on chart data to update Redux state.*/
                let dataURL = myRef.current?.toBase64Image();
                switch (graphData.name) {
                    case "Spécificité":
                        if (!specificiteWeightBase64) {
                            dispatch(
                                asBase64WeightImage({ name: graphData.name, value: dataURL })
                            );
                        }
                        break;
                    case "Certitude":
                        if (!certitudeWeightBase64) {
                            dispatch(
                                asBase64WeightImage({ name: graphData.name, value: dataURL })
                            );
                        }
                        break;
                    case "Manoeuvrabilité":
                        if (!manoeuvrabiliteWeightBase64) {
                            dispatch(
                                asBase64WeightImage({ name: graphData.name, value: dataURL })
                            );
                        }
                        break;
                    default:
                        break;
                }
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "right",
            },
            datalabels: {
                formatter: function (value) {
                    return value + "%";
                },
                display: true,
                textAlign: "center",
                align: "center",
                color: "white",
                font: {
                    size: 10,
                    weight: "bold",
                    lineHeight: "2rem",
                },
            },
        },
    };
    /** Rendering the Pie chart.*/
    return (
        <div style={{ height: '150px', width: '300px' }}>
            <Pie
                data={data}
                style={{ display: "none" }}
                ref={myRef}
                options={options}
            />
         </div>
    );
};

/** Validating the type of props.*/
ChartForCriteriaWeight.propTypes = {
    graphData: PropTypes.object,
};
export default ChartForCriteriaWeight;
