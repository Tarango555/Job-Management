// import React, { useState } from "react";
// import { Navbar, Nav, NavDropdown, Button, Offcanvas, Container } from "react-bootstrap";
// import { FaBars, FaUserCircle  } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import '../assets/css/ResponsiveNavbar_02.css';
// import { useAuthStore } from './../stores/authStore';

// const ResponsiveNavbar = () => {
//     const [showOffcanvas, setShowOffcanvas] = useState(false);
//     const navigate = useNavigate();
//     const { auth, logout, isLoggedIn } = useAuthStore();

//     // Construct the profile image URL
//     const profileImageUrl = auth?.user?.image
//     ? `http://localhost:8080/${auth.user.image}` // Adjust path if necessary
//     : null; // No image, fallback to profile icon

//     const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

//     const handleLogout = async () => {
//         logout(); // Clear Zustand state
//         navigate("/login"); // Redirect to the login page
//     };

//     const handleLoginClick = () => navigate("/login");
//     const handleSignupClick = () => navigate("/role-page");
//     const handleMobileSignupClick = () => {
//         toggleOffcanvas(); // Close the Offcanvas
//         navigate("/role-page"); // Navigate to the signup page
//     };

//     return (
//         <>
//             {/* Desktop Navbar */}
//             <Navbar bg="white" expand="lg" className="shadow-sm py-3 px-4 d-none d-lg-flex">
//                 <Container>
//                     <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">Jobster</Navbar.Brand>
//                     <Nav className="mx-auto">
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
//                         <NavDropdown title="Find Jobs" id="find-jobs-dropdown">
//                             <NavDropdown.Item as={Link} to="/jobs/remote">Remote Jobs</NavDropdown.Item>
//                             <NavDropdown.Item as={Link} to="/jobs/full-time">Full-Time Jobs</NavDropdown.Item>
//                         </NavDropdown>
//                         <NavDropdown title="Find Talent" id="find-talent-dropdown">
//                             <NavDropdown.Item as={Link} to="/talent/freelancers">Freelancers</NavDropdown.Item>
//                             <NavDropdown.Item as={Link} to="/talent/companies">Companies</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                     <div>
//                         {isLoggedIn() ? (
//                             <ProfileButton
//                                 onLogout={handleLogout}
//                                 profileImage={profileImageUrl} // Pass profile image URL
//                             />
//                         ) : (
//                             <>
//                                 <Button
//                                     variant="outline-primary"
//                                     className="me-2"
//                                     onClick={handleLoginClick}
//                                 >
//                                     Login
//                                 </Button>
//                                 <Button
//                                     variant="outline-primary"
//                                     className="me-2"
//                                     onClick={handleSignupClick}
//                                 >
//                                     Sign Up
//                                 </Button>
//                             </>
//                         )}
//                     </div>
//                 </Container>
//             </Navbar>

//             {/* Mobile Navbar */}
//             <Navbar bg="white" className="d-lg-none px-3">
//                 <div className="d-flex justify-content-between align-items-center w-100">
//                     <FaBars className="text-primary fs-3" onClick={toggleOffcanvas} style={{ cursor: "pointer" }} />
//                     <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">Jobster</Navbar.Brand>
//                     <div className="d-flex ms-auto">
//                         {isLoggedIn() ? (
//                             <ProfileButton onLogout={handleLogout} profileImage={profileImageUrl} />
//                         ) : (
//                             <Button variant="outline-primary" onClick={handleLoginClick}>Login</Button>
//                         )}
//                     </div>
//                 </div>
//             </Navbar>

//             {/* Offcanvas Menu */}
//             <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="start">
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title>Menu</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <Nav className="flex-column">
//                         <Nav.Link as={Link} to="/" onClick={toggleOffcanvas}>Home</Nav.Link>
//                         <NavDropdown title="Find Jobs" id="find-jobs-dropdown">
//                             <NavDropdown.Item as={Link} to="/jobs/remote">Remote Jobs</NavDropdown.Item>
//                             <NavDropdown.Item as={Link} to="/jobs/full-time">Full-Time Jobs</NavDropdown.Item>
//                         </NavDropdown>
//                         <NavDropdown title="Find Talent" id="find-talent-dropdown">
//                             <NavDropdown.Item as={Link} to="/talent/freelancers">Freelancers</NavDropdown.Item>
//                             <NavDropdown.Item as={Link} to="/talent/companies">Companies</NavDropdown.Item>
//                         </NavDropdown>
//                     </Nav>
//                     <Button
//                         variant="primary"
//                         className="mt-4 w-100"
//                         onClick={handleMobileSignupClick}
//                     >
//                         Sign Up
//                     </Button>
//                 </Offcanvas.Body>
//             </Offcanvas>
//         </>
//     );
// };

// export default ResponsiveNavbar;

import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Offcanvas, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import '../assets/css/ResponsiveNavbar_02.css';
import { useAuthStore } from './../stores/authStore';

const ResponsiveNavbar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();
    const { auth, logout, isLoggedIn } = useAuthStore();

    // Determine the user's profile image or fallback to null
    const profileImageUrl = auth?.user?.image
        ? `http://localhost:8080/${auth.user.image}` // Use the database image
        : null; // No image available, fallback to icon

    const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

    const handleLogout = async () => {
        logout(); // Clear Zustand state
        navigate("/login"); // Redirect to login page
    };

    const handleLoginClick = () => navigate("/login");
    const handleSignupClick = () => navigate("/role-page");
    const handleMobileSignupClick = () => {
        toggleOffcanvas(); // Close the Offcanvas
        navigate("/role-page"); // Navigate to signup page
    };

    return (
        <>
            {/* Desktop Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm py-3 px-4 d-none d-lg-flex">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">Jobster</Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Find Jobs" id="find-jobs-dropdown">
                            <NavDropdown.Item as={Link} to="/jobs/remote">Remote Jobs</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/jobs/full-time">Full-Time Jobs</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Find Talent" id="find-talent-dropdown">
                            <NavDropdown.Item as={Link} to="/talent/freelancers">Freelancers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/talent/companies">Companies</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <div>
                        {isLoggedIn() ? (
                            <ProfileButton
                                onLogout={handleLogout}
                                profileImage={profileImageUrl} // Pass profile image or null
                            />
                        ) : (
                            <>
                                <Button
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    className="me-2"
                                    onClick={handleSignupClick}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </Container>
            </Navbar>

            {/* Mobile Navbar */}
            <Navbar bg="white" className="d-lg-none px-3">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <FaBars className="text-primary fs-3" onClick={toggleOffcanvas} style={{ cursor: "pointer" }} />
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">Jobster</Navbar.Brand>
                    <div className="d-flex ms-auto">
                        {isLoggedIn() ? (
                            <ProfileButton onLogout={handleLogout} profileImage={profileImageUrl} />
                        ) : (
                            <Button variant="outline-primary" onClick={handleLoginClick}>Login</Button>
                        )}
                    </div>
                </div>
            </Navbar>

            {/* Offcanvas Menu */}
            <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" onClick={toggleOffcanvas}>Home</Nav.Link>
                        <NavDropdown title="Find Jobs" id="find-jobs-dropdown">
                            <NavDropdown.Item as={Link} to="/jobs/remote">Remote Jobs</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/jobs/full-time">Full-Time Jobs</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Find Talent" id="find-talent-dropdown">
                            <NavDropdown.Item as={Link} to="/talent/freelancers">Freelancers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/talent/companies">Companies</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button
                        variant="primary"
                        className="mt-4 w-100"
                        onClick={handleMobileSignupClick}
                    >
                        Sign Up
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default ResponsiveNavbar;

