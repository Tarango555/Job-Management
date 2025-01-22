import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import PreviewModal from "./PreviewModal";
import "../../assets/css/JobPostForm.css";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    budget: { type: "fixed", amount: "", hourlyRateRange: { min: "", max: "" } },
    timeline: { startDate: "", endDate: "" },
    experienceLevel: "Junior",
    category: "",
    visibility: "public",
    additionalFiles: [],
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.includes(".")) {
      const [parent, child] = id.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      additionalFiles: Array.from(e.target.files),
    }));
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Container className="job-post-form-container">
      <h1 className="form-heading">Post a Job</h1>

      {/* Job Title Section */}
      <section className="form-section">
        <h2 className="section-title">Job Title</h2>
        <hr className="section-divider" />
        <Form.Group controlId="title">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
      </section>

      {/* Job Description Section */}
      <section className="form-section">
        <h2 className="section-title">Job Description</h2>
        <hr className="section-divider" />
        <Form.Group controlId="description">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter job description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
      </section>

      {/* Skills Required Section */}
      <section className="form-section">
        <h2 className="section-title">Skills Required</h2>
        <hr className="section-divider" />
        <Form.Group controlId="skillsRequired">
          <Form.Label>Skills Required</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter required skills"
            value={formData.skillsRequired}
            onChange={handleChange}
          />
        </Form.Group>
      </section>

      {/* Budget Section */}
      <section className="form-section">
        <h2 className="section-title">Budget</h2>
        <hr className="section-divider" />
        <Form.Group controlId="budget.type">
          <Form.Label>Budget Type</Form.Label>
          <Form.Control
            as="select"
            value={formData.budget.type}
            onChange={handleChange}
          >
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="budget.amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter budget amount"
            value={formData.budget.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="budget.hourlyRateRange.min">
              <Form.Label>Hourly Rate (Min)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min rate"
                value={formData.budget.hourlyRateRange.min}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="budget.hourlyRateRange.max">
              <Form.Label>Hourly Rate (Max)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max rate"
                value={formData.budget.hourlyRateRange.max}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </section>

      {/* Timeline Section */}
      <section className="form-section">
        <h2 className="section-title">Timeline</h2>
        <hr className="section-divider" />
        <Row>
          <Col>
            <Form.Group controlId="timeline.startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.timeline.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="timeline.endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.timeline.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </section>

      {/* Experience Level Section */}
      <section className="form-section">
        <h2 className="section-title">Experience Level</h2>
        <hr className="section-divider" />
        <Form.Group controlId="experienceLevel">
          <Form.Label>Experience Level</Form.Label>
          <Form.Control
            as="select"
            value={formData.experienceLevel}
            onChange={handleChange}
          >
            <option value="Junior">Junior</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior">Senior</option>
          </Form.Control>
        </Form.Group>
      </section>

      {/* Job Category Section */}
      <section className="form-section">
        <h2 className="section-title">Job Category</h2>
        <hr className="section-divider" />
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>
      </section>

      {/* Visibility Section */}
      <section className="form-section">
        <h2 className="section-title">Visibility</h2>
        <hr className="section-divider" />
        <Form.Group controlId="visibility">
          <Form.Label>Visibility</Form.Label>
          <Form.Control
            as="select"
            value={formData.visibility}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Control>
        </Form.Group>
      </section>

      {/* Additional Files Section */}
      <section className="form-section">
        <h2 className="section-title">Additional Files</h2>
        <hr className="section-divider" />
        <Form.Group controlId="additionalFiles">
          <Form.Label>Upload Files</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>
      </section>

      {/* Submit Button */}
      <div className="form-actions">
        <Button variant="primary" onClick={openModal}>
          Preview
        </Button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        show={showModal}
        handleClose={closeModal}
        formData={formData}
      />
    </Container>
  );
};

export default JobPostForm;
