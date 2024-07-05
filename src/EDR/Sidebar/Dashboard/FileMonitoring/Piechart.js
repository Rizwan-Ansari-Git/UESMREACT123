import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Api from '../../../../ConfigFile/Api';

const PieChart = () => {
  const [hostOsData, setHostOsData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.get(`/fileMonitor/userActivity`);
      const data = response.data.data.UserActivity;

      const formattedData = [['UserName', 'Count']];
      data.forEach(item => {
        formattedData.push([item.USERNAME, item.activity_count]);
      });
      setHostOsData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchModalData = async (userName) => {
    try {
      const response = await Api.get(`/fileMonitor/fileMonitoringRenameModal?userName=${userName}`);
      setModalData(response.data.data.RenameModal);
      setshowModal(true); // Show modal after data is fetched
    } catch (error) {
      console.error('Error fetching modal data:', error);
    }
  };

  const options = {
    title: 'User Activity',
    pieHole: 0.1,
    is3D: true,
  };

  const onPieSliceClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const userName = dataTable.getValue(selectedItem.row, 0);
      const count = dataTable.getValue(selectedItem.row, 1);
    //   alert(`Selected User: ${userName}\nActivity Count: ${count}`);
      fetchModalData(userName); // Fetch and display modal data
    }
  };

  const handleCloseRenameModal = () => setshowModal(false);

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

      <Modal show={showModal} onHide={handleCloseRenameModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
        <Modal.Header closeButton>
          <Modal.Title>User Activity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>EndPoint Ip</th>
                  <th>User Name</th>
                  <th>Last Incident Time</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((file, index) => (
                  <tr key={index}>
                    <td>{file.ip}</td>
                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                    <td>{file.ctime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRenameModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PieChart;
