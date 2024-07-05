import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card, Col, Row } from 'antd';
import Api from '../../../ConfigFile/Api';

function ViewDevice() {
    const [OnlineDevice, setOnlineDevice] = useState([]); // Initialize as an empty array
    const [OfflineDevice, setOfflineDevice] = useState([]);
    const [DeviceList, setDeviceList] = useState([]);
    const [OnlineDeviceModal, setOnlineDeviceModal] = useState([]);
    const [OfflineDeviceModal, setOfflineDeviceModal] = useState([]);
    const [showOnlineDeviceModal, setShowOnlineDeviceModal] = useState(false);
    const [showOfflineDeviceModal, setShowOfflineDeviceModal] = useState(false);
    // Online Device
    useEffect(() => {
        const fetchOnlineDevices = async () => {
            try {
                const response = await Api.get(`/view/onlineEndpoint`);
                const newData = response.data.data.New_Detection;
                setOnlineDevice(newData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching online devices:', error);
            }
        };

        fetchOnlineDevices();
    }, []); // Empty dependency array ensures this effect runs once on component mount

    // Offline Device
    useEffect(() => {
        const fetchOfflineDevices = async () => {
            try {
                const response = await Api.get(`/view/offlineEndpoint`);
                const newData = response.data.data.New_Detection;
                setOfflineDevice(newData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching offline devices:', error);
            }
        };

        fetchOfflineDevices();
    }, []);

    const total = OfflineDevice + OnlineDevice;

    // Event Summary
    useEffect(() => {
        const fetchEventSummary = async () => {
            try {
                const response = await Api.get(`/view/deviceList`);
                const eventData = response.data.data.UpDownModal;
                setDeviceList(eventData); // Ensure eventData is an array
            } catch (error) {
                console.error('Error fetching event summary:', error);
            }
        };

        fetchEventSummary();
    }, []);

    const mystyle = {
        padding: "2s0px",
        // other styles
    };

    const cardStyle = {
        margin: "20px",
        // other styles
    };

    const form = {
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "2%"
    };

    const fetchOnlineModalData = async () => {
        try {
            const response = await Api.get(`/view/onlineEndpointModal`);
            setOnlineDeviceModal(response.data.data.Online_Endpoint);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchOfflineModalData = async () => {
        try {
            const response = await Api.get(`/view/offlineEndpointModal`);
            setOfflineDeviceModal(response.data.data.Offline_Endpoint);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleShowOnlineModal = async () => {
        setShowOnlineDeviceModal(true);
        await fetchOnlineModalData();
    };

    const handleCloseOnlineModal = () => setShowOnlineDeviceModal(false);

    const handleShowOfflineModal = async () => {
        setShowOfflineDeviceModal(true);
        await fetchOfflineModalData();
    };

    const handleCloseOfflineModal = () => setShowOfflineDeviceModal(false);
    

    return (
        <>
            <div className='row'>
                <div className='col-md-1'></div>
                <div className="col-md-10">
                    <div className='row' style={{ width: "120%", height: "130%" }}>
                        <div className='card col-md-3' style={{ ...mystyle, ...cardStyle }}>
                            <h2 style={{ textAlign: 'center' }}>Total </h2>
                            <h4 style={{ textAlign: 'center' }}>Endpoints</h4>
                            <h1 style={{ textAlign: 'center', fontSize: '70px' }}>{total}</h1>
                        </div>

                        <div className='card col-md-3' style={{ ...mystyle, ...cardStyle }} onClick={handleShowOnlineModal}>
                            <h2 style={{ textAlign: 'center' }}>Online </h2>
                            <h4 style={{ textAlign: 'center' }}>Endpoints</h4>
                            <h1 style={{ textAlign: 'center', fontSize: '70px' }}>{OnlineDevice}</h1>
                        </div>
                        <Modal show={showOnlineDeviceModal} onHide={handleCloseOnlineModal} backdrop="static" keyboard={false}
                            size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Online Endpoint</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>Device Status</th>
                                                <th>Device Name</th>
                                                <th>Last Connected</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {OnlineDeviceModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ip_address}</td>
                                                    <td>{file.agent_status}</td>
                                                    <td>{file.atm_id}</td>
                                                    <td>{file.current_date_time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseOnlineModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-3' style={{ ...mystyle, ...cardStyle }} onClick={handleShowOfflineModal}>
                            <h2 style={{ textAlign: 'center' }}>Offline</h2>
                            <h4 style={{ textAlign: 'center' }}>Endpoints</h4>
                            <h1 style={{ textAlign: 'center', fontSize: '70px' }}>{OfflineDevice}</h1>
                        </div>
                        <Modal show={showOfflineDeviceModal} onHide={handleCloseOfflineModal} backdrop="static" keyboard={false}
                            size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>Offline Endpoint</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>Device Status</th>
                                                <th>Device Name</th>
                                                <th>Last Connected</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {OfflineDeviceModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ip_address}</td>
                                                    <td>{file.agent_status}</td>
                                                    <td>{file.atm_id}</td>
                                                    <td>{file.current_date_time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseOfflineModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>

            <div className='row' style={{ marginLeft: "1%", marginRight: "1%", marginTop: "3%" }} >
                <div className='col-md-1'></div>
                <div className='col-md-10' style={form}>
                    <div className='card'>
                        <h3 style={{ alignItems: 'center' }}>Device List</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Device Name</th>
                                    <th>Device IP</th>
                                    <th>Last Connected</th>
                                    <th>Device Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DeviceList.map((device, index) => (
                                    <tr key={index}>
                                        <td>{device.atm_id}</td>
                                        <td>{device.ip_address}</td>
                                        <td>{device.current_date_time}</td>
                                        <td>{device.agent_status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>
        </>
    );
}

export default ViewDevice;
