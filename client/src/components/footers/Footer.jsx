import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaBriefcase, FaEnvelope, FaCog, FaQuestionCircle } from "react-icons/fa";
import "../../assets/css/Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer bg-dark text-white py-4">
      <Container>
        <Row>
          {/* Logo and About Section */}
          <Col md={3} sm={6} className="mb-4">
            <h5 className="footer-logo">Jobster</h5>
            <p>
              Your ultimate destination for finding jobs and hiring talent. Join
              us to explore endless opportunities.
            </p>
          </Col>

          {/* Job Seekers Section */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Job Seekers</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/find-jobs">
                  <FaBriefcase className="me-2" /> Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/upload-resume">
                  <FaEnvelope className="me-2" /> Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/job-alerts">
                  <FaCog className="me-2" /> Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/career-resources">
                  <FaQuestionCircle className="me-2" /> Career Resources
                </Link>
              </li>
              <li>
                <Link to="/interview-tips">
                  <FaBriefcase className="me-2" /> Interview Tips
                </Link>
              </li>
            </ul>
          </Col>

          {/* Employers Section */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Employers</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/post-job">
                  <FaBriefcase className="me-2" /> Post a Job
                </Link>
              </li>
              <li>
                <Link to="/search-talent">
                  <FaEnvelope className="me-2" /> Search Talent
                </Link>
              </li>
              <li>
                <Link to="/pricing">
                  <FaCog className="me-2" /> Pricing
                </Link>
              </li>
              <li>
                <Link to="/recruitment-services">
                  <FaBriefcase className="me-2" /> Recruitment Services
                </Link>
              </li>
              <li>
                <Link to="/employer-dashboard">
                  <FaCog className="me-2" /> Employer Dashboard
                </Link>
              </li>
            </ul>
          </Col>

          {/* Resources Section */}
          <Col md={3} sm={6} className="mb-4">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about-us">
                  <FaBriefcase className="me-2" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us">
                  <FaEnvelope className="me-2" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <FaCog className="me-2" /> Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs">
                  <FaQuestionCircle className="me-2" /> FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy">
                  <FaCog className="me-2" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider my-4" />

        {/* Social Media Links and Copyright */}
        <Row className="d-flex justify-content-between align-items-center">
          <Col sm={6} className="mb-3 mb-sm-0">
            <p className="mb-0">&copy; 2025 Jobster. All rights reserved.</p>
          </Col>
          <Col sm={6} className="d-flex justify-content-sm-end gap-3">
            <Link to="/facebook" className="social-link">
              <FaFacebook />
            </Link>
            <Link to="/twitter" className="social-link">
              <FaTwitter />
            </Link>
            <Link to="/linkedin" className="social-link">
              <FaLinkedin />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
