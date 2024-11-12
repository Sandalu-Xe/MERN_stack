import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    console.log('Login details:', { email, password });
    
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('Login successful:', response.data);
      setLoading(false);
      enqueueSnackbar('User registration successful', { variant: 'success' });
      navigate('/');

      // Perform actions on successful login
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
      enqueueSnackbar('Error occurred during registration', { variant: 'error' });
      console.error(error);
      // Handle login error
    }
  };
  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
