/**
 * @file CritereColumn.js
 * @brief Ce fichier définit le composant CritereColumn.
 */
import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { asBase64 } from "store/features/AnalyseMulticritereFeatures/critereColumnSlice";

const CritereColumn = ({ graph }) => {
    const specificiteBase64 = useSelector(
        (state) => state.critereColumn.specificite.base64
    );
    const certitudeBase64 = useSelector(
        (state) => state.critereColumn.certitude.base64
    );
    const manoeuvrabiliteBase64 = useSelector(
        (state) => state.critereColumn.manoeuvrabilite.base64
    );

    const refs = useRef();
    const dispatch = useDispatch();

    const options = {
        animation: {
            onComplete: () => {
                let dataURL = refs.current?.toBase64Image();
                switch (graph.name) {
                    case "Spécificité":
                        if (!specificiteBase64) {
                            dispatch(asBase64({ name: graph.name, value: dataURL }));
                        }
                        break;
                    case "Certitude":
                        if (!certitudeBase64) {
                            dispatch(asBase64({ name: graph.name, value: dataURL }));
                        }
                        break;
                    case "Manoeuvrabilité":
                        if (!manoeuvrabiliteBase64) {
                            dispatch(asBase64({ name: graph.name, value: dataURL }));
                        }
                        break;
                    default:
                        break;
                }
            },
        },
        type: "bar",
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            datalabels: {
                formatter: function (value) {
                    return value;
                },
                display: true,
                textAlign: "center",
                align: "center",
                color: "black",
                font: {
                    size: 12,
                    weight: "bold",
                    lineHeight: "2rem",
                },
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    const values = [...graph.value].sort((a, b) => {
        if (a.criteriaName < b.criteriaName) {
            return -1;
        }
        if (a.criteriaName > b.criteriaName) {
            return 1;
        }
        return 0;
    });

    const labels = Array.from(
        Object.values(values),
        (entry) => entry.criteriaName
    );
    const dataSet = Array.from(Object.values(values), (entry) =>
        entry.criteriaScore ? +entry.criteriaScore.toFixed(2) : entry.criteriaScore
    );
    const dataChart = {
        labels,
        datasets: [
            {
                data: dataSet,
                barPercentage: 0.4,
                borderRadius: 5,
                backgroundColor: graph.value.length> 2 ? 
                (graph.name === "Spécificité" ? ["#00E6E3", "#00B2A2", "#0F434A"] : ["#802B73", "#BA2980", "#E557AD"]) 
                : ["#12ABDB","#0070AD"],
            },
        ],
    };
    /**
     * refs={refs} est utiliser pour mock Bar dans les tests unitaires CritereColumn.test.js
     */
    return (
        <div style={{ position: "relative", height: "90%", width: "100%" }}>
            <Bar ref={refs} refs={refs} options={options} data={dataChart} />
        </div>
    );
};

export default CritereColumn;