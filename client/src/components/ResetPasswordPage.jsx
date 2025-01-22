import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import apiClient from '../api/apiClient.js';

const ResetPasswordPage = () => {
    const { token } = useParams(); // Extract token from URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        setIsLoading(true);
        try {
            // Make API call to reset password
            await apiClient.post(`/reset-password/${token}`, { password });
            setMessage('Your password has been reset successfully.');
            setError('');

            // Optionally redirect to login after success
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
            setMessage('');
        }
    };

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
        >
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-center mb-4">Reset Password</h2>

                        {/* Success and Error Messages */}
                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Reset Password Form */}
                        <Form onSubmit={handleResetPassword}>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Enter your new password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    style={{ height: '48px', fontSize: '16px' }}
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
                            <Button
                                type="submit"
                                className="w-100"
                                disabled={isLoading}
                                style={{
                                    backgroundColor: '#007bff',
                                    borderColor: '#007bff',
                                    height: '48px',
                                    fontSize: '16px',
                                }}
                            >
                                {isLoading ? 'Password Resetting...' : 'Submit'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordPage;
