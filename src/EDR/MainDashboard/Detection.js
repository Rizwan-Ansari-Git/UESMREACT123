import React from 'react';
import { Chart } from 'react-google-charts';

function Detection({ Prevent_Attacks, New_Detection }) {



  const data = [
    ["Element", "Detection", { role: "style" }],
    ["New Detection", New_Detection, "#b87333"], // RGB value
    ["Prevented Attacks", Prevent_Attacks, "silver"], // English color name
  ];

  const options = {
    title: 'Identity Detection-Protection', // Chart title
    titleTextStyle: {
      fontSize: 16, // Title font size
      color: '#333' // Title color
    },
    chartArea: { width: '70%' }, // Adjust chart area as needed
    legend: { position: 'top', alignment: 'center' }, // Position of legend
  };

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Detection;
