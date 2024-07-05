import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Api from '../../../../ConfigFile/Api';

const PieChart = () => {
  const [hostOsData, setHostOsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.get(`/fileMonitor/policyLiveOnEndpoint`);
      const data = response.data.data.PolicyLiveOnEndpoint;

      const formattedData = [['Policy_Name', 'Count']];
      data.forEach(item => {
        formattedData.push([item.name, item.count]);
      });
      setHostOsData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchModalData = async (policyName) => {
    try {
      const response = await Api.get(`fileMonitor/policyLiveOnEndpointInfo?name=${policyName}`);
      setModalData(response.data.data.PolicyLiveOnendpoint);
      setShowModal(true); // Show modal after data is fetched
    } catch (error) {
      console.error('Error fetching modal data:', error);
    }
  };

  const onPieSliceClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    console.log(selection); // Debugging: Check what is selected
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const policyName = dataTable.getValue(selectedItem.row, 0);
      const count = dataTable.getValue(selectedItem.row, 1);
      // alert(`Selected Policy Name: ${policyName}\nCount: ${count}`);
      fetchModalData(policyName);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const options = {
    title: 'Policy Live On Endpoints',
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
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
        <Modal.Header closeButton>
          <Modal.Title>Policy Live On EndPoint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>EndPoint IP</th>
                  <th>User Name</th>
                  <th>Last Incident Time</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((file, index) => (
                  <tr key={index}>
                    <td>{file.Ip_address}</td>
                    <td>{file.name}</td>
                    <td>{file.C_Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PieChart;
