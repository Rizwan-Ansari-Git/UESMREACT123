import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-dropdown-select';
import Api from "../../../../ConfigFile/Api";

function ApplyFileMonitoringPolicy() {
  const [options, setOptions] = useState([]);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [policyOptions, setPolicyOptions] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState([]);
  const [errors, setErrors] = useState({});

  // get api for endpoint ip address
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/AppControl/EndPointList`);
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

  // get api for policy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`/filePolicy/PolicyNameList`);
        const data = response.data.data.PolicyNameList;

        // Format the data for Select component
        const policies = data.map(policy => ({
          label: policy.policy_name,
          value: policy.policy_name
        }));

        setPolicyOptions(policies); // Update policy options state with formatted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMultiSelectChange = (selectedList) => {
    setSelectedMulti(selectedList);
    if (selectedList.length > 0) {
      setErrors({ ...errors, selectedMulti: "" });
    }
  };

  const handlePolicySelectChange = (values) => {
    setSelectedPolicy(values);
    if (values.length > 0) {
      setErrors({ ...errors, selectedPolicy: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (selectedMulti.length === 0) {
      errors.selectedMulti = "At least one endpoint must be selected.";
    }
    if (selectedPolicy.length === 0) {
      errors.selectedPolicy = "Please select a policy name.";
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

    const submissionData = selectedMulti.map(endpoint => ({
        actualIp: endpoint.value,
        policies: selectedPolicy.map(policy => policy.value)
      }));
      
      console.log("submissionData: " + JSON.stringify(submissionData));
    //   try {
    //     const response = await axios.post('http://192.168.0.66:9191/api/v1/AppControl/allowApplication', submissionData);
    //     console.log('Data submitted successfully:', response.data);
    //   } catch (error) {
    //     console.error('Error submitting data:', error);
    //   }
    };

  const handleReset = () => {
    setSelectedMulti([]);
    setSelectedPolicy([]);
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
                <div className='col-md-2'></div>
                <div className='col-md-8 card' style={form}>
      <div style={{ marginTop: "2%",textAlign: 'center'}}><h2>Apply Policy</h2></div>
      <div className="row" style={{marginTop:"2%"}}>
        <div className="col-md-5">
          <label htmlFor='Name' className='form-label'>
            Select EndPoint
          </label>
          <MultiSelect
            options={options}
            value={selectedMulti}
            onChange={handleMultiSelectChange}
            labelledBy={"Select"}
            isCreatable={true}
          />
          {errors.selectedMulti && <p className="text-danger">{errors.selectedMulti}</p>}
        </div>

        <div className="col-md-5">
          <label htmlFor='Name' className='form-label'>
            Select Policy
          </label>
          <Select
            options={policyOptions}
            onChange={handlePolicySelectChange}
            values={selectedPolicy}
          />
          {errors.selectedPolicy && <p className="text-danger">{errors.selectedPolicy}</p>}
        </div>

        <div className="col-md-12 center" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3%', marginBottom:"1%"}}>
          <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
          <button onClick={handleReset} style={{ marginLeft: "10px" }} className="btn btn-danger">Reset</button>
        </div>
      </div>
      </div>
      <div className='col-md-2'></div>
      </div>
    </>
  );
}

export default ApplyFileMonitoringPolicy;
