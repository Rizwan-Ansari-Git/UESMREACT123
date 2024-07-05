import React, { useEffect, useState } from "react";
import axios from "axios";
import { MultiSelect } from 'react-multi-select-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import './CreateFileMonitoringPolicy.css';

const MySwal = withReactContent(Swal);
 function CreateFileMonitoringPolicy() {

  const [user, setUser] = useState({
    policyName: "",
    policyVersion: "",
    policyType :"",
    filePath : "",
    parameterType: []
  });

  const [errors, setErrors] = useState({});

  const {policyName,policyVersion ,policyType,filePath,parameterType} = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };


  const onMultiSelectChange = (selected) => {
    setUser({ ...user, parameterType: selected });
  };

  const validate = () => {
    const errors = {};
    if (!policyName) {
      errors.policyName = "Policy Name is required.";
    }
    if (!policyVersion) {
      errors.policyVersion = "Policy Version is required.";
    }
    if (policyType === "-1") {
      errors.policyType = "Policy Type is required.";
    }
    return errors;
  };



  const handleSubmit = async (e) => { 
    e.preventDefault();
 const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

   

    const submissionData = [{
      policyName,
      policyVersion,
      policyType,
      filePath,
      parameterType: parameterType.map(option => option.value),
      
      }];

      
  console.log("submissionData"+  JSON.stringify(submissionData))
    try {
      const response = await axios.post('http://192.168.0.137:9191/api/v1/filePolicy/CreateFileMonitoringPolicy', submissionData);
    
      console.log('Data submitted successfully:', response.data);

     
        if (response.status === 200) {
          MySwal.fire({
            title: 'Success',
            text: 'Policy created successfully',
            icon: 'success',
            width: '300px',
            padding: '-1em',
            confirmButtonText: 'OK',
            customClass: {
              container: 'my-swal-container',
              popup: 'my-swal-popup',
              title: 'my-swal-title',
              confirmButton: 'my-swal-confirm-button',
            }
          });
        } else {
          MySwal.fire({
            title: 'Error',
            text: 'Failed to create policy',
            icon: 'error',
            width: '300px',
            padding: '-1em',
            confirmButtonText: 'OK',
            customClass: {
              container: 'my-swal-container',
              popup: 'my-swal-popup',
              title: 'my-swal-title',
              confirmButton: 'my-swal-confirm-button',
            }
          });
        }
    } 
    catch (error) {
      console.error('Error submitting data:', error);
    }



  };

  const handleReset = () => {
    setUser({ policyName: "", policyVersion: "" ,policyType:" ",filePath:" ",parameterType:" "});
    setErrors({});
  };

  const options = [
    { label: "Create", value: "Create" },
    { label: "Rename", value: "Rename" },
    { label: "Delete", value: "Delete" },
    { label: "Modify", value: "Modify" }
  ];

  return (
   
   
    <>

    <div className='row' style={{ marginTop: "2%"}}>
                <div className='col-md-1'></div>
                <div className='col-md-10 card'>
    
                <div className="form-container">
    <div style={{textAlign:"center"}}>
        <h4>Create File Monitoring Policy</h4>
    </div>
<div style={{ marginTop: "15px"}}></div>
    {/* <div className="row" style={{ marginTop: "2%" }}>
        <div className="col-md-4">
            <label htmlFor="policyName" className="form-label">
                Policy Name
            </label>
            <input
                type="text"
                className="form-control"
                placeholder="Enter Policy Name"
                name="policyName"
                value={policyName}
                onChange={onInputChange}
            />
            {errors.policyName && <p className="text-danger">{errors.policyName}</p>}
        </div>

        <div className="col-md-4">
            <label htmlFor="policyVersion" className="form-label">
                Policy Version
            </label>
            <input
                type="text"
                className="form-control"
                placeholder="Enter Policy Version"
                name="policyVersion"
                value={policyVersion}
                onChange={onInputChange}
            />
            {errors.policyVersion && <p className="text-danger">{errors.policyVersion}</p>}
        </div> */}

        <div className="offset-lg-3 col-lg-6">
         <div className="container">     
  
    <div className="row">
        <div className="col-lg-6">
        <div className="form-group" style={{textAlign:"left"}}>
            <label >Policy Name </label>
            <input type="text" placeholder="Enter Policy Name"   name="policyName"
             value={policyName} onChange={onInputChange} className="form-control">                
            </input>
            {errors.policyName && <p className="text-danger">{errors.policyName}</p>}
        </div>
    </div>
       

    <div className="col-lg-6">
        <div className="form-group" style={{textAlign:"left"}}>
            <label>Policy Version </label>
            <input type="text" placeholder="Enter Policy Version" value={policyVersion}
            name="policyVersion"   onChange={onInputChange}
            className="form-control"></input>
        </div>
        {errors.policyVersion && <p className="text-danger">{errors.policyVersion}</p>}
    </div>
</div>

<div className="row" style={{marginTop:"15px"}}>
        <div className="col-lg-6">
        <div className="form-group">
            <label>Policy Type</label>
            <select
                className="form-control"
                name="policyType"
                value={policyType}
                onChange={onInputChange}
            >
                <option value="-1">--Please Select--</option>
                <option value="Default">Default</option>
                <option value="Custom">Custom</option>
            </select>
            {errors.policyType && <p className="text-danger">{errors.policyType}</p>}
        </div>
    </div>


    {(policyType === 'Default' || policyType === 'Custom') && (
    <div className="col-lg-6">
        <div className="form-group">
            <label>File Path </label>
            <input type="text" placeholder="Enter File Path" value={filePath}
            name="filePath"   onChange={onInputChange}
            className="form-control"></input>
        </div>
        {errors.filePath && <p className="text-danger">{errors.filePath}</p>}
    </div>

    )}
</div>

{(policyType === 'Default' || policyType === 'Custom') && (
<div className="row" style={{marginTop:"15px"}}>
        <div className="col-lg-6">
        <div className="form-group">
            <label>Parameter Type</label>
            <MultiSelect
                        options={options}
                        value={parameterType}
                        onChange={onMultiSelectChange}
                        labelledBy="Select Parameter Types"
                    />
            {errors.parameterType && <div className="text-danger">{errors.parameterType}</div>}
        </div>
    </div>

    </div>
)}


</div>
</div>


        {/* <div className="col-md-4">
            <label htmlFor="policyType" className="form-label">
                Policy Type
            </label>
            <select
                className="form-control"
                name="policyType"
                value={policyType}
                onChange={onInputChange}
            >
                <option value="-1">--Please Select--</option>
                <option value="Default">Default</option>
                <option value="Custom">Custom</option>
            </select>
        </div> */}

        {/* {(policyType === 'Default' || policyType === 'Custom') && (
            <>
                <div className="col-md-4" style={{ marginTop: "15px" }}>
                    <label htmlFor="filePath" className="form-label">
                        File Path
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter File Path"
                        name="filePath"
                        value={filePath}
                        onChange={onInputChange}
                    />
                    {errors.filePath && <p className="text-danger">{errors.filePath}</p>}
                </div>

                <div className="col-md-4" style={{ marginTop: "15px" }}>
                    <label htmlFor="parameterType" className="form-label">
                        Parameter Type
                    </label>
                    <MultiSelect
                        options={options}
                        value={parameterType}
                        onChange={onMultiSelectChange}
                        labelledBy="Select Parameter Types"
                    />
                    {errors.parameterType && <div className="text-danger">{errors.parameterType}</div>}
                </div>
            </>
        )} */}

        <div className="col-md-12 center" style={{ marginTop: "2%" }}>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-warning" onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
        </div>
    </div>
            
                </div>
                <div className='col-md-1'></div>
            </div>
        </>
   
// </div>
);
}

export default CreateFileMonitoringPolicy;