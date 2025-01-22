import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";

const Dashboard = () => {

  const navigate = useNavigate();
  const { auth, clearAuth } = useAuthStore(); // Access global state
  const user = auth.user || {};

  // Construct image URL for the user's profile image
  const userImageUrl = user.image
    ? `http://localhost:8080/${user.image}` // Assuming your backend serves the image from this path
    : "https://via.placeholder.com/150"; // Placeholder image if no image is available

  const handleLogout = () => {
    clearAuth();
    navigate('/login'); // Redirect to login
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body className="text-center">
              {/* User Image */}
              <div className="mb-4">
                <img
                  src={userImageUrl}
                  alt={user.name || "User"}
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #0d6efd",
                  }}
                />
              </div>

              {/* User Info */}
              <h2 className="fw-bold text-primary">{user.name || "Guest"}</h2>
              <p className="text-muted">{user.email || "guest@example.com"}</p>
              <p className="badge bg-info text-dark fs-6">
                {user.role || "Role not specified"}
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" className="me-3">
                  Edit Profile
                </Button>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
