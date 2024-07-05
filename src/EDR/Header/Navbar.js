import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../../UESM_Dashboard/UESM_Header/UESM_Logout'


export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(54 53 54)"}}>
  <div className="container-fluid">
    <a className="navbar-brand center" href='/EDR_Dashboard' >EndPoint Detection & Response</a>
    <h1></h1>
    <button 
    
    className="navbar-toggler" type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" 
    aria-expanded="false" 
    aria-label="Toggle navigation">

      <span className="navbar-toggler-icon"></span>
    </button>



    
  </div>
  <Logout/>
</nav>

    </div>
  )
}
