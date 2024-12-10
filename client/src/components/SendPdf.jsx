import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/sendfile");
      setAllPdf(response.data.data); 
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

 
    try {
      const response = await axios.post("http://localhost:3001/uploadfile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 200) {
        alert("Upload Successful!");
        fetchPdfs(); 
      } else {
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error?.message || error); // Safe access with optional chaining
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Send PDF</h1>
      <Form onSubmit={handlePdfUpload}>
        <Form.Group controlId="formPdfTitle">
          <Form.Label>PDF Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter PDF title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Select PDF File</Form.Label>
          <Form.Control 
            type="file" 
            accept="application/pdf" 
            onChange={(e) => setFile(e.target.files[0])}
            required 
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <hr />
      <h2>Uploaded PDFs</h2>
      <ul>
        {allPdf.map((pdf, index) => (
          <li key={index}>{pdf.title}</li>
        ))}
      </ul>
    </Container>
  );
}

export default SendPdf;
