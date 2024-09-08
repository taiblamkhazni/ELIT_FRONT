/**
 * @file AspectsBarEScore.js
 * @brief Ce fichier définit du composant AspectsBarEScore.
 */
import { useRef } from "react"
import { Bar } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { asBase64 } from "store/features/AnalysePrevisibiliteFeatures/aspectsBarEScoreSlice"


/**
 * @brief AspectsBarEScore : représente le graphique des aspects de l'e-score.
 * @param elementalEscores Les aspects de l'e-score.
 */
const AspectsBarEScore = ({ elementalEscores = [] }) => {
    const ref = useRef()
    const dispatch = useDispatch()
    const escoreBase64 = useSelector( state => state.aspectsBarEScore.base64)

    const options = {
      type: "bar",
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      animation: {
        onComplete: () => {
          if (!escoreBase64) {
            dispatch(asBase64(ref.current?.toBase64Image()));
          }
        },
      },
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
            stepSize: 10,
          },
        },
      },
      plugins: {
        datalabels: {
          formatter: function (value) {
            return value + " %";
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

    const labels = Array.from( Object.values(elementalEscores), entry => entry.type )
    const dataSet = Array.from( Object.values(elementalEscores), entry => entry.value ? Math.round(entry.value) : entry.value )
    const colors = Array.from( Object.values(elementalEscores), entry => entry.value >= 50 ?  "#21A759" : "#FFB24A" )

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
        <Bar ref={ref} data={dataChart} options={options} />
      </div>
    );

}

export default AspectsBarEScore;
