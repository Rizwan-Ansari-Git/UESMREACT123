import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../../../ConfigFile/Api';


const ThreatDetection_PieChart = () => {
  const [ThreatDetectionData, setThreatDetectionData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/deviceControl/threatDetection`);

        const formattedData = [
          ["Activity", "Count"],
          ["Non Threat", response.data.data.nonThreat],
          ["Threat", response.data.data.threat]
        ];

        console.log("threat detection formattedData", formattedData);
        setThreatDetectionData(formattedData);

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
      const Threat = dataTable.getValue(selectedItem.row, 0);
      fetchTableData(Threat);
      setModalIsOpen(true);
    }
  };

  const fetchTableData = async (selectedOS) => {
    try {
      let response = '';
      if (selectedOS.toLowerCase() === 'threat') {
        response = await Api.get(`deviceControl/threatDetectionModal?status=Threat_Detection`);
      } else {
        response = await Api.get(`/deviceControl/threatDetectionModal?status=Not_Threat_Detection`);
      }

      const tableData = response.data.data.ThreatDetection;
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
        data={ThreatDetectionData}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: onPieSliceClick,
          },
        ]}
      />

      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Threat Detection By Endpoint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Status</th>
                <th>PC Name</th>
                <th>OS</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.ip_address}</td>
                  <td>{item.agent_status}</td>
                  <td>{item.atm_id}</td>
                  <td>{item.OS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThreatDetection_PieChart;
