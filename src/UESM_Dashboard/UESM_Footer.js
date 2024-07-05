import React from 'react'
import { Link } from 'react-router-dom'

function UESM_Footer() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(54 53 54)"}}>
  <div className="container-fluid">
    <a className="navbar-brand center" href='/EDR_Dashboard' >Footer</a>
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
  <Link to="/logout" className="btn btn-danger">Velox Solutions</Link>
</nav>

    </div>
  )
}

export default UESM_Footer





