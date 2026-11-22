import React from "react";
import { ChevronDown, RotateCcw, Search, X } from "lucide-react";

export default function FilterTabs({
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onClearFilters,
  hasActiveFilters,
  statusCounts = {},
}) {
  const tabs = [
    { id: "All", label: "All tasks", count: statusCounts["All"] ?? 0 },
    { id: "In progress", label: "In progress", count: statusCounts["In progress"] ?? 0 },
    { id: "Completed", label: "Completed", count: statusCounts["Completed"] ?? 0 },
  ];

  return (
    <div className="filter-bar-container" role="search" aria-label="Task filters">
      {/* Left: Status Filter Tabs */}
      <div className="status-tabs-row" role="tablist" aria-label="Filter by status">
        {tabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
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
              {tab.id === "All" && tab.count !== undefined && (
                <span style={{ fontSize: 11, opacity: 0.85 }}>{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Search Bar & Priority Select */}
      <div className="filter-bar-right">
        {/* Search Input */}
        <div className="search-bar-wrap">
          <Search size={14} className="search-input-icon" aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Find a task..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Find a task by title"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={onClearSearch}
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Priority Dropdown */}
        <div className="priority-select-wrap">
          <select
            id="priority-select"
            className="priority-select"
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter tasks by priority"
          >
            <option value="All">Priority: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <ChevronDown size={13} className="priority-select-chevron" aria-hidden="true" />
        </div>

        {/* Clear Filters CTA */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-soft-purple"
            style={{ padding: "5px 10px", fontSize: "12px", display: "flex", alignItems: "center", gap: 4 }}
            onClick={onClearFilters}
            aria-label="Clear active filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
