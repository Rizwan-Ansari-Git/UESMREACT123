import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PieChart from './Piechart';
import FileMonitoringPiechart from './FileMonitoringPiechart';
import PolicyLiveOnEndpoint from './PolicyLiveOnEndpoint';
import './FileMonitor.css'; // Import the CSS file
import Api from './../../../../ConfigFile/Api';

function FileMonitor() {
    const [users, setDashboardData] = useState({});
    const [NewDetectionModal, setNewDetectionModal] = useState([]); // Initialize as an empty array
    const [FileExtension, setFileExtension] = useState([]);
    const [EventSummary, setEventSummary] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTotalModal, setShowTotalModal] = useState(false); // Added state for showTotalModal
    const [totalFiles, setTotalFiles] = useState(0);
    const eventName='';

    // File count
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`/fileMonitor/fileMonitoringCount`);
                setDashboardData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchFileMonitoringData = async () => {
        try {
            const response = await Api.get(`/fileMonitor/fileMonitoringCreateModal`);
            setNewDetectionModal(response.data.data.CreateModal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // File Extension
    useEffect(() => {
        const fetchModalData = async () => {
            try {
                const response = await Api.get(`/fileMonitor/fileExtension`);
                const newData = response.data.data.FileExtension;
                setFileExtension(newData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching modal data:', error);
            }
        };

        fetchModalData();
    }, []); // Empty dependency array ensures this effect runs once on component mount

    // Event Summary
    useEffect(() => {
        const fetchModalData = async () => {
            try {
                const response = await Api.get(`/fileMonitor/eventsSummary`);
                const eventData = response.data.data.EventsSummary;
                setEventSummary(eventData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching modal data:', error);
            }
        };

        fetchModalData();
    }, []);

    const { Create_File, Rename_File, Modify_File, Delete_File } = users;

    useEffect(() => {
        const { Create_File = 0, Rename_File = 0, Modify_File = 0, Delete_File = 0 } = users;
        const total = Create_File + Rename_File + Modify_File + Delete_File;
        setTotalFiles(total);
    }, [users]);

    const mystyle = {
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",

    };

    const fetchRenameData = async () => {
        try {
            const response = await Api.get(`/fileMonitor/fileMonitoringRenameModal`);
            setNewDetectionModal(response.data.data.RenameModal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchModifyData = async () => {
        try {
            const response = await Api.get(`/fileMonitor/fileMonitoringModifyModal`);
            setNewDetectionModal(response.data.data.ModifyModal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDeleteData = async () => {
        try {
            const response = await Api.get(`/fileMonitor/fileMonitoringDeleteModal`);
            setNewDetectionModal(response.data.data.DeleteModal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTotalData = async () => {
        try {
            const response = await Api.get(`/fileMonitor/fileMonitoringTotalModal`);
            setNewDetectionModal(response.data.data.TotalModal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => {
        setShowCreateModal(true);
        fetchFileMonitoringData();
    };

    const handleCloseRenameModal = () => setShowRenameModal(false);
    const handleShowRenameModal = () => {
        setShowRenameModal(true);
        fetchRenameData();
    };

    const handleCloseModifyModal = () => setShowModifyModal(false);
    const handleShowModifyModal = () => {
        setShowModifyModal(true);
        fetchModifyData();
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
        fetchDeleteData();
    };

    const handleCloseTotalModal = () => setShowTotalModal(false);
    const handleShowTotalModal = () => {
        setShowTotalModal(true);
        fetchTotalData();
    };

    return (
        <>

    <div className='row'style={{marginTop:"2%"}}>
                <div className='col-md-1'></div>
                <div className='col-md-10 card' >

                <div className="col-md-12">
                
                    <div className='row'>

                        <div className='card col-md-2' style={mystyle} onClick={() => handleShowCreateModal('Create')}>
                            <h4>Create File</h4>
                            <h1>{Create_File}</h1>
                        </div>

                        <Modal show={showCreateModal} onHide={handleCloseCreateModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>File Monitoring Create</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>File Name</th>
                                                <th>File path</th>
                                                <th>Detection Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ip}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.folder_path}</td>
                                                    <td>{file.ctime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseCreateModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowRenameModal}>
                            <h4>Rename File</h4>
                            <h1>{Rename_File}</h1>
                        </div>

                        <Modal show={showRenameModal} onHide={handleCloseRenameModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>File Monitoring Rename </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>File Name</th>
                                                <th>File path</th>
                                                <th>Detection Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                     <td>{file.ip}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.folder_path}</td>
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

                        <div className='card col-md-2' style={mystyle} onClick={handleShowModifyModal}>
                            <h4>Modify File</h4>
                            <h1>{Modify_File}</h1>
                        </div>

                        <Modal show={showModifyModal} onHide={handleCloseModifyModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>File Monitoring Modify</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>File Name</th>
                                                <th>File path</th>
                                                <th>Detection Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ip}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.folder_path}</td>
                                                    <td>{file.ctime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModifyModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowDeleteModal}>
                            <h4>Delete File</h4>
                            <h1>{Delete_File}</h1>
                        </div>

                        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>File Monitoring Delete </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>File Name</th>
                                                <th>File path</th>
                                                <th>Detection Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                     <td>{file.ip}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.folder_path}</td>
                                                    <td>{file.ctime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className='card col-md-2' style={mystyle} onClick={handleShowTotalModal}>
                            <h4>Total File</h4>
                            <h1>{totalFiles}</h1>
                        </div>

                        <Modal show={showTotalModal} onHide={handleCloseTotalModal} backdrop="static" keyboard={false} size="xl" aria-labelledby="example-modal-sizes-title-xl">
                            <Modal.Header closeButton>
                                <Modal.Title>File Monitoring Total</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>EndPoint Ip</th>
                                                <th>File Name</th>
                                                <th>File path</th>
                                                <th>Detection Date Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NewDetectionModal.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file.ip}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.file_names}</td>
                                                    <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.folder_path}</td>
                                                    <td>{file.ctime}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseTotalModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
           

            <div className='row' style={{ marginTop:"3%"}}>
                <div className='col-md-3 card' style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                 
                        <h3>File Extension</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>File Extension</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FileExtension.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.extention}</td>
                                        <td>{file.TYPE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                </div>
<div className='col-md-1'></div>
                <div className='col-md-8 card' style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                   
                        <h3>Event Summary</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Folder Path</th>
                                    <th>Event</th>
                                    <th>TimeStamp</th>
                                    <th>UserName</th>
                                    <th>Ip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EventSummary.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.FILE_NAMEs}</td>
                                        <td>{file.FOLDER_PATH}</td>
                                        <td>{file.EVENT}</td>
                                        <td>{file.CTIME}</td>
                                        <td>{file.USERNAME}</td>
                                        <td>{file.IP}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                
                </div>
            </div>
            
            <div className='row' style={{ marginTop: "3%" }}>
                <div className="col-md-12">
                    <div className='row'>
                        <div className='card col-md-4'>
                            <PieChart/>
                        </div>
                        <div className='card col-md-4'>
                            <PolicyLiveOnEndpoint/>
                        </div>
                        <div className='card col-md-4'>
                            <FileMonitoringPiechart/>
                        </div>
                    </div>
                </div>
            </div>
</div>

            
                </div>
                <div className='col-md-1'></div>
        
        </>
       
    );
}

export default FileMonitor;
