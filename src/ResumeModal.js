import React from "react";
import "./Modal.css";

const ResumeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <iframe
          src={process.env.PUBLIC_URL +"/Zhang-Mingwei-Resume.pdf"}
          title="Resume"
          width="100%"
          height="800px"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default ResumeModal;
