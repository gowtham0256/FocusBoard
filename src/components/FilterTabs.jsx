import React from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

export default function FilterTabs({
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  onClearFilters,
  hasActiveFilters,
  statusCounts = {},
}) {
  const statusTabs = [
    { id: "All", label: "All" },
    { id: "To do", label: "To do" },
    { id: "In progress", label: "In progress" },
    { id: "Completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "All", label: "All Priorities" },
    { value: "High", label: "High Priority" },
    { value: "Medium", label: "Medium Priority" },
    { value: "Low", label: "Low Priority" },
  ];

  return (
    <div className="filter-tabs-wrapper" role="search" aria-label="Task filters">
      <div
        className="status-tabs-list"
        role="tablist"
        aria-label="Filter tasks by status"
      >
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          const count = statusCounts[tab.id] ?? 0;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="priority-select-wrap">
        <label htmlFor="priority-filter-select" style={{ display: "none" }}>
          Filter by priority
        </label>
        <select
          id="priority-filter-select"
          className="priority-select"
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          aria-label="Filter tasks by priority level"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="priority-select-chevron" aria-hidden="true" />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className="btn btn-secondary btn-clear-filters"
          onClick={onClearFilters}
          aria-label="Reset all search and filter options"
        >
          <RotateCcw size={13} aria-hidden="true" />
          <span>Clear Filters</span>
        </button>
      )}
    </div>
  );
}
