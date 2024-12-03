import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';

const AddToCart = () => {

  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
  ];
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container style={{ padding: '20px' }}>
      <h2 className="text-center mb-4">Add to Cart with Payment</h2>

      <Row>
        {/* Product List */}
        <Col md={8}>
          <h4>Products</h4>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={6} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Cart and Payment Section */}
        <Col md={4}>
          <h4>Cart</h4>
          <Card>
            <Card.Body>
              <h5>
                Items in Cart <Badge bg="secondary">{cart.length}</Badge>
              </h5>
              {cart.length > 0 ? (
                <>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${item.price}
                      </li>
                    ))}
                  </ul>
                  <h5 className="mt-3">Total: ${totalPrice.toFixed(2)}</h5>
                  <Button variant="success" className="mt-2">
                    Proceed to Payment
                  </Button>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddToCart;