import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiFileText, FiX } from "react-icons/fi";
import "./ResumeModal.css";

/** Keep the embedded PDF loaded while the modal is closed to avoid viewer flashes. */
export default function ResumeModal({ open, onClose, resumeUrl }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const [pdfStatus, setPdfStatus] = useState("checking");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);

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
    // Check the PDF in parallel with the eager iframe preload (no serial HEAD delay).
    const controller = new AbortController();
    setPdfStatus("checking");
    setIframeLoaded(false);
    setPdfReady(false);
    setLoadTimedOut(false);
    fetch(resumeUrl, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get("content-type") || "";
        setPdfStatus(response.ok && contentType.toLowerCase().includes("pdf") ? "ready" : "missing");
      })
      .catch(() => {
        if (!controller.signal.aborted) setPdfStatus("missing");
      });
    return () => controller.abort();
  }, [resumeUrl]);

  useEffect(() => {
    if (!iframeLoaded || pdfStatus !== "ready") return undefined;
    // Give the native PDF viewer a short painting buffer without adding a long delay.
    // This happens during initial page load, not every time the resume is opened.
    const timeout = window.setTimeout(() => setPdfReady(true), 260);
    return () => window.clearTimeout(timeout);
  }, [iframeLoaded, pdfStatus]);

  useEffect(() => {
    if (!open || pdfStatus !== "ready" || pdfReady) return undefined;
    const timeout = window.setTimeout(() => setLoadTimedOut(true), 9000);
    return () => window.clearTimeout(timeout);
  }, [open, pdfStatus, pdfReady]);

  // The portal and iframe are intentionally never unmounted when the modal closes.
  // Otherwise the native PDF viewer reloads and can briefly flash white or show UI.
  const showPreview = open && pdfReady && pdfStatus === "ready";

  return createPortal(
    <div
      className={`resume-modal-backdrop${open ? "" : " resume-modal-closed"}`}
      aria-hidden={!open}
      inert={!open}
      onClick={(event) => {
        if (open && event.target === event.currentTarget) onClose();
      }}
    >
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
          <button type="button" className="resume-modal-close" onClick={onClose} aria-label="Close resume" ref={closeRef} tabIndex={open ? 0 : -1}>
            <FiX aria-hidden="true" size={22} />
          </button>
        </header>

        <div className="resume-modal-viewer" aria-busy={open && pdfStatus !== "missing" && !pdfReady}>
          {pdfStatus !== "missing" && (
            <iframe
              title="Resume PDF preview"
              src={`${resumeUrl}#zoom=100`}
              loading="eager"
              onLoad={() => setIframeLoaded(true)}
              tabIndex={showPreview ? 0 : -1}
            />
          )}
          {pdfStatus === "missing" ? (
            <div className="resume-modal-message" role="status">
              <FiFileText size={38} aria-hidden="true" />
              <p>The resume PDF is not available yet.</p>
              <p className="resume-modal-message-detail">Add <code>public/resume/Mingwei_Zhang_Resume.pdf</code> to the portfolio, then publish the updated site.</p>
            </div>
          ) : (
            <div className={`resume-modal-preview-shield${showPreview ? " resume-modal-preview-shield-ready" : ""}`} aria-hidden={showPreview}>
              {!showPreview && (
                <div className="resume-modal-preview-wait" role="status">
                  <FiFileText size={32} aria-hidden="true" />
                  <p>Loading resume preview…</p>
                  {loadTimedOut && (
                    <p className="resume-modal-preview-fallback">
                      Taking longer than expected. <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Open PDF directly</a>.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}
