import React, { useState } from 'react';
import { Form, Button, Alert, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setName] = useState(" ");


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
      // Generate preview
    }
  };


  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      setMessage('');

      // Replace the URL with your backend endpoint
      const response = await axios.post('http://localhost:3001/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully!');
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Photo Upload</h3>
      <Form.Group controlId="formPdfTitle">
          <Form.Label>Photo name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter PDF title" 
            value={title}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </Form.Group>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select a photo to upload</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {preview && (
          <div className="text-center mb-3">
            <Image src={preview} thumbnail style={{ maxHeight: '200px' }} />
          </div>
        )}

        <div className="text-center">
          <Button variant="primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" /> Uploading...
              </>
            ) : (
              'Upload Photo'
            )}
          </Button>
        </div>
      </Form>

      {message && (
        <Alert variant={message.includes('successfully') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default PhotoUpload;
