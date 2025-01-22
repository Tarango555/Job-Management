import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/authApi";

const SignUpForm = () => {
  const { selectedEmail, clearEmail, selectedRole, clearRole } = useAuthStore(); // Prefilled values from store
  const [email] = useState(selectedEmail || ""); // Prefilled email
  const [name, setName] = useState("");
  const [role] = useState(selectedRole || ""); // Prefilled role
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp({ name, email, role, password });
      if (result.status === 201) {
        clearRole();
        clearEmail();
        alert(`${result.data.message}`);
        navigate("/login");
      } else {
        console.error("Sign-up failed:", result);
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded-3"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
        {/* Name Field */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="name"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="rounded py-3"
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            autoComplete="email"
            value={email}
            readOnly // Prefilled and not editable
            className="rounded py-3"
          />
        </Form.Group>

        {/* Role Field */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Your Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your role"
            name="role"
            autoComplete="organization-title"
            value={role}
            readOnly // Prefilled and not editable
            className="rounded py-3"
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="rounded py-3"
          />
        </Form.Group>

        {/* Confirm Password Field */}
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            className="rounded py-3"
          />
        </Form.Group>

        {/* Submit Button */}
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
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpForm;
