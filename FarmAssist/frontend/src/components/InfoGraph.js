import React from "react";
import { Bar, Line } from "react-chartjs-2";
//eslint-disable-next-line
import Chart from "chart.js/auto";
import "../css/Charts.css";

function InfoGraph({ infoData, xlabel, prediction, title }) {
  const cropNames = Object.values(infoData[0]).map((crop) => crop[0]);
  const cropValues = Object.values(infoData[0]).map((crop) => crop[1]);

  const barData = {
    labels: Object.keys(infoData[0]),
    datasets: [
      {
        data: cropValues,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define the data for the line graph
  const lineData = {
    labels: Object.keys(infoData[1]),
    datasets: [
      {
        data: Object.values(infoData[1]),
        fill: false,
        borderColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 5,
      },
    ],
  };

  // Define the options for both graphs

  return (
    <>
      <div className="charts1">
        <Bar
          data={barData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: title,
                color: "black",
                font: {
                  size: 24,
                  weight: "bold",
                },
              },

              tooltip: {
                callbacks: {
                  title: function (tooltipItem) {
                    return xlabel + ": " + tooltipItem[0].label;
                  },
                  label: function (tooltipItem) {
                    const crop = cropNames[tooltipItem.dataIndex];
                    const prob = cropValues[tooltipItem.dataIndex];
                    return crop + ": " + prob;
                  },
                },
              },
            },

            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
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
                  text: xlabel,
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
      <div className="charts1">
        <Line
          data={lineData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: true,
                text:
                  title +
                  ` (${prediction[0].toUpperCase() + prediction.slice(1)})`,
                color: "black",
                font: {
                  size: 24,
                  weight: "bold",
                },
              },
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  title: function (tooltipItem) {
                    return xlabel + ": " + tooltipItem[0].label;
                  },
                  label: function (tooltipItem) {
                    const prob = cropValues[tooltipItem.dataIndex];
                    return (
                      prediction[0].toUpperCase() +
                      prediction.slice(1) +
                      ": " +
                      prob
                    );
                  },
                },
              },
            },
            scales: {
              y: {
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
                  text: xlabel,
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
    </>
  );
}

export default InfoGraph;
