import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { jwtDecode } from 'jwt-decode';



const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5002/login', formData);
      const token = res.data.token;
  
      if (token) {
        // Store the token in localStorage
        localStorage.setItem('token', token);
  
        // Decode the token and set the user
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
  
        // Redirect to the home page
        navigate('/');
      }
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div style={{ margin: '50px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
