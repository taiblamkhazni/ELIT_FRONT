/**
 * @file AspectsBarMethode.js
 * @brief Ce fichier définit du composant AspectsBarMethode.
 */
import { useRef } from "react"
import { Bar } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { asBase64 } from "store/features/AnalysePrevisibiliteFeatures/aspectsBarMethodSlice"
import formatChartData from "utils/formatting/formatChartData"

/**
 * @brief AspectsBarMethode : représente le graphique des aspects de la méthode.
 * @param methodologiesData Les aspects de la méthode.
 */
const AspectsBarMethode = ({ methodologiesData }) => {
    const ref = useRef();
    const dispatch = useDispatch()
    const methodBase64 = useSelector( state => state.aspectsBarMethod.base64)

    const agile = methodologiesData.AGILE.percent
    const classic = methodologiesData.CLASSIC.percent
    const hybrid = methodologiesData.HYBRID.percent

    /**
     * @brief data : Les données du graphique.
     **/
    const data = formatChartData([
        {
            type: "Agile",
            value: agile,
            votesNumber: methodologiesData.AGILE.votesNumber,
        },
        {
            type: "Classique",
            value: classic,
            votesNumber: methodologiesData.CLASSIC.votesNumber,
        },
        {
            type: "Hybride",
            value: hybrid,
            votesNumber: methodologiesData.HYBRID.votesNumber,
        },
    ])



    /**
     * @brief options : Les options du graphique.
    **/
    const options = {
      type: "bar",
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      animation: {
        onComplete: () => {
          if (!methodBase64) {
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
            return value === 0 ? "" : value + "%";
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

    const labels = Array.from( Object.values(data), entry => entry.type )
    const dataSet = Array.from( Object.values(data), entry => entry.value ? Math.round(entry.value) : entry.value )
    const colors = dataSet.map(item => item < 50 ? "#FFD068" : "#33B569");
    

    /**
     * @brief dataChart : Les données du graphique.
     **/
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

export default AspectsBarMethode;
