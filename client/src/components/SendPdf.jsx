import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function PdfUpload() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [allPdfs, setAllPdfs] = useState([]);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const result = await axios.get('http://localhost:3001/pdfs');
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error.message);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a PDF before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const result = await axios.post('http://localhost:3001/uploadpdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (result.data.status === 200) {
        alert('PDF uploaded successfully!');
        setTitle('');
        setFile(null);
        fetchPdfs(); 
      }
    } catch (error) {
      console.error('Error uploading PDF:', error.message);
      alert('Error uploading PDF');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Upload PDF</h1>
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
          <Form.Label>Select PDF</Form.Label>
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

      <h2 className="mt-5">Uploaded PDFs</h2>
      {allPdfs.length > 0 ? (
        <ListGroup>
          {allPdfs.map((pdf) => (
            <ListGroup.Item key={pdf.id}>
              <p>{pdf.title}</p>
              <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No PDFs uploaded yet.</p>
      )}
    </Container>
  );
}

export default PdfUpload;
