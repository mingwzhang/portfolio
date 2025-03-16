import React from "react";
import "./ResumeModal.css";

const ResumeModal = ({ onClose }) => {
  // Google Drive preview link for the PDF
  const pdfUrl =
    "https://drive.google.com/file/d/1l4ogfowT21Bnl6IRi_3qX6Ht-0JtPB7O/preview";
  // Download URL using Google Drive's export link
  const downloadUrl =
    "https://drive.google.com/uc?export=download&id=1l4ogfowT21Bnl6IRi_3qX6Ht-0JtPB7O";

  const downloadPdf = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
<div className="modal-content" onClick={(e) => e.stopPropagation()}>
  {/* Buttons placed outside the resume box but inside modal */}
  <div className="pdf-header">
    <button className="download-button" onClick={downloadPdf}>⤓</button>
    <button className="close-button" onClick={onClose}>X</button>
  </div>

  {/* Resume container */}
  <div className="pdf-container">
    <iframe
      src={pdfUrl}
      title="Resume"
      width="100%"
      height="100%"
      style={{ border: "none" }}
    />
  </div>
</div>


    </div>
  );
};

export default ResumeModal;
