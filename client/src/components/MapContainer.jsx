import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: "500px",
    width: "100%",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  };

  const defaultCenter = {
    lat: 8.3114, // Latitude for Thalawa, Anuradhapura, Sri Lanka
    lng: 80.4037, // Longitude for Thalawa, Anuradhapura, Sri Lanka
  };

  const [selectedLocation, setSelectedLocation] = React.useState(null);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h3>Our Location</h3>
            </Card.Header>
            <Card.Body>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={12}
                  center={defaultCenter}
                  options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    styles: [
                      {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [
                          { "saturation": "-100" },
                          { "lightness": "40" }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          { "visibility": "simplified" },
                          { "color": "#ffcc00" }
                        ]
                      }
                    ],
                  }}
                >
                  {/* Marker at default location */}
                  <Marker 
                    position={defaultCenter} 
                    onClick={() => setSelectedLocation(defaultCenter)}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      scaledSize: new window.google.maps.Size(50, 50),
                    }}
                  />

                  {/* InfoWindow for marker */}
                  {selectedLocation && (
                    <InfoWindow
                      position={defaultCenter}
                      onCloseClick={() => setSelectedLocation(null)}
                    >
                      <div>
                        <h4>Thalawa, Anuradhapura</h4>
                        <p>Welcome to our location in Sri Lanka!</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MapContainer;
