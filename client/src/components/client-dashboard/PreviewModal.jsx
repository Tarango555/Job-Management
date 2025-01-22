import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/PreviewModal.css";

const PreviewModal = ({ show, handleClose, formData }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preview Job Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="preview-modal-body">
          <h2>{formData.title}</h2> <hr />
          <p>{formData.description}</p>
          <h4>Skills Required:</h4>
          <p>{formData.skillsRequired}</p>
          <h4>Budget:</h4>
          {formData.budget.type === "hourly" ? (
            <p>
              Hourly: ${formData.budget.hourlyRateRange.min} - $
              {formData.budget.hourlyRateRange.max}
            </p>
          ) : (
            <p>Fixed: ${formData.budget.amount}</p>
          )}
          <h4>Timeline:</h4>
          <p>
            {formData.timeline.startDate} - {formData.timeline.endDate}
          </p>
          <h4>Experience Level:</h4>
          <p>{formData.experienceLevel}</p>
          <h4>Category:</h4>
          <p>{formData.category}</p>
          <h4>Visibility:</h4>
          <p>{formData.visibility}</p>
          <h4>Additional Files:</h4>
          <ul>
            {formData.additionalFiles.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => alert("Post Saved!")}>
          Save as Draft
        </Button>
        <Button variant="success" onClick={() => alert("Job Posted!")}>
          Post Job
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewModal;
