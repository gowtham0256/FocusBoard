import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <div className="search-bar-wrapper">
      <label htmlFor="task-search-input" className="sr-only" style={{ display: "none" }}>
        Search tasks by title
      </label>
      <Search size={16} className="search-input-icon" aria-hidden="true" />
      <input
        id="task-search-input"
        type="search"
        className="search-input"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks by title"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClearSearch}
          aria-label="Clear search input"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
