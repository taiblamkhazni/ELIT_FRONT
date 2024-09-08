/**
 * @file CritereBar.js
 * @brief Ce fichier définit le composant CritereBar.
 */
import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { asBase64 } from "store/features/AnalyseMulticritereFeatures/critereBarSlice";

const CritereBar = ({ data }) => {

    const refs = useRef();
    const barBase64 = useSelector((state) => state?.critereBar.base64);
    const dispatch = useDispatch();

    const options = {
        animation: {
            onComplete: () => {
                if (!barBase64) {
                    dispatch(asBase64(refs.current?.toBase64Image()));
                }
            },
        },
        type: "bar",
        indexAxis: "y",
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                grid: {
                    display: false,
                },
            },
            x: {
                min: 0,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + "%";
                    },
                    stepSize: 20,
                },
            },
        },
        plugins: {
            datalabels: {
                formatter: function (value) {
                    return value + "%";
                },
                display: true,
                textAlign: "center",
                align: "center",
                color: "white",
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

    const labels = Array.from(Object.values(data), (entry) => entry.type);
    const dataSet = Array.from(Object.values(data), (entry) =>
        entry.value ? +entry.value.toFixed(2) : entry.value
    );
    const colors = dataSet.map(item => item < 50 ? "#FFD068" : "#33B569");

    const dataChart = {
        labels,
        datasets: [
            {
                data: dataSet,
                barPercentage: 0.8,
                borderRadius: 5,
                backgroundColor: colors,
                axis: "y",
            },
        ],
    };

    return (
        <div style={{ position: "relative", height: "90%", width: "100%" }}>
            <Bar ref={refs} data={dataChart} options={options} />
        </div>
    );
};

export default CritereBar;
