import React from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  CircleDashed,
  Pencil,
  Trash2,
  AlertCircle,
  Flag,
} from "lucide-react";
import { formatDisplayDate, isTaskOverdue } from "../utils/taskUtils";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const { id, title, description, category, status, priority, dueDate } = task;

  const overdue = isTaskOverdue(dueDate, status);

  // Status icon configuration
  const renderStatusBadge = () => {
    switch (status) {
      case "Completed":
        return (
          <span className="badge badge-status-completed">
            <CheckCircle2 size={12} aria-hidden="true" />
            <span>Completed</span>
          </span>
        );
      case "In progress":
        return (
          <span className="badge badge-status-inprogress">
            <Clock size={12} aria-hidden="true" />
            <span>In progress</span>
          </span>
        );
      case "To do":
      default:
        return (
          <span className="badge badge-status-todo">
            <CircleDashed size={12} aria-hidden="true" />
            <span>To do</span>
          </span>
        );
    }
  };

  // Priority badge configuration
  const renderPriorityBadge = () => {
    const priorityClass =
      priority === "High"
        ? "badge-priority-high"
        : priority === "Medium"
        ? "badge-priority-medium"
        : "badge-priority-low";

    return (
      <span className={`badge ${priorityClass}`}>
        <Flag size={11} aria-hidden="true" />
        <span>{priority}</span>
      </span>
    );
  };

  return (
    <article
      className="task-card"
      data-status={status}
      aria-label={`Task: ${title}`}
    >
      <div className="task-card-header">
        <div className="task-card-badges">
          {category && <span className="badge badge-category">{category}</span>}
          {renderStatusBadge()}
          {renderPriorityBadge()}
        </div>

        <div className="task-card-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${title}`}
            title="Edit task"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${title}`}
            title="Delete task"
            style={{ color: "#EF4444" }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="task-card-body">
        <h3 className="task-card-title">{title}</h3>
        {description && <p className="task-card-desc">{description}</p>}
      </div>

      <div className="task-card-footer">
        <div className={`task-due-date ${overdue ? "overdue" : ""}`}>
          {overdue ? (
            <AlertCircle size={13} aria-hidden="true" />
          ) : (
            <Calendar size={13} aria-hidden="true" />
          )}
          <span>
            {formatDisplayDate(dueDate)}
            {overdue && " (Overdue)"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <label htmlFor={`quick-status-${id}`} style={{ display: "none" }}>
            Change status for {title}
          </label>
          <select
            id={`quick-status-${id}`}
            className="quick-status-select"
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            aria-label={`Change status for ${title}`}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </article>
  );
}
