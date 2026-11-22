import React from "react";
import { LayoutGrid, CheckSquare, Calendar, Settings } from "lucide-react";

export default function Sidebar({ activeTab = "Overview", onTabSelect }) {
  const navItems = [
    { id: "Overview", label: "Overview", icon: LayoutGrid },
    { id: "My tasks", label: "My tasks", icon: CheckSquare },
    { id: "Calendar", label: "Calendar", icon: Calendar },
    { id: "Settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon-wrap" aria-hidden="true">
            <LayoutGrid size={18} strokeWidth={2.4} />
          </div>
          <span>FocusBoard</span>
        </div>
      </div>

      <nav className="sidebar-nav-section">
        <span className="sidebar-label">WORKSPACE</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onTabSelect && onTabSelect(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
