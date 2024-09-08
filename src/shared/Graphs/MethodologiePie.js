/**
 * @file MethodologiePie.js
 * @brief Ce fichier contient le composant MethodologiePie.
 */
import { memo, useRef } from "react"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Pie } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { asBase64 } from "store/features/PlanExecution/methodsPieSlice"
import formatChartData from "utils/formatting/formatChartData"

ChartJS.register(ArcElement, Tooltip, Legend)

export default memo(({ dynamic = false }) => {
    const ref = useRef()

    const methodsPieBase64 = useSelector( state => state.methodsPie.base64 )
    const predictibilityResults =useSelector(
        (state) => state.previsibilityAnalysisReducer.methodologies
    )

    const dispatch = useDispatch()
    const findMethodologyValue = (methodologyName, predictibilityResults) => {
        const filteredResult = predictibilityResults?.filter((m) => m.name === methodologyName)[0];
        if (filteredResult && filteredResult.value !== "NaN") {
            return filteredResult.value * 100;
        }
        return 0;
    };

    let agile, classic, hybrid;

    if (!dynamic) {
        agile = findMethodologyValue("AGILE", predictibilityResults);
        classic = findMethodologyValue("CLASSIC", predictibilityResults);
        hybrid = findMethodologyValue("HYBRID", predictibilityResults);
    } else {
        agile = 20;
        classic = 30;
        hybrid = 50;
    }

    const total = agile + classic + hybrid
    const data = formatChartData([
        agile && {
            type: "Agile",
            value: (agile / total) * 100,
            color: "#FF5770"
        },
        hybrid && {
            type: "Hybride",
            value: (hybrid / total) * 100,
            color: "#9E4780"
        },
        classic && {
            type: "Classique",
            value: (classic / total) * 100,
            color: "#0070AD"
        },
    ])

    const options = {
        layout: {
            padding: 0,
            margin: 0,
        },
        animation: {
            onComplete: () => {
                if(!methodsPieBase64) {
                    dispatch( asBase64( ref.current?.toBase64Image() ) )
                }
            }
        },
        type: "pie",
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            datalabels: {
                formatter: function(value, context) {
                    return value !== undefined ? data[context.dataIndex].type + "\n" + value + "%" : ""
                },
                display: true,
                textAlign: "center",
                align: "center",
                color: "white",
                font: {
                    size: 18,
                    weight: "bold",
                    lineHeight: "2rem"
                },
            },
            // datalabels: {
            //     formatter: function(value, context) {
            //                return value !== undefined ? data[context.dataIndex].type + "\n" + value + "%" : ""
            //             },
            //     color: "#333", // Darker color for the label
            //     anchor: 'end', // Aligns the text to the end of the slice
            //     align: 'end', // Aligns the text inside the slice
            //     offset: 10, // Adds some offset to make sure the text is outside
            //     font: {
            //         size: 16,
            //         weight: "bold",
            //     },
            //     textAlign: 'center',
            // },
            // legend: {
            //     display: false, // Hides the legend
            // },
            tooltip: {
                enabled: false
            },
        },
    }

    const labels = Array.from(Object.values(data), (entry) => entry.type)
    const dataSet = Array.from(Object.values(data), (entry) =>
        entry.value ? +entry.value.toFixed(0) : entry.value
    )
    const colors = Array.from(Object.values(data), (entry) => entry.color)

    const dataChart = {
        labels,
        datasets: [
            {
                data: dataSet,
                backgroundColor: colors
            }
        ]
    }

    return(
        <div style={{ height: "90%", width: "90%", margin: "0 auto" }}>
            {predictibilityResults&&<Pie 
                ref={ref}
                data={dataChart}
                options={options}
            />}
        </div>
    )
})
