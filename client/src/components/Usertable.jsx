import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, InputGroup, Row, Col, Container, Input, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Usertable = () => {
  const [users, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', age: '' });
  const componentRef = useRef();
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const createdUser = await response.json();
      setItems((prevUsers) => [...prevUsers, createdUser]);
      setNewUser({ name: '', email: '', address: '', age: '' });
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'DELETE',
        });
        setItems((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Update a user
  const handleUpdate = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  // Generate PDF
  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Users_Report.pdf');
  };

  // Filtered users for search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container>
        {/* Create User Form */}
        <Row className="mb-4">
          <Col xs={12}>
            <h3>Create User</h3>
            <Form onSubmit={handleCreateUser} className="mb-4">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      value={newUser.address}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="age">Age</Label>
                    <Input
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter age"
                      value={newUser.age}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Create User
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Search and Actions */}
        <Row className="mb-4">
          <Col xs={12} md={8}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search by name, email, or address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <Button color="secondary" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </Col>
        </Row>

        {/* User Table */}
        <div ref={componentRef}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.age}</td>
                  <td>
                    <Button color="primary" onClick={() => handleUpdate(user._id)} className="me-2">
                      Update
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Usertable;
