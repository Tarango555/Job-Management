import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import apiClient from '../api/apiClient.js';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await apiClient.post('/forgot-password', { email });
            setMessage('Password reset link has been sent to your email.');
            setError('');
        } catch (err) {
            setError('Unable to process your request. Please try again.');
            setMessage('');
        } finally {
            setIsLoading(false);
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
                        <h2 className="text-center mb-4">Forgot Password</h2>

                        {/* Success and Error Messages */}
                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Forgot Password Form */}
                        <Form onSubmit={handleForgotPassword}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Enter your email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email" // Added autocomplete attribute
                                    style={{ height: '48px', fontSize: '16px' }}
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
                                {isLoading ? 'Processing...' : 'Submit'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPasswordPage;
