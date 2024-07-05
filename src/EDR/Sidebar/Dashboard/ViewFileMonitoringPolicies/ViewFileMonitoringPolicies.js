import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Api from './../../../../ConfigFile/Api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ViewFileMonitoringPolicies() {
    const [recentFiles, setRecentFiles] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Api.get('/filePolicy/ViewFileMonitoringPolicy');
          setRecentFiles(response.data.data.FileMonitoringPolicy);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleEyeIconClick = async (Policy_id) => {
      try {
      //   const response = await Api.get(`/filePolicy/ViewFileMonitoringPolicyModal/${Policy_id}`);
      const response = await Api.get(`filePolicy/ViewFileMonitoringPolicyModal?policyId=${Policy_id}`);
        setModalData(response.data.data.Policies_List);
        setShowModal(true); // Show modal after data is fetched
      } catch (error) {
        console.error('Error fetching modal data:', error);
      }
    };
  
    const handleClose = () => setShowModal(false);

    const form= {
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop:"2%"
    }
  
    return (
        <div className='row'>
            <div className='col-md-1'></div>
        <div className='col-md-10'  style={form}>    
      <div className="table-container">
        <h4 style={{ marginBottom: '3%',textAlign: 'center'}}>View File Monitoring Policy</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Policy Version</th>
              <th>Policy View</th>
            </tr>
          </thead>
          <tbody>
            {recentFiles.map((file, index) => (
              <tr key={index}>
                <td>{file.Policy_name}</td>
                <td>{file.Policy_version}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => handleEyeIconClick(file.Policy_id)}
                    style={{ cursor: 'pointer', marginLeft: '5px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <Modal show={showModal} onHide={handleClose} size="xl" aria-labelledby="example-modal-sizes-title-xl">
          <Modal.Header closeButton>
            <div className="row" style={{ width: '100%' }}>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h4 className="modal-title" style={{ textAlign: 'center' }}>
                  View File Monitoring Policy
                </h4>
              </div>
              <div className="col-md-4"></div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-bordered" id="pending_data" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Policy Name</th>
                  <th>Policy Type</th>
                  <th>File Path</th>
                  <th>Parameter Type</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((file, index) => (
                  <tr key={index}>
                    <td>{file.policyName}</td>
                    <td>{file.policyType}</td>
                    <td>{file.filePath}</td>
                    <td>{file.parameterType.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
      <div className='col-md-1'></div>
      </div>
    );
  }
  
  export default ViewFileMonitoringPolicies;
