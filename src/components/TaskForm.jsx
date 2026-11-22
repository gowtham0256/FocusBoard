import React, { useState, useEffect, useRef } from "react";
import { X, AlertCircle, Calendar } from "lucide-react";
import { generateTaskId } from "../utils/taskUtils";

const CATEGORY_OPTIONS = ["Design", "Development", "Content", "Planning", "Research"];

export default function TaskForm({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
}) {
  const isEditMode = Boolean(taskToEdit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Design");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || "");
        setDescription(taskToEdit.description || "");
        setCategory(taskToEdit.category || "Design");
        setStatus(taskToEdit.status || "To do");
        setPriority(taskToEdit.priority || "Medium");
        setDueDate(taskToEdit.dueDate || "");
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
        setDueDate(`${yyyy}-${mm}-${dd}`);
      }
      setErrors({});

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, taskToEdit]);

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

    const payload = {
      id: isEditMode ? taskToEdit.id : generateTaskId(),
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || "General",
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
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
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

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-body">
            {/* Task Title */}
            <div className="form-group">
              <label htmlFor="task-title-input" className="form-label form-label-required">
                Task title
              </label>
              <input
                id="task-title-input"
                ref={titleInputRef}
                type="text"
                className={`form-input ${errors.title ? "error" : ""}`}
                placeholder="e.g. Update pricing page"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                }}
                required
              />
              {errors.title && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={12} />
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
                placeholder="Add notes about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Status & Priority Row */}
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

            {/* Category & Due Date Row */}
            <div className="form-row">
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
            </div>

            <div className="required-note">* Required field</div>
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
              {isEditMode ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
