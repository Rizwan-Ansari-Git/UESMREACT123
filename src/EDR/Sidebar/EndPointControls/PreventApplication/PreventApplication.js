
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Api from "../../../../ConfigFile/Api";

 function PreventApplication() {
  const [options, setOptions] = useState([]);
  const [selectedMulti, setSelectedMulti] = useState([]);

  const [user, setUser] = useState({
    path: "",
    hash: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`AppControl/EndPointList`);
        const data = response.data.data.EndPointList;
        // Format the data for MultiSelect component
        const ipAddresses = data.map(endpoint => ({
          label: endpoint.ip_address,
          value: endpoint.ip_address

         
        }));
        
        setOptions(ipAddresses); // Update options state with formatted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { hash, path } = user;

  const onInputChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });
    
    setErrors({ ...errors, [e.target.name]: "" });

  };

  const handleMultiSelectChange = (selectedList) => {
    setSelectedMulti(selectedList);
    if (selectedList.length > 0) {
      setErrors({ ...errors, selectedMulti: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (!path) {
      errors.path = "Application path is required.";
    }
    if (!hash) {
      errors.hash = "Hash is required.";
    }
    if (selectedMulti.length === 0) {
      errors.selectedMulti = "At least one endpoint must be selected.";
    }
    return errors;
  };


  // function for sybmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const submissionData = selectedMulti.map(endpoint => ({
      path,
      hash,
      actualIp: endpoint.value
    }));
console.log("submissionData"+  JSON.stringify(submissionData))
    try {
      const response = await axios.post('http://192.168.0.66:9191/api/v1/AppControl/allowApplication', submissionData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Function for reset
  const handleReset = () => {
    setUser({ path: "", hash: "" });
    setSelectedMulti([]);
    setErrors({});
  };

  const form= {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop:"2%"
}

  return (
    <>
    <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10 card' style={form}>
    
    <div  style={{ marginTop: "2%" ,textAlign: 'center'}}><h2>Prevent Application (Hash Based)</h2></div>
    <div className="row" style={{marginTop:"2%"}}>
      <div className="col-md-4">
        <label htmlFor='Name' className='form-label'>
          Select EndPoint
        </label>
        <MultiSelect
          options={options} // Use options state here
          value={selectedMulti}
          onChange={handleMultiSelectChange}
          labelledBy={"Select"}
          isCreatable={true}
        />
        {errors.selectedMulti && <p className="text-danger">{errors.selectedMulti}</p>}
      </div>

      <div className='col-md-4'>
        <label htmlFor='Name' className='form-label'>
          Application Path
        </label>
        <input 
          type="text" 
          className='form-control' 
          placeholder='Enter Application Path' 
          name='path' 

          value={path} 
          onChange={onInputChange} 
          
        />
        {errors.path && <p className="text-danger">{errors.path}</p>}
      </div>

      <div className='col-md-4'>
        <label htmlFor='Name' className='form-label'>
          Hash
        </label>
        <input 
          type="text" 
          className='form-control' 
          placeholder='Enter Hash' 
          name='hash' 
          value={hash} 
          onChange={onInputChange}  
        />
        {errors.hash && <p className="text-danger">{errors.hash}</p>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3%', marginBottom:"1%"}}>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        <button onClick={handleReset} className="btn btn-danger" style={{ marginLeft: "10px" }}>Reset</button>
      </div>
    </div>
    </div>
    <div className='col-md-1'></div>
    </div>
    </>
  );
}
export default PreventApplication;
