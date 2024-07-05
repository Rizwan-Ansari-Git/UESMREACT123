import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import TableData from './TableData';
import DeviceUpDown from '../Sidebar/Dashboard/DeviceControlDashboard/DeviceUpDown_PieChart';
import { Card, Col, Row } from 'antd';


import PieChart from './PieChart';
import Detection from './Detection';
import Api from './../../ConfigFile/Api';


function MainDashboard() {
    const [users, setDashboardData] = useState({});
    const [NewDetectionModal, setNewDetectionModal] = useState([]); 
    const [PreventedDetectionModal, setPreventedDetectionModal] = useState([]);
    const [RemediationDetectionModal, setRemediationDetectionModal] = useState([]);
    const [HuntingDetectionModal, setHuntingDetectionModal] = useState([]);
    const [EndpointDetectionModal, setEndpointDetectionModal] = useState([]);
    const [PeripheralDetectionModal, setPeripheralDetectionModal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [EventSummary, setEventSummary] = useState([]);
    
    const [showNewDetectionModal, setShowNewDetectionModal] = useState(false);
    const [showPreventedModal, setShowPreventedModal] = useState(false);
    const [showRemediationModal, setShowRemediationModal] = useState(false);
    const [showHuntingModal, setShowHuntingModal] = useState(false);
    const [showEndpointModal, setShowEndpointModal] = useState(false);
    const [showPeripheralModal, setShowPeripheralModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`/dashboard/newDetection`);

                setDashboardData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchNewDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/newDetectionModalData`);
            setNewDetectionModal(response.data.data.NewDetection);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    const fetchPreventedDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/PreventedAttacks`);
            setPreventedDetectionModal(response.data.data.PreventedAttacks);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    const fetchRemediationDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/getRemediationDetectionInfo`);
            setRemediationDetectionModal(response.data.data.RemediationDetectionInfo);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    const fetchHuntingDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/TotalHunting`);
            setHuntingDetectionModal(response.data.data.TotalHunting);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    const fetchEndpointDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/getEndPointAffectedInfo`);
            setEndpointDetectionModal(response.data.data.EndpointAffected);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    const fetchPeripheralDetectionModalData = async () => {
        try {
            const response = await Api.get(`/dashboard/PeripheralDetection`);
            setPeripheralDetectionModal(response.data.data.PeripheralDetection);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
    };

    useEffect(() => {
        const fetchModalData = async () => {
            try {
                const response = await Api.get(`/dashboard/recentFileData`);
                const eventData = response.data.data.recentFileData;
                setEventSummary(eventData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching modal data:', error);
            }
        };

        fetchModalData();
    }, []);

    const mystyle = {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    };

    const handleCloseNewDetectionModal = () => setShowNewDetectionModal(false);
    const handleShowNewDetectionModal = () => {
        setShowNewDetectionModal(true);
        fetchNewDetectionModalData();
    };

    const handleClosePreventedModal = () => setShowPreventedModal(false);
    const handleShowPreventedModal = () => {
        setShowPreventedModal(true);
        fetchPreventedDetectionModalData();
    };

    const handleCloseRemediationModal = () => setShowRemediationModal(false);
    const handleShowRemediationModal = () => {
        setShowRemediationModal(true);
        fetchRemediationDetectionModalData();
    };

    const handleCloseHuntingModal = () => setShowHuntingModal(false);
    const handleShowHuntingModal = () => {
        setShowHuntingModal(true);
        fetchHuntingDetectionModalData();
    };

    const handleCloseEndpointModal = () => setShowEndpointModal(false);
    const handleShowEndpointModal = () => {
        setShowEndpointModal(true);
        fetchEndpointDetectionModalData();
    };

    const handleClosePeripheralModal = () => setShowPeripheralModal(false);
    const handleShowPeripheralModal = () => {
        setShowPeripheralModal(true);
        fetchPeripheralDetectionModalData();
    };

    const { New_Detection, Prevent_Attacks, Peripheral_Detection, Remediation_Detection, Total_Hunting_Leads_Investigated, End_Point_Affected } = users;

    return (
        <>
<div>

  </div>

            <div className='row' style={{ marginLeft: "1%", marginRight: "1%" ,marginTop:"2%"}}>
                <div className="col-md-12">
                    <div className='row'>
                        <div className='card col-md-2' style={mystyle} onClick={handleShowNewDetectionModal}>
                            <h4>New Detection</h4>
                            <h1>{New_Detection}</h1>
                        </div>

                        <Modal show={showNewDetectionModal} onHide={handleCloseNewDetectionModal} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Detection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>IP_ADDRESS</th>
                                                <th>C_TIME</th>
                                                <th>APPLICATION_NAME</th>
                                                <th>APPLICATION_PATH</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ID}</td>
                                                    <td>{file.IP_ADDRESS}</td>
                                                    <td>{file.C_TIME}</td>
                                                    <td>{file.APPLICATION_NAME}</td>
                                                    <td>{file.APPLICATION_PATH}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseNewDetectionModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowPreventedModal}>
                            <h4>Prevented Attacks</h4>
                            <h1>{Prevent_Attacks}</h1>
                        </div>

                        <Modal show={showPreventedModal} onHide={handleClosePreventedModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Prevented Attacks</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>IP ADDRESS</th>
                                                <th>APPLICATION NAME</th>
                                                <th>APPLICATION PATH</th>
                                                <th>Current date time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PreventedDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.IP_ADDRESS}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.APPLICATION_NAME}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.APPLICATION_PATH}</td>
                                                    <td>{file.C_TIME}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClosePreventedModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowRemediationModal}>
                            <h4>Remediation Detection</h4>
                            <h1>{Remediation_Detection}</h1>
                        </div>

                        <Modal show={showRemediationModal} onHide={handleCloseRemediationModal} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Remediation Detection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>IP ADDRESS</th>
                                                <th>APPLICATION PATH</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RemediationDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.actual_ip}</td>
                                                    <td>{file.Path}</td>
                                                    <td>{file.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseRemediationModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowHuntingModal}>
                            <h4>Total Hunting</h4>
                            <h1>{Total_Hunting_Leads_Investigated}</h1>
                        </div>

                        <Modal show={showHuntingModal} onHide={handleCloseHuntingModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Total Hunting</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Endpoint IP</th>
                                                <th>APPLICATION Name</th>
                                                <th>Application Path</th>
                                                <th>Detection Date and Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {HuntingDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.IP_ADDRESS}</td>
                                                    <td>{file.APPLICATION_NAME}</td>
                                                    <td>{file.APPLICATION_PATH}</td>
                                                    <td>{file.C_TIME}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseHuntingModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowEndpointModal}>
                            <h4>EndPoint Affected</h4>
                            <h1>{End_Point_Affected}</h1>
                        </div>

                        <Modal show={showEndpointModal} onHide={handleCloseEndpointModal} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Endpoint Affected</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Endpoint IP</th>
                                                <th>Last Incident Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {EndpointDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.IP_ADDRESS}</td>
                                                    <td>{file.max_time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEndpointModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowPeripheralModal}>
                            <h4>Peripheral Detection</h4>
                            <h1>{Peripheral_Detection}</h1>
                        </div>

                        <Modal show={showPeripheralModal} onHide={handleClosePeripheralModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Peripheral Detection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>IP ADDRESS</th>
                                                <th>Activity</th>
                                                <th>UserName</th>
                                                <th>Peripheral ID</th>
                                                <th>Activity Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PeripheralDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.IP_ADDRESS}</td>
                                                    <td>{file.STATUS}</td>
                                                    <td>{file.USER_NAME}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.USB_ID}</td>
                                                    <td>{file.CDATE}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClosePeripheralModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className='row' style={{ marginTop: "2%", marginLeft: "1%", marginRight: "1%" }}>
                <div className="col-md-12">
                    <div className='row'>
                        <div className='card col-md-4'>
                        <PieChart/>
                        </div>

                        <div className='card col-md-4'>
                        <PieChart/>
                        </div>
                        <div className='card col-md-4'>

                        <Detection     Prevent_Attacks={Prevent_Attacks} New_Detection={New_Detection}/>
                        
                        </div>
                    </div>
                </div>
            </div>
            {/* <TableData/> */}
                   
                        <h3>Event Summary</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>File Path</th>
                                    <th>Device IP</th>
                                    <th>Activity User Name</th>
                                    <th>Description</th>
                                    <th>Severity</th>
                                    <th>Time</th>
                                    <th>File Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EventSummary.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.APPLICATION_NAME}</td>
                                        <td>{file.APPLICATION_PATH}</td>
                                        <td>{file.IP_ADDRESS}</td>
                                        <td>{file.USER_NAME}</td>
                                        <td>{file.Description}</td>
                                        <td>{file.Malware_status}</td>
                                        <td>{file.C_TIME}</td>
                                        <td>{file.APPLICATION_HASH}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

        </>
    );
}

export default MainDashboard;
