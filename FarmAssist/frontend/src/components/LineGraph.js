import React from "react";
import { Line } from "react-chartjs-2";
//eslint-disable-next-line
import Chart from "chart.js/auto";
import "../css/Charts.css";

function LineGraph({ data, title, xlabel }) {
  // Define the data for the line graph
  const lineData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        fill: false,
        borderColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 5,
      },
    ],
  };

  // Define the options for both graphs

  return (
    <div className="charts1">
      <Line
        data={lineData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
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
          },
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
                text: "Yield (kg/acre)",
                font: {
                  size: 20,
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
                  size: 20,
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
}

export default LineGraph;
