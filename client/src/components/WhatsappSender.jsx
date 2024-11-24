import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const WhatsAppSender = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!phoneNumber || !message) {
      alert('Please enter both a phone number and a message.');
      return;
    }

    const formattedNumber = phoneNumber.replace(/[+94761136338]/g, '');
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Container style={{ padding: '20px', maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Send WhatsApp Message</h2>
      <Form>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number (with country code):</Form.Label>
          <Form.Control
            type="text"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Row className="text-center">
          <Col>
            <Button variant="primary" onClick={sendMessage}>
              Send WhatsApp Message
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default WhatsAppSender;