import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaUserTie, FaUserFriends, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const RolePage = () => {
    const { selectedRole, setRole } = useAuthStore();
    const navigate = useNavigate();

    const buttonText = {
        client: "Continue as Client",
        freelancer: "Continue as Freelancer",
        both: "Continue as Both",
    };

    const handleContinue = () => {
        navigate("/sign-up-options");
    };

    return (
        <Container className="py-5">
            <h1 className="display-3 text-center mb-5">Choose Your Role</h1>

            <Row className="justify-content-center mb-4">
                {["client", "freelancer", "both"].map((role) => (
                    <Col key={role} xs={12} sm={6} md={4} className="mb-3">
                        <Card
                            className={`shadow border-0 rounded-4 ${
                                selectedRole === role ? "bg-primary text-white" : ""
                            }`}
                            onClick={() => setRole(role)}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                                {role === "client" && <FaUserTie size={50} className="mb-3" />}
                                {role === "freelancer" && <FaUserFriends size={50} className="mb-3" />}
                                {role === "both" && <FaUsers size={50} className="mb-3" />}
                                <Card.Title className="fs-4 mb-3">{role.charAt(0).toUpperCase() + role.slice(1)}</Card.Title>
                                <Form.Check
                                    type="radio"
                                    name="role"
                                    id={role}
                                    checked={selectedRole === role}
                                    onChange={() => setRole(role)}
                                    label="Select"
                                    className="d-inline-block"
                                    style={{ cursor: "pointer" }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-center mb-3">
                <Button
                    onClick={handleContinue}
                    className="w-50 mb-3 rounded-3"
                    style={{ width: "50%", height: "70px", fontSize: "18px" }}
                >
                    {buttonText[selectedRole]}
                </Button>
            </div>

            <div className="text-center">
                <span className="text-muted">
                    Already have an account?{" "}
                    <a href="/signin" className="text-primary">
                        Sign in
                    </a>
                </span>
            </div>
        </Container>
    );
};

export default RolePage;
