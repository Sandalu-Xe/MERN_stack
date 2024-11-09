import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

 
    const navigate = useNavigate();


    const handleSubmit = () => {
        const data = {
         name,
         email,
         password,  
         address,
         age,

        };
        setLoading(true);
        axios
          .post('http://localhost:3001/signup', data)
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
          });
      };

    return (
        <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
            <h2>Add User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
         

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formAddress" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formAge" className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter age"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit} >
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddUser;