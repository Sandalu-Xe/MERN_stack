import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Table } from 'react-bootstrap';

const Usertable = () => {
  const [users, setItems] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchusers();
  }, []);

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  );
};

export default Usertable;
