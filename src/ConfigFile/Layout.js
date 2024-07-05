// Layout.js
import React from 'react';
import Navbar from '../EDR/Header/Navbar'
import Sidebar from '../EDR/Sidebar/Sidebar'
import UESM_Header from '../UESM_Dashboard/UESM_Header/UESM_Header';



const Layout = ({ children }) => {
  return (

    <div>
    
    <UESM_Header/>
       <div className='row'>
       <div className='col-md-2'>
       <Sidebar/>
       </div>
       <div className='col-md-10'>
       {children}
       </div>
       
       
       </div>
  
    </div>


  );
};

export default Layout;
