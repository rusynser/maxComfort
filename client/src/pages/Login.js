import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginSuccess(true);
  };

  return (
    <div style={{ margin: '50px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h2>Login Page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {loginSuccess && (
        <Alert variant="success" className="mt-3">
          Login successful!
        </Alert>
      )}
    </div>
  );
};

export default LoginPage;