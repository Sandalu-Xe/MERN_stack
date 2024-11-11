import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Button, Form, Container } from 'react-bootstrap';

const EditUser = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/edituser/${id}`)
    .then((response) => {

        setName(response.data.name);
        setEmail(response.data.email)
        setAge(response.data.age)
        setAddress(response.data.address)
        
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditUser = () => {
    const data = {
        name,
        email,
        address, 
        age,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3001/edituser/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/users');
      })
      .catch((error) => {
        setLoading(false);
  
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
<Container style={{ maxWidth: '500px', marginTop: '50px' }}>
            <h2>Edit User</h2>
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
        </Container>
  );
};

export default EditUser;
