import React from "react";
import { Menu, Bell, Calendar as CalendarIcon, Plus } from "lucide-react";

export default function Header({ onToggleMobileMenu, onOpenCreateModal }) {
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb-nav" aria-label="Breadcrumb">
          <span>FocusBoard</span>
          <span>/</span>
          <span className="current">My Tasks Overview</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-date-badge" title="Current session date">
          <CalendarIcon size={14} aria-hidden="true" />
          <span>{todayFormatted}</span>
        </div>

        <button
          type="button"
          className="btn-icon header-notification-btn"
          aria-label="View notifications (1 unread)"
        >
          <Bell size={18} />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenCreateModal}
          aria-label="Create new task"
        >
          <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}
