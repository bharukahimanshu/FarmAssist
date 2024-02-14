import React from "react";
import { Bar } from "react-chartjs-2";
//eslint-disable-next-line
import Chart from "chart.js/auto";
import "../css/Charts.css";
const BarGraph = (props) => {
  const cropColors = require("./color.json");
  const sortedLabels = Object.fromEntries(
    Object.entries(props.labels).sort(([, a], [, b]) => b - a)
  );
  const cropData = {
    labels: Object.keys(sortedLabels),
    datasets: [
      {
        label: "Crop Recommendation",
        backgroundColor: Object.keys(sortedLabels).map(
          (label) => cropColors[label]
        ),
        borderColor: "black",
        borderWidth: 1.5,
        data: Object.values(sortedLabels),
      },
    ],
  };
  return (
    <div className="charts">
      <Bar
        data={cropData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: 1,
              ticks: {
                stepSize: 0.1,
                color: "black",
                font: {
                  size: 16,
                },
              },
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: "Probability",
                font: {
                  size: 24,
                  weight: "bold",
                },
                color: "black",
              },
            },
            x: {
              ticks: {
                beginAtZero: true,
                color: "black",
                font: {
                  size: 16,
                },
              },
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: "Crops",
                font: {
                  size: 24,
                  weight: "bold",
                },
                color: "black",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
