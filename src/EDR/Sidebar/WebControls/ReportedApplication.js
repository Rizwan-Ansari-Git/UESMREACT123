import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../../ConfigFile/Api';

function ReportedApplication() {
    const [OnlineDevice, setOnlineDevice] = useState([]);
    useEffect(() => {
        const fetchOnlineDevices = async () => {
            try {
                const response = await Api.get(`/reportApp/ReportedApplicationList`);
                const newData = response.data.data.ReportedApplicationLsit;
                setOnlineDevice(newData); // Ensure newData is an array
            } catch (error) {
                console.error('Error fetching online devices:', error);
            }
        };

        fetchOnlineDevices();
    }, []);
    const form= {
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop:"2%"
    }
  return (
    <div className="row">
      <div className='col-md-1'></div>
      <div className='col-md-10 card' style={form}>
       <h3 style={{textAlign: 'center'}}>Reported Applications </h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Application Name</th>
                                    <th>Application Path</th>
                                    <th>IP Address</th>
                                    <th>Application Hash</th>
                                    <th>Description</th>
                                    <th>Time</th>
                                    <th>File Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OnlineDevice.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.APPLICATION_NAME}</td>
                                        <td>{file.APPLICATION_PATH}</td>
                                        <td>{file.IP_ADDRESS}</td>
                                        <td style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{file.APPLICATION_HASH}</td>
                                        <td>{file.Malware_Status}</td>
                                        <td>{file.C_TIME}</td>
                                        <td>{file.File_status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <div className='col-md-1'></div>
    </div>
  )
}

export default ReportedApplication;