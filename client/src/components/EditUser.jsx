import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Button, Form, Container, Spinner } from 'react-bootstrap';

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/edituser/${id}`)
      .then((response) => {
        const { name, email, age, address } = response.data;
        setName(name);
        setEmail(email);
        setAge(age);
        setAddress(address);
      })
      .catch((error) => {
        enqueueSnackbar('Failed to fetch user data', { variant: 'error' });
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [id, enqueueSnackbar]);

  const handleEditUser = () => {
    const data = { name, email, address, age };
    setLoading(true);

    axios.put(`http://localhost:3001/edituser/${id}`, data)
      .then(() => {
        enqueueSnackbar('User edited successfully', { variant: 'success' });
        navigate('/users');
      })
      .catch((error) => {
        enqueueSnackbar('Error updating user', { variant: 'error' });
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
      <h2>Edit User</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" className="w-100" onClick={handleEditUser}>
            Save
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default EditUser;
