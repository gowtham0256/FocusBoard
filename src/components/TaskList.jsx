import React from "react";
import TaskCard from "./TaskCard";
import { Inbox, SearchX, Plus, RotateCcw } from "lucide-react";

export default function TaskList({
  tasks,
  totalTasksCount,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onOpenCreateModal,
  onClearFilters,
}) {
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No tasks created">
        <div className="stat-icon-square stat-icon-total" style={{ width: 44, height: 44, borderRadius: "50%" }}>
          <Inbox size={22} />
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          No tasks in FocusBoard
        </h3>
        <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 360 }}>
          Create your first task to start tracking your daily sprint milestones and productivity.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: 8 }}
          onClick={onOpenCreateModal}
          aria-label="Create your first task"
        >
          <Plus size={15} strokeWidth={2.4} aria-hidden="true" />
          <span>Create new task</span>
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No matching tasks">
        <div className="stat-icon-square stat-icon-inprogress" style={{ width: 44, height: 44, borderRadius: "50%" }}>
          <SearchX size={22} />
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          No matching tasks found
        </h3>
        <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 360 }}>
          No tasks match your active search keyword or filter settings.
        </p>
        <button
          type="button"
          className="btn-soft-purple"
          style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}
          onClick={onClearFilters}
          aria-label="Clear active filters"
        >
          <RotateCcw size={13} />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="task-list-container" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
