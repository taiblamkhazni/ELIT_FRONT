/**
 * @file AspectsGauge.js
 * @brief Ce fichier définit du composant AspectsBarGauge.
 */
import { useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import {  useSelector } from "react-redux"


/**
 * @brief AspectsGauge : représente le graphique des aspects de la jauge.
 */
const AspectsGauge = () => {
    const percentages = useSelector(
      (state) => state.previsibilityAnalysisReducer.percentages
    );
    const ref = useRef()

    let color = ""
    if (percentages < 50) {
        color = "#FFB24A"
    } else {
        color = "#21A759"
    }

    const options = {
      circumference: 180,
      rotation: -90,
      cutout: "80%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: false,
        },
      },
    };

    const centerTextDoughnut = {
      id: "centerTextDoughnut",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.textAlign = "center";
        ctx.font = "bold 1.2rem sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#1F1A28";

        const text = percentages.toFixed(0) + "%";

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(text, x, y);
      },
    };

    const labels = ["value", "percentages"]

    // Need to be equal to 100
    const dataSet = [percentages, 100 - percentages]

    const dataChart = {
      labels,
      datasets: [
        {
          label: "gauge",
          data: dataSet,
          backgroundColor: [color, "#E9E9E9"],
        },
      ],
    };

    return (
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Doughnut
          ref={ref}
          data={dataChart}
          options={options}
          plugins={[centerTextDoughnut]}
        />
      </div>
    );
}

export default AspectsGauge;
