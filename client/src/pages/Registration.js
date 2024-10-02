import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5002/register', formData);
      setUser(res.data.user); // Set the user in the global state
      setMessage('User registered successfully');
      navigate('/'); // Redirect to the main page
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div style={{ margin: '50px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2>Registration Page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            placeholder="Enter your name" 
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Password" 
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationPage;
