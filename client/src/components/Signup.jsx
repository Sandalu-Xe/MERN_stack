import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleSubmit = () => {
    const data = {
     name,
     email,
     password,
     confirmPassword
    };

    setLoading(true);

    axios
      .post('http://localhost:3002/signup', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('user regidtrtion sucessfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
        navigate('/login');
      });
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formconfirmPassword" className="mb-3">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={handleSubmit} >
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default SignupForm;


