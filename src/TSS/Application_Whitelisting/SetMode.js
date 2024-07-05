import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { json } from "react-router-dom";
//import Api from './../../../../ConfigFile/Api';


function SetMode() {
    const [options, setOptions] = useState([]);
    const [selectedMultiRegion, setSelectedMulti1] = useState([]); 
    const [State, setState] = useState([]);
    const [Branch, setBranch] = useState([]);
    const [DeviceID, setDeviceID] = useState([]); 
    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.0.66:9193/v2/CommonAPI/findAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data);

                if (data && data.data && data.data.Users_List) {
                    const UsersList = data.data.Users_List;
                    const atmIds = UsersList.map(user => ({
                        label: user.atm_id,
                        value: user.atm_id
                    }));

                    const ipaddress = UsersList.map(user => ({
                        label: user.ip_address,
                        value: user.ip_address
                    }));
                    setOptions(atmIds);
                    setState(ipaddress);
                } else {
                    console.error('Users_List is undefined');
                    // Log the structure of data.data to understand the issue
                    console.log('data.data structure:', data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };
        fetchData();
    }, []);

    const handleMultiSelectChange = (selectedList, setStateCallback) => {
    //    setStateCallback(selectedList);
    setSelectedMulti1(selectedList);
        if (selectedList.length > 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                selectedMultiRegion: "",
              State: "",
                Branch: "",
                DeviceID: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
    };

    const handleReset = () => {
        setSelectedMulti1([]);
        setState([]);
        setBranch([]);
        setDeviceID([]);
        setErrors({});
    };

    const options2 = [
        { label: "Create", value: "Create" },
        { label: "Rename", value: "Rename" },
        { label: "Delete", value: "Delete" },
        { label: "Modify", value: "Modify" }
    ];


  return (
    <>

         <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10 card' >
    
                <div  style={{ marginTop: "2%", textAlign: 'center' }}><h2>Set Mode</h2></div>
        <div className="row" style={{marginTop:"2%"}}>
          <div className="col-md-4">
            <label htmlFor='Name' className='form-label'>
             Region\Zone
            </label>
            <MultiSelect
               options={options} 
              value={selectedMultiRegion}
              onChange={handleMultiSelectChange}
              labelledBy={"Select"}
              isCreatable={true}
            />
            {errors.selectedMultiRegion && <p className="text-danger">{errors.selectedMultiRegion}</p>}
          </div>

          <div className="col-md-4">
            <label htmlFor='Name' className='form-label'>
             State
            </label>
            <MultiSelect
              options={options2} 
              value={State}
              onChange={handleMultiSelectChange}
              labelledBy={"Select"}
              isCreatable={true}
            />
            {errors.State && <p className="text-danger">{errors.State}</p>}
          </div>
          </div>



          <div className="row" style={{marginTop:"2%"}}>
          <div className="col-md-4">
            <label htmlFor='Name' className='form-label'>
             State
            </label>
            <MultiSelect
              options={options} // Use options state here
              value={Branch}
              onChange={handleMultiSelectChange}
              labelledBy={"Select"}
              isCreatable={true}
            />
            {errors.Branch && <p className="text-danger">{errors.Branch}</p>}
          </div>

          <div className="col-md-4">
            <label htmlFor='Name' className='form-label'>
             State
            </label>
            <MultiSelect
              options={options} // Use options state here
              value={DeviceID}
              onChange={handleMultiSelectChange}
              labelledBy={"Select"}
              isCreatable={true}
            />
            {errors.DeviceID && <p className="text-danger">{errors.DeviceID}</p>}
          </div>
          </div>
    
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3%', marginBottom:"1%"}}>
          <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
          <button onClick={handleReset} className="btn btn-danger" style={{ marginLeft: "10px" }}>Reset</button>
     {/* </div> */}
 </div>
            
                </div>
                <div className='col-md-1'></div>
            </div>
        </>
  );
}
export default SetMode;