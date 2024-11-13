import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:3001/getFile");
      console.log(result.data.data);
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:3001/uploadfile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log(result);

      if (result.data.status === 200) {
        alert("Upload Success");
        getpdf();  // Refresh the list of PDFs after upload
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error Uploading");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Send PDF</h1>
      <Form onSubmit={submitPdf}>
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
            onChange={(e) => saveFile(e.target.files[0])}
            required 
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SendPdf;
