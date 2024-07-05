import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './UESM_Logout';
import {jwtDecode} from 'jwt-decode';

export default function UESM_Header() {


  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [roleType, setroleType] = useState('');




  useEffect(() => {
    const username1 = localStorage.getItem('username');
    const roleType1 = localStorage.getItem('roleType');
    if (username1) {
   
      setUsername(username1); // Adjust based on your token's structure
      setroleType(roleType1)
    }
  }, []);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(197 152 206)" }}>
        <div className="container-fluid">
          <a className="navbar-brand center" href='/UESM__Dashboard'>UESM</a>
          <button 
            className="navbar-toggler" type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogoutClick}>
              {username}
            </button>
          </div>
        </div>
      </nav>




      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Logout</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
              Username: {username}<br />
              Role Type: {roleType}
              </div>
              <div className="modal-footer">
                <Logout />
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
