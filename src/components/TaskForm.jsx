import React, { useState, useEffect, useRef } from "react";
import { X, AlertCircle } from "lucide-react";
import { generateTaskId } from "../utils/taskUtils";

const CATEGORY_OPTIONS = ["Design", "Development", "Testing", "Research", "Operations"];

export default function TaskForm({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
}) {
  const isEditMode = Boolean(taskToEdit);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Validation error state
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Populate form on open or when taskToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || "");
        setDescription(taskToEdit.description || "");
        setCategory(taskToEdit.category || "Development");
        setStatus(taskToEdit.status || "To do");
        setPriority(taskToEdit.priority || "Medium");
        setDueDate(taskToEdit.dueDate || "");
      } else {
        // Defaults for Create mode: default due date to 5 days from today
        const defaultDue = new Date();
        defaultDue.setDate(defaultDue.getDate() + 5);
        const yyyy = defaultDue.getFullYear();
        const mm = String(defaultDue.getMonth() + 1).padStart(2, "0");
        const dd = String(defaultDue.getDate()).padStart(2, "0");

        setTitle("");
        setDescription("");
        setCategory("Development");
        setStatus("To do");
        setPriority("Medium");
        setDueDate(`${yyyy}-${mm}-${dd}`);
      }
      setErrors({});

      // Autofocus first input on open
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, taskToEdit]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = "Task title is required.";
    } else if (trimmedTitle.length < 2) {
      newErrors.title = "Task title must be at least 2 characters.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    }

    if (!status) {
      newErrors.status = "Status is required.";
    }

    if (!priority) {
      newErrors.priority = "Priority is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const taskPayload = {
      id: isEditMode ? taskToEdit.id : generateTaskId(),
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "General",
      status,
      priority,
      dueDate,
    };

    onSave(taskPayload);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 id="task-form-title">
              {isEditMode ? "Edit Task" : "Create New Task"}
            </h3>
            <p>
              {isEditMode
                ? "Update task details, deadline, and execution priority."
                : "Assign a clear objective and set expectations for your team."}
            </p>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close task form modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">
            {/* Task Title */}
            <div className="form-group">
              <label htmlFor="task-title-input" className="form-label form-label-required">
                Task Title
              </label>
              <input
                id="task-title-input"
                ref={titleInputRef}
                type="text"
                className={`form-input ${errors.title ? "error" : ""}`}
                placeholder="e.g. Design responsive dashboard layout"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                }}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "title-error" : undefined}
                required
              />
              {errors.title && (
                <div id="title-error" className="form-error-msg" role="alert">
                  <AlertCircle size={13} aria-hidden="true" />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="task-desc-input" className="form-label">
                Description
              </label>
              <textarea
                id="task-desc-input"
                className="form-textarea"
                placeholder="Provide detailed instructions and context for this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="task-category-select" className="form-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status & Priority Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="task-status-select" className="form-label form-label-required">
                  Status
                </label>
                <select
                  id="task-status-select"
                  className={`form-select ${errors.status ? "error" : ""}`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && (
                  <div className="form-error-msg" role="alert">
                    <AlertCircle size={13} aria-hidden="true" />
                    <span>{errors.status}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="task-priority-select" className="form-label form-label-required">
                  Priority
                </label>
                <select
                  id="task-priority-select"
                  className={`form-select ${errors.priority ? "error" : ""}`}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <div className="form-error-msg" role="alert">
                    <AlertCircle size={13} aria-hidden="true" />
                    <span>{errors.priority}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="task-due-date-input" className="form-label form-label-required">
                Due Date
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
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
                required
              />
              {errors.dueDate && (
                <div id="dueDate-error" className="form-error-msg" role="alert">
                  <AlertCircle size={13} aria-hidden="true" />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
