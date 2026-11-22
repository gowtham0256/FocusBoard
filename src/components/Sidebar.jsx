import React from "react";
import {
  CheckSquare,
  LayoutDashboard,
  Inbox,
  Calendar,
  BarChart2,
  Folder,
  Settings,
  HelpCircle,
  X,
  User,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: false },
    { label: "My Tasks", icon: CheckSquare, active: true },
    { label: "Inbox", icon: Inbox, active: false, badge: "3" },
    { label: "Calendar", icon: Calendar, active: false },
    { label: "Reports", icon: BarChart2, active: false },
  ];

  const projects = [
    { name: "Design", color: "#EC4899" },
    { name: "Development", color: "#3B82F6" },
    { name: "Testing", color: "#10B981" },
    { name: "Research", color: "#F59E0B" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-label="Sidebar Navigation"
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon-wrap" aria-hidden="true">
              <CheckSquare size={20} strokeWidth={2.5} />
            </div>
            <span>FocusBoard</span>
          </div>

          <button
            type="button"
            className="btn-ghost mobile-menu-btn"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav-section">
          <span className="sidebar-label">Main Menu</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                className={`sidebar-nav-item ${item.active ? "active" : ""}`}
                aria-current={item.active ? "page" : undefined}
                onClick={(e) => e.preventDefault()}
              >
                <Icon size={18} aria-hidden="true" />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: "11px",
                      background: "rgba(255,255,255,0.15)",
                      padding: "2px 6px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}

          <span className="sidebar-label" style={{ marginTop: "12px" }}>
            Categories
          </span>
          {projects.map((proj) => (
            <div key={proj.name} className="sidebar-project-item">
              <span
                className="project-dot"
                style={{ backgroundColor: proj.color }}
                aria-hidden="true"
              />
              <span>{proj.name}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
            <div className="user-avatar" aria-hidden="true">
              JD
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Frontend Engineer</span>
            </div>
          </div>
          <button
            type="button"
            className="btn-icon"
            style={{ color: "#94A3B8" }}
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
