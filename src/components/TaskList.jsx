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
  // Case 1: Overall dataset is completely empty
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No tasks created">
        <div className="empty-state-icon" aria-hidden="true">
          <Inbox size={28} />
        </div>
        <h3 className="empty-state-title">No tasks in your FocusBoard</h3>
        <p className="empty-state-desc">
          Get started by organizing your workflow. Create your first task to track
          deadlines, priorities, and progress.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenCreateModal}
          aria-label="Create your first task"
        >
          <Plus size={16} aria-hidden="true" />
          <span>Create First Task</span>
        </button>
      </div>
    );
  }

  // Case 2: Filter/Search results yielded 0 matches
  if (tasks.length === 0) {
    return (
      <div className="empty-state-card" role="region" aria-label="No matching tasks">
        <div className="empty-state-icon" aria-hidden="true">
          <SearchX size={28} />
        </div>
        <h3 className="empty-state-title">No matching tasks found</h3>
        <p className="empty-state-desc">
          We couldn't find any tasks matching your active search keywords or filter
          criteria. Try resetting filters to see your full task list.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClearFilters}
          aria-label="Clear all active search and filter criteria"
        >
          <RotateCcw size={15} aria-hidden="true" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="task-list-grid"
      role="list"
      aria-label="Task list"
    >
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
