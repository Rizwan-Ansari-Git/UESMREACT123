import React from 'react'

import TSS_SIDEBAR from './TSS_SIDEBAR'
import UESM_Header from '../UESM_Dashboard/UESM_Header/UESM_Header'
import MainDashboard from '../EDR/MainDashboard/MainDashboard'
import TSS_MAINDASH from './TSS_MAINDASH'

function TSS_DASH() {
  return (
    <div>
      {/* <Navbar/> */}
      <UESM_Header/>
      <div className='row'>
<div className='col-md-2'>
<TSS_SIDEBAR/>
</div>

<div className='col-md-10'>
<TSS_MAINDASH/>
</div>

      </div>
      
      
      


    </div>
  )
}

export default TSS_DASH
