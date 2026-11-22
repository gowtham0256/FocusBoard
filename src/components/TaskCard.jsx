import React, { useState } from "react";
import {
  Calendar,
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  Clock,
  Circle,
} from "lucide-react";
import { formatDisplayDate } from "../utils/taskUtils";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const { id, title, description, category, status, priority, dueDate } = task;
  const [showMenu, setShowMenu] = useState(false);

  // Status toggle handler
  const handleToggleNextStatus = () => {
    if (status === "To do") {
      onStatusChange(id, "In progress");
    } else if (status === "In progress") {
      onStatusChange(id, "Completed");
    } else {
      onStatusChange(id, "To do");
    }
  };

  // Status button icon/style
  const renderStatusButton = () => {
    if (status === "Completed") {
      return (
        <button
          type="button"
          className="task-status-toggle-btn completed"
          onClick={handleToggleNextStatus}
          aria-label={`Mark ${title} as To do`}
          title="Status: Completed (Click to reset to To do)"
        >
          <Check size={12} strokeWidth={3} />
        </button>
      );
    }

    if (status === "In progress") {
      return (
        <button
          type="button"
          className="task-status-toggle-btn inprogress"
          onClick={handleToggleNextStatus}
          aria-label={`Mark ${title} as Completed`}
          title="Status: In progress (Click to mark Completed)"
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#5243E8" }} />
        </button>
      );
    }

    return (
      <button
        type="button"
        className="task-status-toggle-btn todo"
        onClick={handleToggleNextStatus}
        aria-label={`Mark ${title} as In progress`}
        title="Status: To do (Click to mark In progress)"
      />
    );
  };

  // Category badge class
  const getCategoryClass = (cat) => {
    const lower = (cat || "").toLowerCase();
    if (lower.includes("design")) return "badge-category-design";
    if (lower.includes("dev")) return "badge-category-development";
    if (lower.includes("content")) return "badge-category-content";
    return "badge-category-general";
  };

  // Priority badge class
  const getPriorityClass = (pri) => {
    if (pri === "High") return "badge-priority-high";
    if (pri === "Medium") return "badge-priority-medium";
    return "badge-priority-low";
  };

  return (
    <div className="task-row-card" role="article" aria-label={`Task: ${title}`}>
      {/* Left: Status Toggle + Title & Subtitle */}
      <div className="task-row-left">
        {renderStatusButton()}

        <div className="task-text-info">
          <div
            className="task-title-text"
            style={{
              textDecoration: status === "Completed" ? "line-through" : "none",
              opacity: status === "Completed" ? 0.75 : 1,
            }}
          >
            {title}
          </div>
          {description && <div className="task-desc-text">{description}</div>}
        </div>
      </div>

      {/* Right: Category + Priority + Due Date + Actions */}
      <div className="task-row-right">
        {category && (
          <span className={`badge badge-category ${getCategoryClass(category)}`}>
            {category}
          </span>
        )}

        <span className={`badge ${getPriorityClass(priority)}`}>
          {priority}
        </span>

        <div className="task-due-info">
          <Calendar size={13} aria-hidden="true" />
          <span>{formatDisplayDate(dueDate)}</span>
        </div>

        {/* Quick status dropdown for explicit accessibility */}
        <select
          className="task-row-status-select"
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          aria-label={`Change status for ${title}`}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Action Buttons */}
        <div className="task-actions-group">
          <button
            type="button"
            className="btn-icon"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${title}`}
            title="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${title}`}
            title="Delete task"
            style={{ color: "#EF4444" }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
