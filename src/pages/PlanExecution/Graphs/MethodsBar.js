/**
 * @file MethodsBar.js
 * @brief Ce fichier définit le composant MethodsBar.
 */
import { memo, useRef } from "react"
import { Bar } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { asBase64 } from "store/features/PlanExecution/methodsBarSlice"

/**
 * @var MethodsBar
 * @brief MethodsBar.
 */
const MethodsBar = memo(() => {
    const ref = useRef()

    const resultatPlanExecution = useSelector(state => state.executionPlanReducer.results)
    const { allMethods, countVotes } = resultatPlanExecution
    const methodsBarBase64 = useSelector(state => state.methodsBar.base64)

    const dispatch = useDispatch()

    const data = allMethods.map((e) => ({
        type: e.name,
        value: countVotes === 0 ? 0 :(e.votes / countVotes) * 100,
        nbVotes: e.votes,
    }))

    const options = {
        animation: {
            onComplete: () => {
                if (!methodsBarBase64) {
                    dispatch(asBase64(ref.current?.toBase64Image()))
                }
            }
        },
        type: "bar",
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
            y: {
                grid: {
                    display: false, // Désactive la grille de l'axe Y
                },
                ticks: {
                    display: true, // Affiche les labels de l'axe Y
                },
            },
            x: {
                min: 0,
                max: 100,
                ticks: {
                    display: true,
                    stepSize: 20,
                },
                // grid: {
                //     display: false, // Désactive la grille de l'axe X
                // },
            }
        },
        plugins: {
            datalabels: {
                formatter: function (value, context) {
                    let result = "";
                    if (value !== 0.6) {
                        let voteText = " vote";
                        if (data[context.dataIndex].nbVotes > 1) {
                            voteText += "s";
                        }
                        result = data[context.dataIndex].nbVotes + voteText;
                    }
                    return result;
                },
                display: true,
                anchor: function(context) {
                    return data[context.dataIndex].value !== 100 ? "end" : "center";
                }, // Positionne le texte à la fin de la barre
                align: 'end', // Aligne le texte à droite de la barre
                color: "black",
                font: {
                    size: 14,
                    weight: function(context) {
                        return data[context.dataIndex].nbVotes > 1 ? "bold" : "normal";
                    },
                    lineHeight: "2rem"
                }
            },
            tooltip: {
                enabled: false
            }
        }
    }

    // const labels = Array.from(Object.values(data), entry => entry.type)
    // const dataSet = Array.from(Object.values(data), entry => entry.value ? +entry.value.toFixed(2) : entry.value)
    const labels = data.map(entry => entry.type);
    const dataSet = data.map(entry => entry.value ? +entry.value.toFixed(2) : entry.value);

    // Paramétrage des couleurs en fonction de la valeur
    const colors = dataSet.map((value) => {
        if (value > 0) return "#21A759"; // Vert pour les valeurs positives
        return "#FFB24A"; // Orange pour les valeurs égales à 0
    });

    const dataChart = {
        labels,
        datasets: [
            {
                data: dataSet.map((value) => (value === 0 ? 0.6 : value)),
                barPercentage: 0.8,
                borderRadius: 5,
                backgroundColor: colors,
                axis: "y"
            }
        ]
    }

    return (
        <div style={{ position: "relative", height: "100%", width: "95%", margin: "1rem" }}>
            <Bar
                ref={ref}
                data={dataChart}
                options={options}
            />
        </div>
    )
})

export default MethodsBar
