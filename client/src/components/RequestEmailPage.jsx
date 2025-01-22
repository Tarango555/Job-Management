import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";
import { sendCodeToEmail } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const RequestEmailPage = () => {
  const { selectedEmail, setEmail } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    try {
      const result = await sendCodeToEmail(selectedEmail);
      if (result.status !== 200) {
        navigate("/not-found");
      } else {
        navigate("/verify-code-page");
      }
    } catch (error) {
      console.error("Error sending code:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded-3"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Verify Your Email</h3>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded py-3"
          />
        </Form.Group>
        <Button
          type="submit"
          className="w-100 rounded py-2 d-flex align-items-center justify-content-center"
          variant="primary"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Sending...
            </>
          ) : (
            "Send Verification Code"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default RequestEmailPage;
