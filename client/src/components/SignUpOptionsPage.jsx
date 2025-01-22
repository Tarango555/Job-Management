import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope } from 'react-icons/fa';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useNavigate } from 'react-router-dom';

const SignUpOptionsPage = () => {

    const navigate = useNavigate();

    const { googleSignUp, emailSignUp } = useGoogleAuth();

    const handleGoogleSignUp = async () => {
        try {
            googleSignUp();
        } catch (error) {
            console.error("Google sign-up error:", error.message);
            alert("Failed to sign up with Google. Please try again.");
            alert('error')
        }
    };


    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
                    <Card
                        onClick={ handleGoogleSignUp }
                        className="text-center shadow-lg p-3"
                        style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <Card.Body>
                            <FcGoogle size={40} className="mb-3" />
                            <Card.Title className="fs-4">Sign up with Google</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={10} md={6} lg={4} className="mb-3">
                    <Card
                        onClick={() => navigate('/request-email')}
                        className="text-center shadow-lg p-3"
                        style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <Card.Body>
                            <FaEnvelope size={40} className="mb-3 text-primary" />
                            <Card.Title className="fs-4">Sign up with Email</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpOptionsPage;
