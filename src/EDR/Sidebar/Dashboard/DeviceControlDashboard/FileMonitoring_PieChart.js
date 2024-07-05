import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../../../ConfigFile/Api';


const FileMonitoring_PieChart = () => {
  const [fileMonitoringData, setFileMonitoringData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/deviceControl/fileMonitoring`);
    
        const formattedData = [
          ["Activity", "Count"],
          ["Modify", response.data.data.modify],
          ["Rename", response.data.data.rename],
          ["Create", response.data.data.create],
          ["Delete", response.data.data.delete]
        ];

        setFileMonitoringData(formattedData);

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

  // Function to handle click events on the pie chart slices
  const onPieSliceClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const FileMonitor = dataTable.getValue(selectedItem.row, 0);
      fetchTableData(FileMonitor); // Ensure lowercase for consistency
      setModalIsOpen(true);
    }
  };

  // Function to fetch detailed table data based on the selected event type
  const fetchTableData = async (selectedOS) => {
    try {
      const response = await Api.get(`/deviceControl/fileMonitoringModal?event=${selectedOS}`);
      const tableData = response.data.data.UpDownModal; // Assuming the API returns an array of detailed data
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
        data={fileMonitoringData}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: onPieSliceClick,
          },
        ]}
      />

      <Modal
        show={modalIsOpen} // Ensure using show instead of isOpen
        onHide={() => setModalIsOpen(false)}
        // contentLabel="File Monitoring Details"
        // dialogClassName="modal-90w" // Custom class for modal size
        size="xl" aria-labelledby="example-modal-sizes-title-xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>File Monitoring Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>File Path</th>
                <th>File Name</th>
                <th>Event</th>
                <th>Creation Time</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.IP}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{item.FOLDER_PATH}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{item.FILE_NAMEs}</td>
                  <td>{item.EVENT}</td>
                  <td>{item.CTIME}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FileMonitoring_PieChart;
