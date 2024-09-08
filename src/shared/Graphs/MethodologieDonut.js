/**
 * @file MethodologieDonut.js
 * @brief Ce fichier contient le composant MethodologieDonut.
 */
import { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import formatChartData from "utils/formatting/formatChartData";

export default memo(({ results }) => {
    const chooseMethod = Array.isArray(results.chooseMethod)
        ? results.chooseMethod[0]
        : results.chooseMethod;

    const name = typeof chooseMethod === 'string' ? chooseMethod.trim().toLowerCase() : '';
    const totalVotes = results.countVotes;

    const rawData = results.allMethods
        .filter((m) => m.votes !== 0)
        .map((m) => ({
            type: typeof m.name === 'string' ? m.name.trim().toLowerCase() : '', // Assurez-vous que m.name est une chaîne
            value: (m.votes / totalVotes) * 100,
        }));

    const data = formatChartData(rawData);

    const colors = ["#0070AD", "#004368", "#12ABDB", "#277F84"];

    const arrName = Array.from(Object.values(data), (entry) => entry.type);
    const dataSet = Array.from(Object.values(data), (entry) =>
        entry.value ? +entry.value.toFixed(2) : entry.value
    );

    if (arrName.length === 0 || dataSet.length === 0) {
        return <div>Pas de données disponibles pour afficher le graphique.</div>;
    }

    const dataChart = {
        labels: arrName,
        datasets: [
            {
                data: dataSet,
                backgroundColor: colors,
            },
        ],
    };

    const options = {
        cutout: "80%",
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            },
            datalabels: {
                display: false
            }
        }
    };

    const centerTextDoughnut = {
        id: "centerTextDoughnut",
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;
            const lineHeight = 30;

            const selectedMethodIndex = arrName.indexOf(name);
            const percentage = selectedMethodIndex !== -1 ? dataSet[selectedMethodIndex] : 0;

            ctx.font = "bold 1.5rem sans-serif";
            ctx.fillText(chooseMethod || 'Non spécifié', x, y - lineHeight / 2);
            ctx.font = "1.2rem sans-serif";
            ctx.fillText(`${Math.round(percentage)}%`, x, y + lineHeight / 2);
        },
    };

    return (
        <div style={{ height: "90%", width: "90%", margin: "auto" }}>
            <Doughnut
                data={dataChart}
                options={options}
                plugins={[centerTextDoughnut]}
            />
        </div>
    );
});
