import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from './../../../../ConfigFile/Api';


function ViewWhitelist() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/AppControl/WhitelistApplication`);
        const data = response.data.data.WhitelistApplication;

        // Format the data for MultiSelect component

        setData(data); // Update options state with formatted data
        
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      <div className='col-md-10' style={form}> 
      <h1 style={ {textAlign: 'center'}}>Whitelisted Application</h1>
    <div className="table-container" style={{ backgroundColor: "#f8f9fa"}}>
      <table  className="table">
        <thead>
          <tr>
          <th>IP_Address</th>
            <th>Application Path</th>
            <th>Application Hash</th>
            <th>Current Time Date</th>
            <th>Status</th>

            
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td>{item.actual_ip}</td>            
              <td>{item.Path_name}</td>
              <td>{item.Hash}</td>
              <td>{item.current_date_time}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    <div className='col-md-1'></div>
    </div>
  );
}

export default ViewWhitelist;
