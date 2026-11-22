import React from "react";
import { LayoutGrid, CheckSquare, Calendar, Settings } from "lucide-react";

export default function MobileNav({ activeTab = "Overview", onTabSelect }) {
  const navItems = [
    { id: "Overview", label: "Overview", icon: LayoutGrid },
    { id: "My tasks", label: "Tasks", icon: CheckSquare },
    { id: "Calendar", label: "Calendar", icon: Calendar },
    { id: "Settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`mobile-nav-item ${isActive ? "active" : ""}`}
            onClick={() => onTabSelect && onTabSelect(item.id)}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
