import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function PhotoUpload() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);

  // Fetch photos on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const result = await axios.get('http://localhost:3001/photos');
      setAllPhotos(result.data.data); // Ensure the API response structure matches this
    } catch (error) {
      console.error('Error fetching photos:', error.message);
    }
  };

  const submitPhoto = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a photo before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const result = await axios.post('http://localhost:3001/uploadphoto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (result.data.status === 200) {
        alert('Photo uploaded successfully!');
        setTitle('');
        setFile(null);
        fetchPhotos(); // Refresh the photo list after upload
      }
    } catch (error) {
      console.error('Error uploading photo:', error.message);
      alert('Error uploading photo');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Upload Photo</h1>
      <Form onSubmit={submitPhoto}>
        <Form.Group controlId="formPhotoTitle">
          <Form.Label>Photo Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Select Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        {file && (
          <div className="mt-3">
            <Image src={URL.createObjectURL(file)} thumbnail style={{ maxHeight: '200px' }} />
          </div>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <h2 className="mt-5">Uploaded Photos</h2>
      {allPhotos && allPhotos.length > 0 ? (
        <ListGroup>
          {allPhotos.map((photo) => (
            <ListGroup.Item key={photo.id}>
              <p>{photo.title}</p>
              <img
                src={`http://localhost:3001/${photo.url}`} // Ensure the backend returns the correct relative path
                alt={photo.title}
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No photos uploaded yet.</p>
      )}
    </Container>
  );
}

export default PhotoUpload;
