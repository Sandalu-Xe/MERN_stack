import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (formData.age <= 0) {
      enqueueSnackbar('Age must be greater than 0.', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3001/adduser', formData);
      enqueueSnackbar('User added successfully!', { variant: 'success' });
      setFormData({
        name: '',
        email: '',
        address: '',
        age: '',
      });
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || 'An error occurred. Please try again.',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '50px' }}>
      <h2>Add User</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Address Field */}
        <Form.Group controlId="formAddress" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Age Field */}
        <Form.Group controlId="formAge" className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1" // Enforces minimum age validation on the client side
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Add User'}
        </Button>
      </Form>
    </Container>
  );
}

export default AddUser;
