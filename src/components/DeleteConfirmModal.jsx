import React, { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  task,
  onClose,
  onConfirmDelete,
}) {
  const cancelBtnRef = useRef(null);

  // Focus cancel button on open for safety, and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-heading"
        aria-describedby="delete-dialog-description"
        style={{ maxWidth: "460px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "0" }}>
          <div />
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Cancel and close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="delete-dialog-body">
          <div className="delete-dialog-icon" aria-hidden="true">
            <AlertTriangle size={26} />
          </div>

          <h3 id="delete-dialog-heading" className="delete-dialog-title">
            Delete Task Confirmation
          </h3>

          <p id="delete-dialog-description" className="delete-dialog-desc">
            Are you sure you want to delete this task? This action cannot be undone
            and will remove it from all project metrics.
          </p>

          <div className="delete-task-title-highlight">
            "{task.title}"
          </div>
        </div>

        <div className="modal-footer" style={{ borderTop: "none" }}>
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirmDelete(task.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
