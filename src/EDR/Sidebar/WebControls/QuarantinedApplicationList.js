import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../../ConfigFile/Api';

function QuarantinedApplicationList() {


    const [AppList, setAppList] = useState([]);


    useEffect(() => {
        const fetchEventSummary = async () => {
            try {
                const response = await Api.get(`/QurantineApplication/QurantineApplicationList`);
                const eventData = response.data.data.QuarantineApplication;
                setAppList(eventData); // Ensure eventData is an array
            } catch (error) {
                console.error('Error fetching event summary:', error);
            }
        };

        fetchEventSummary();
    }, []);
    const form= {
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop:"2%"
    }
  return (
    
      <div className='row' style={{ marginLeft: "1%", marginRight: "1%" }}>
        <div className='col-md-1'></div>
                <div className='col-md-10' style={form}>
                <h3 style={ {textAlign: 'center'}}>Qurantine Application</h3>
                    <div className='card'>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Application Hash</th>
                                    <th>Application Path</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AppList.map((device, index) => (
                                    <tr key={index}>
                                        <td>{device.hash}</td>
                                        <td>{device.path}</td>
                                        <td>{device.actual_ip}</td>
                                        <td>{device.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-md-1'></div>
            </div>
  )
}

export default QuarantinedApplicationList
