import React, { useState, useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";
import { generateTaskId, inferCategory, VALID_CATEGORIES } from "../utils/taskUtils";

export default function TaskForm({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
}) {
  const isEditMode = Boolean(taskToEdit && taskToEdit.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Design");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [hasManuallySelectedCategory, setHasManuallySelectedCategory] = useState(false);

  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit && taskToEdit.id) {
        setTitle(taskToEdit.title || "");
        setDescription(taskToEdit.description || "");
        setCategory(taskToEdit.category || "Design");
        setStatus(taskToEdit.status || "To do");
        setPriority(taskToEdit.priority || "Medium");
        setDueDate(taskToEdit.dueDate || "");
        setHasManuallySelectedCategory(true);
      } else {
        const defaultDue = new Date();
        defaultDue.setDate(defaultDue.getDate() + 3);
        const yyyy = defaultDue.getFullYear();
        const mm = String(defaultDue.getMonth() + 1).padStart(2, "0");
        const dd = String(defaultDue.getDate()).padStart(2, "0");

        setTitle("");
        setDescription("");
        setCategory("Design");
        setStatus("To do");
        setPriority("Medium");
        setDueDate(taskToEdit?.dueDate || `${yyyy}-${mm}-${dd}`);
        setHasManuallySelectedCategory(false);
      }
      setErrors({});

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, taskToEdit]);

  // Keyboard navigation: Escape key closes modal & Tab trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Auto-infer category on title change if user hasn't explicitly chosen one
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
    if (!hasManuallySelectedCategory && !isEditMode) {
      const inferred = inferCategory(newTitle, description);
      setCategory(inferred);
    }
  };

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = "Task title is required.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Guaranteed valid category matching system schema
    const finalCategory =
      (category && category.trim()) ||
      (taskToEdit && taskToEdit.category) ||
      inferCategory(title, description) ||
      "Design";

    const payload = {
      id: isEditMode ? taskToEdit.id : generateTaskId(),
      title: title.trim(),
      description: description.trim(),
      category: finalCategory,
      status,
      priority,
      dueDate,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 id="form-dialog-title">
              {isEditMode ? "Edit task" : "Create new task"}
            </h3>
            <p>Add your task details to stay on top of your work.</p>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form matching Figma Frame 1:279 */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">
            {/* Field 1: Task Title * */}
            <div className="form-group">
              <label htmlFor="task-title-input" className="form-label form-label-required">
                Task title
              </label>
              <input
                id="task-title-input"
                ref={titleInputRef}
                type="text"
                className={`form-input ${errors.title ? "error" : ""}`}
                placeholder="e.g. Website pricing page"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
              {errors.title && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={12} />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Field 2: Description */}
            <div className="form-group">
              <label htmlFor="task-desc-input" className="form-label">
                Description
              </label>
              <textarea
                id="task-desc-input"
                className="form-textarea"
                placeholder="Add notes about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Field 3: Status & Priority Row (Figma 1:279 Two-Column Row) */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="task-status-select" className="form-label">
                  Status
                </label>
                <select
                  id="task-status-select"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-priority-select" className="form-label">
                  Priority
                </label>
                <select
                  id="task-priority-select"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Field 4: Due Date (Full-width matching Figma 1:279) */}
            <div className="form-group">
              <label htmlFor="task-due-date-input" className="form-label form-label-required">
                Due date
              </label>
              <input
                id="task-due-date-input"
                type="date"
                className={`form-input ${errors.dueDate ? "error" : ""}`}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                required
              />
              {errors.dueDate && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={12} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>

            {/* Subtle Category Chips - Preserves Figma visual composition while ensuring valid category */}
            <div className="form-category-pill-wrap" style={{ marginTop: -4 }}>
              <span className="category-pill-label" style={{ fontSize: 12, color: "var(--text-muted)", marginRight: 8 }}>
                Category:
              </span>
              <div style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
                {VALID_CATEGORIES.map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`badge badge-category badge-category-${cat.toLowerCase()}`}
                      style={{
                        cursor: "pointer",
                        border: isSelected ? "2px solid #5243E8" : "1px solid transparent",
                        fontWeight: isSelected ? 700 : 500,
                        transform: isSelected ? "scale(1.05)" : "none",
                        transition: "all 0.15s ease",
                      }}
                      onClick={() => {
                        setCategory(cat);
                        setHasManuallySelectedCategory(true);
                      }}
                      aria-pressed={isSelected}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="required-note">* Required field</div>
          </div>

          {/* Modal Footer matching Figma 1:279 */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
