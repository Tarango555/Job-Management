import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaEnvelope,
  FaBell,
  FaQuestionCircle,
  FaUserCircle,
} from "react-icons/fa";
import "../../assets/css/ClientNavbar.css";

const ClientNavbar = () => {
  return (
    <Navbar expand="lg" className="client-navbar py-2 sticky-top shadow-sm" style={{ background: "#fff" }}>
      <Container fluid className="mx-lg-5 px-lg-5 d-flex align-items-center">
        {/* Offcanvas Button for Mobile */}
        <Navbar.Toggle aria-controls="offcanvas-navbar" className="me-2">
          <FaBars size={18} />
        </Navbar.Toggle>

        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4 ms-2 ms-md-3">
          Jobster
        </Navbar.Brand>

        {/* Right-side Icons (Mobile) */}
        <div className="d-lg-none d-flex ms-auto gap-3 align-items-center">
          <Link to="/support" className="icon-link">
            <FaQuestionCircle size={16} />
          </Link>
          <Link to="/notifications" className="icon-link">
            <FaBell size={16} />
          </Link>
          <NavDropdown title={<FaUserCircle size={16} />} id="profile-dropdown-mobile">
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas id="offcanvas-navbar" aria-labelledby="offcanvas-navbar-label" placement="start" className="client-navbar-offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas-navbar-label">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1">
              {/* Hire Talents */}
              <NavDropdown title="Hire Talents">
                <NavDropdown.Item as={Link} to="/search-freelancers">Search Freelancers</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard/job-post-page">Post a Job</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/saved-freelancers">Saved Freelancers</NavDropdown.Item>
              </NavDropdown>

              {/* My Jobs */}
              <NavDropdown title="My Jobs">
                <NavDropdown.Item as={Link} to="/active-jobs">Active Jobs</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/completed-jobs">Completed Jobs</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/drafts">Drafts</NavDropdown.Item>
              </NavDropdown>

              {/* Messages */}
              <Link to="/messages" className="nav-link">Messages</Link>

              {/* Payments */}
              <NavDropdown title="Payments">
                <NavDropdown.Item as={Link} to="/invoices">Invoices</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/payment-history">Payment History</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/payment-methods">Payment Methods</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {/* Right-side Icons (Desktop) */}
        <div className="d-none d-lg-flex ms-auto gap-3 align-items-center">
          <Link to="/support" className="icon-link">
            <FaQuestionCircle size={18} />
          </Link>
          <Link to="/notifications" className="icon-link">
            <FaBell size={18} />
          </Link>
          <NavDropdown align="end" title={<><FaUserCircle size={18} /> Profile</>} id="profile-dropdown-desktop">
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default ClientNavbar;
