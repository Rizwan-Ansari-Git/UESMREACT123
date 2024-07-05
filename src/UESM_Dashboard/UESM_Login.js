// UESM_Login.js
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Form, Button, Alert ,Container,Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UESM_Login.css'
import loginImage from '../Images/Cyber-Security-Icon-Concept-2-1.jpeg';
import Logout from './UESM_Header/UESM_Logout';


const UESM_Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      const response = await fetch('http://192.168.0.89:9191/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });


      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setError('');
      
       const sessionExpiration = new Date().getTime() + 30 * 60 * 1000; // 30 minutes from now
        localStorage.setItem('auth', 'true');
        localStorage.setItem('roleType', data.data.roleType);
        localStorage.setItem('jwtToken', data.data.jwtToken); // Store JWT token
        localStorage.setItem('username', data.data.username); // Store JWT token
        localStorage.setItem('sessionExpiration', sessionExpiration);

       

    //     console.log(" cddcv      "+data.data.jwtToken);


    // // navigate('/UESM__Dashboard');
    // navigate('/UESM__Dashboard');


        if(data.data.roleType==='Admin')
          {
            navigate('/Admin'); 
           
          }else{
           
            navigate('/UESM__Dashboard');
            
           }

       
      } else {
        setError(data.errorMessage || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };



  return (

    <div className="container" style={{backgroundColor:"#black",marginTop:"10%"}}>
    <Container className="mt-5">
      <Card className="login-card" 
      style={{marginLeft: "14%",marginTop: "-7%", backgroundColor:"#12151e"}} >
  
        <div className="row g-0">
        {/* <div className="col-md-6">
              <Card.Img
                src={loginImage} // Use the imported image
                alt="login form"
                className="img-fluid rounded-start"
              />
            </div> */}
          <div className="col-md-6">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-4"  style={{color:"white"}}>Sign In</Card.Title>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label  style={{color:"white"}}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label  style={{color:"white"}}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <br></br>
                </Form.Group>
                <Button  className="btn btn-primary" type="submit" >
                  Login
                </Button>
        
            
              </Form>
              
            </Card.Body>
          </div>

          <div className="col-md-6">
              <Card.Img
                src={loginImage} // Use the imported image
                alt="login form"
                className="img-fluid rounded-end"
              />
            </div>
        </div>
      </Card>

      
    </Container>
  </div>
);
};

export default UESM_Login;
