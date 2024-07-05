import React from 'react'
import UESM_Header from './UESM_Header/UESM_Header'
import UESM_Sidebar from './UESM_Sidebar/UESM_Sidebar'
import MainDashboard from '../EDR/MainDashboard/MainDashboard'
// import UESM_Footer from './UESM_Footer';


function UESM__Dashboard() {
  return (
    <div>
    
       <UESM_Header/>
       <div className='row'>
       <div className='col-md-2'>
       <UESM_Sidebar/>
       </div>
       <div className='col-md-10'>
       <MainDashboard/>
       </div>
       
       
       </div>
      {/* <UESM_Footer/> */}

    </div>
  )
}

export default UESM__Dashboard
