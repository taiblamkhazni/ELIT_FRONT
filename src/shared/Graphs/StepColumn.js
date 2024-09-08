/**
 * @file StepColumn.js
 * @brief Ce fichier contient le composant StepColumn.
 */
import { memo, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getResultsMultiByProjectIdFetch } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";

/**
 * @brief Composant StepColumn.
 */
export default memo(({ projectId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getResultsMultiByProjectIdFetch(projectId));
    }
  }, [projectId,dispatch]);

  const analyseMulticriteresResult = useSelector(
    (state) => state.multicriteriaAnalysisReducer.analyseMulticriteresResult
  );

  const data = analyseMulticriteresResult
    ? analyseMulticriteresResult?.formSteps.reduce((acc, n) => {
        if (n.stepName === "Spécificité") {
          acc[0] = {
            type: n.stepName,
            value: n.escore?.toFixed(4) * 100,
            color: (n.escore?.toFixed(4) * 100)>=50 ? "#21A759" : "#FFB24A",
          };
        } else if (n.stepName === "Certitude") {
          acc[1] = {
            type: n.stepName,
            value: n.escore?.toFixed(4) * 100,
            color: (n.escore?.toFixed(4) * 100)>=50 ? "#21A759" : "#FFB24A",
          };
        } else {
          acc[2] = {
            type: n.stepName,
            value: n.escore?.toFixed(4) * 100,
            color: (n.escore?.toFixed(4) * 100)>=50 ? "#21A759" : "#FFB24A",
          };
        }
        return acc;
      }, [])
    : [];

  const options = {
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
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
          stepSize: 20,
        },
      },
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: {
      datalabels: {
        formatter: function (value) {
          return Math.round(value) + "%";
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
  const colors = Array.from(Object.values(data), (entry) => entry.color);

  const dataChart = {
    labels,
    datasets: [
      {
        data: dataSet,
        barPercentage: 0.4,
        borderRadius: 10,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ height: "90%", width: "100%", margin: "auto" }}>
      <Bar id="graphe-analyse-multicritere" data={dataChart} options={options} />
    </div>
  );
});
