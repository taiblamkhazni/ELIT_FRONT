/**
 * @file AspectsGaugePDF.js
 * @brief Ce fichier définit du composant AspectsGaugePDF.
 */
import { useRef } from "react"
import { Doughnut } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { asBase64 } from "store/features/AnalysePrevisibiliteFeatures/aspectsGaugeSlice"



/**
 * @brief AspectsGaugePDF : représente le graphique des aspects de la jauge.
 */
const AspectsGaugePDF = () => {
    const percentages = useSelector(
      (state) => state.previsibilityAnalysisReducer.percentages
    );
    const ref = useRef()
    const dispatch = useDispatch()
    const gaugeBase64 = useSelector(state => state.AspectsGauge?.base64);

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
      animation: {
        onComplete: () => {
          if (!gaugeBase64) {
            dispatch(asBase64(ref.current?.toBase64Image()));
          }
        },
      },
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
      <div style={{  height: "150px", width: "200px" }}>
        <Doughnut
          ref={ref}
          data={dataChart}
          options={options}
          plugins={[centerTextDoughnut]}
            style={{display:'none'}}
        />
      </div>
    );
}

export default AspectsGaugePDF;
