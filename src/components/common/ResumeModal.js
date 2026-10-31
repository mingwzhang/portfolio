import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiFileText, FiX } from "react-icons/fi";
import "./ResumeModal.css";

/** Displays the public resume PDF without sending visitors to Google Drive. */
export default function ResumeModal({ open, onClose, resumeUrl }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const [pdfStatus, setPdfStatus] = useState("checking");

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const controls = Array.from(
        modalRef.current.querySelectorAll('button:not([disabled]), a[href], iframe:not([tabindex="-1"])')
      );
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    // A missing PDF can otherwise show React's HTML fallback inside the viewer.
    const controller = new AbortController();
    setPdfStatus("checking");
    fetch(resumeUrl, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get("content-type") || "";
        setPdfStatus(response.ok && contentType.toLowerCase().includes("pdf") ? "ready" : "missing");
      })
      .catch(() => {
        if (!controller.signal.aborted) setPdfStatus("missing");
      });
    return () => controller.abort();
  }, [open, resumeUrl]);

  if (!open) return null;

  return createPortal(
    <div className="resume-modal-backdrop" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="resume-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        ref={modalRef}
      >
        <header className="resume-modal-header">
          <div className="resume-modal-heading">
            <span className="resume-modal-kicker"><FiFileText aria-hidden="true" /> PDF DOCUMENT</span>
            <h2 id="resume-modal-title">Resume</h2>
          </div>
          <button type="button" className="resume-modal-close" onClick={onClose} aria-label="Close resume" ref={closeRef}>
            <FiX aria-hidden="true" size={22} />
          </button>
        </header>

        <div className="resume-modal-viewer">
          {pdfStatus === "ready" ? (
            <iframe title="Resume PDF preview" src={`${resumeUrl}#view=FitV`} />
          ) : (
            <div className="resume-modal-message" role="status">
              <FiFileText size={38} aria-hidden="true" />
              {pdfStatus === "checking" ? (
                <p>Opening resume preview…</p>
              ) : (
                <>
                  <p>The resume PDF is not available yet.</p>
                  <p className="resume-modal-message-detail">Add <code>public/resume/Mingwei_Zhang_Resume.pdf</code> to the portfolio, then publish the updated site.</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}
