import React, { useState, useEffect ,useRef } from 'react';
import { Table, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import{componentRef} from 'react-to-print';



const Usertable = () => {
  const [users, setItems] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    // Proceed with deletion only if confirmed
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'DELETE',
        });
        setItems((prevUsers) => prevUsers.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  const handleUpdate = (userId) => {
    // Logic to handle updating a user (e.g., open a modal or navigate to an edit page)
    navigate(`/edituser/${userId}`);
    console.log('Update user with ID:', userId);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });
  

  return (<>
   <Table striped bordered hover>
    <div ref={componentRef}>
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
        {users.map((user, index) => (
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
      </div>
    </Table>
    <Button onClick={handlePrint}>download PDF</Button>
  </>
   
  );
};

export default Usertable;
