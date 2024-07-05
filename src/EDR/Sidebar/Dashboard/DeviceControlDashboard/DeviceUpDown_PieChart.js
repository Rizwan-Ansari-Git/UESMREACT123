import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Api1, Api2 } from './api';
import Api from './../../../../ConfigFile/Api';


const DeviceUpDown_PieChart = () => {
  const [UPDownData, setUpDownData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/deviceControl/updownStatus`);
        // const response = await Api.get('/dashboard/newDetection');
        const formattedData = [
          ["Activity", "Count"],
          ["Up", response.data.data.Up_Count],
          ["Down", response.data.data.Down_Count]
        ];
        setUpDownData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    is3D: false,
    pieHole: 0.4,
    
  };

  const onPieSliceClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const UPDown = dataTable.getValue(selectedItem.row, 0);
      fetchTableData(UPDown);
      setShowModal(true);
    }
  };

  const fetchTableData = async (selectedOS) => {
    try {
      const response = await Api.get(`/deviceControl/updownStatusModal?status=${selectedOS}`);
      const tableData = response.data.data.UpDownModal;
      setTableData(tableData);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={UPDownData}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: onPieSliceClick,
          },
        ]}
      />

      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Device Up And Down</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date Time</th>
                  <th>Agent Status</th>
                  <th>User Name</th>
                  <th>IP Address</th>
                  <th>OS</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.current_date_time}</td>
                    <td>{item.agent_status}</td>
                    <td>{item.user_name}</td>
                    <td>{item.ip_address}</td>
                    <td>{item.OS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeviceUpDown_PieChart;
