import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Api from '../../../../ConfigFile/Api';

const PieChart = () => {
  const [hostOsData, setHostOsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.get(`/fileMonitor/fileMonitoring`);
      const data = response.data.data.FileMonitoring;

      const formattedData = [['EVENT', 'Count']];
      data.forEach(item => {
        formattedData.push([item.EVENT, item.activity_count]);
      });
      setHostOsData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onPieSliceClick = ({ chartWrapper }) => {

    // alert("nmzx")
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    console.log(selection); // Debugging: Check what is selected
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const event = dataTable.getValue(selectedItem.row, 0);
      const count = dataTable.getValue(selectedItem.row, 1);
      // alert(`Selected Event: ${event}\nCount: ${count}`);
    }
  };

  const options = {
    title: 'File Monitoring',
    pieHole: 0.1,
    is3D: true,
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={hostOsData}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: onPieSliceClick,
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
