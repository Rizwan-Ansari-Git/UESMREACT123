import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-modal';
import Api from '../../ConfigFile/Api';


Modal.setAppElement('#root'); // Set the root element for accessibility

const PieChart = () => {
  const [hostOsData, setHostOsData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ OS: '', count: 0 });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/dashboard/getHostStatus`);
        const data = response.data.data.Host_Os;

        const formattedData = [['OS', 'Count']];

        data.forEach(item => {
          formattedData.push([item.OS, item.os_count]);
        });
        
        setHostOsData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: 'Host OS',
    is3D: true,
  };

  // Function to handle click events on the pie chart slices
  const onPieSliceClick = ({ chartWrapper }) => {
    
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const OS = dataTable.getValue(selectedItem.row, 0);
      const count = dataTable.getValue(selectedItem.row, 1);
      setModalContent({ OS, count });
      setModalIsOpen(true);
      // Additional logic to fetch detailed table data based on the selected OS
      fetchTableData(OS); 
    }
  };

  // Function to fetch detailed table data based on the selected OS
  const fetchTableData = async (selectedOS) => {
    try {
      // Replace with your API endpoint to fetch detailed data based on the selected OS
      const response = await axios.get(`http://192.168.0.111:9191/api/v1/dashboard/getDetailsByOS/${selectedOS}`);
      const tableData = response.data.data; // Assuming the API returns an array of detailed data
      setTableData(tableData);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
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


