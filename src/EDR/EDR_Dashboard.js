import React from 'react'
import Navbar from './Header/Navbar'
import MainDashboard from './MainDashboard/MainDashboard'
import Sidebar from './Sidebar/Sidebar'
import UESM_Header from '../UESM_Dashboard/UESM_Header/UESM_Header'

function EDR_Dashboard() {
  return (
    <div>
      {/* <Navbar/> */}
      <UESM_Header/>
      <div className='row'>
<div className='col-md-2'>
<Sidebar/>
</div>

<div className='col-md-10'>
<MainDashboard/>
</div>

      </div>
      
      
      


    </div>
  )
}

export default EDR_Dashboard
