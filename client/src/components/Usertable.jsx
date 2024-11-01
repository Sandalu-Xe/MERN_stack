import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Usertable = () => {
  const [users, setItems] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchusers();
  }, []);
 
  return (
    <Form>
      <FormGroup>
        <Label for="itemSelect">Select Item</Label>
        <Input type="select" name="item" id="itemSelect">
          {users.map(users => (
            <option key={users._id} value={users.name}>
             Name- {users.name} ,, email- {users.email}
            </option>
          ))}
        </Input>
      </FormGroup>
    </Form>
  );
};

export default Usertable;
