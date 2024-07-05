import React from 'react'
import DeviceUpDown_PieChart from './DeviceUpDown_PieChart';
import USBAllowAndPrevention_PieChart from './USBAllowAndPrevention_PieChart';
import ThreatDetection_PieChart from './ThreatDetection_PieChart';
import FileMonitoring_PieChart from './FileMonitoring_PieChart';


function DeviceControlDashboard() {
  return (
    <div style={{marginLeft:"5%",backgroundColor:"#f6f4f4"}}>

      <div className='row' style={{marginTop:"2%"}}>

      <div className='card col-md-5'>
        <h4>Devcie Up and Down</h4>
        <DeviceUpDown_PieChart/>
        </div>

        <div className='col-md-1'></div>
        <div className='card col-md-5'>
        <h4>USB  Allow And  Prevent Detection</h4>
        <USBAllowAndPrevention_PieChart/>
        </div>

      </div>




      <div className='row' style={{marginTop:"2%"}}>

      <div className='card col-md-5'>
        <h4>Threat Detection By EndPoints</h4>
        <ThreatDetection_PieChart/>

        </div>
        <div className='col-md-1'></div>
        <div className='card col-md-5'>
        <h4>File Monitoring</h4>
        <FileMonitoring_PieChart/>
        </div>

      </div>

      <div>
  
      </div>
    </div>
  )
}

export default DeviceControlDashboard
