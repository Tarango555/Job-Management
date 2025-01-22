import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
    onGoogleLogin,
    onHandleSubmit,
    onEmailChange,
    onPasswordChange,
    onHandleForgotPassword,
    isSigningIn,
    errorMessage,
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordToggle = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
        >
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="bg-white p-4 rounded shadow" style={{ padding: "3rem 2rem" }}>
                        <h2 className="text-center mb-2">Sign-in</h2>
                        <p className="text-center text-muted my-4">Welcome back! Please log in to continue.</p>

                        {/* Show Error Alert */}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        {/* Google Sign-In Button */}
                        <div className="w-100 mb-3">
                            <GoogleButton
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                                type="light"
                                onClick={onGoogleLogin}
                            />
                        </div>

                        {/* Divider */}
                        <div className="d-flex align-items-center mb-3">
                            <hr className="flex-grow-1" />
                            <span className="mx-2 text-muted">OR</span>
                            <hr className="flex-grow-1" />
                        </div>

                        {/* Email and Password Form */}
                        <Form onSubmit={onHandleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-4">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    aria-label="Email"
                                    autoComplete="email"
                                    style={{
                                        height: "48px",
                                        fontSize: "16px",
                                        padding: "0.5rem 1rem",
                                    }}
                                    onChange={onEmailChange}
                                    required
                                    />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-4 position-relative">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    aria-label="Password"
                                    autoComplete="current-password"
                                    style={{
                                        height: "48px",
                                        fontSize: "16px",
                                        padding: "0.5rem 1rem",
                                    }}
                                    onChange={onPasswordChange}
                                    required
                                />
                                <span
                                    className="position-absolute"
                                    style={{
                                        right: "10px",
                                        top: "12px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </Form.Group>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Form.Check
                                    type="checkbox"
                                    id="rememberMe" // Adds an id attribute
                                    name="rememberMe" // Adds a name attribute
                                    label="Remember me" // Retains the label for accessibility
                                    style={{ fontSize: "14px" }}
                                />
                                <a
                                    onClick={onHandleForgotPassword}
                                    href="#forgot-password"
                                    className="text-muted"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <Button
                                type="submit"
                                className="w-100"
                                disabled={isSigningIn} // Disable button while signing in
                                style={{
                                    backgroundColor: isSigningIn ? "#6c757d" : "#007bff", // Optional: Change button color
                                    borderColor: isSigningIn ? "#6c757d" : "#007bff",
                                    height: "48px",
                                    fontSize: "16px",
                                }}
                            >
                                {isSigningIn ? "Signing in..." : "Sign in"}
                            </Button>

                        </Form>

                        {/* Sign-Up Link */}
                        <div className="text-center mt-4">
                            <span>
                                Don't have an account?{" "}
                                <span
                                    onClick={() => navigate("/role-page")}
                                    className="text-primary"
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    Create it now
                                </span>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Media Query for Padding Adjustment */}
            <style>
                {`
                    @media (min-width: 768px) {
                        .bg-white {
                            padding: 4rem 3rem;
                        }
                    }
                    @media (min-width: 1200px) {
                        .bg-white {
                            padding: 5rem 4rem;
                        }
                    }
                `}
            </style>
        </Container>
    );
};

export default LoginForm;