import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, InputGroup, Row, Col, Container, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Usertable = () => {
  const [users, setItems] = useState([]);
  const navigate = useNavigate();
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
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
    navigate(`/edituser/${userId}`);
    console.log('Update user with ID:', userId);
  };

  // Function to generate and download PDF
  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("Users_Report.pdf");
    alert("Users Report Successfully Downloaded!");
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const haddlesenduserreport=()=>{
    const phonenumber="+94761136338";
    const messesge="selected user reports";
 
  }

  return (
    <>

<Container>
      <Row className="mb-4">
        <Col xs={12} md={8}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Search by name, email, or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-sm"
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
          <Button color="secondary" onClick={handleDownloadPDF} className="shadow-sm">
            Download PDF
          </Button>
        </Col>
      </Row>

      <div ref={componentRef}>
        <Table striped bordered hover className="shadow-sm">
          <thead className="table-dark">
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
                  <Button color="primary" onClick={() => handleUpdate(user._id)} className="me-2 shadow-sm">
                    Update
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(user._id)} className="shadow-sm">
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
