import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../../../ConfigFile/Api';



const USBAllowAndPrevention_PieChart = () => {
  const [USBAllowData, setAllowPreventData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await Api.get(`/deviceControl/usbDetection`);
        const formattedData = [
          ["Activity", "Count"],
          ["Allow", response.data.data.allow],
          ["Prevent", response.data.data.prevent]
        ];

        console.log("USB Allow formattedData" + JSON.stringify(formattedData));
        setAllowPreventData(formattedData);
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
      const USB = dataTable.getValue(selectedItem.row, 0);
      fetchTableData(USB);
      setModalIsOpen(true);
    }
  };

  const fetchTableData = async (selectedOS) => {
    try {
      const response = await Api.get(`/deviceControl/usbDetectionModal?modeofAccess=${selectedOS.toLowerCase()}`);
      const tableData = response.data.data.UpDownModal;
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
        data={USBAllowData}
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
          <Modal.Title>USB Based Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Device Type</th>
                <th>Mode of Access</th>
                <th>Date Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.IP_ADRESS}</td>
                  <td>{item.DEVICE_TYPE}</td>
                  <td>{item.MODE_OF_ACCESS}</td>
                  <td>{item.DATE_TIME}</td>
                  <td>{item.STATUS}</td>
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

export default USBAllowAndPrevention_PieChart;
