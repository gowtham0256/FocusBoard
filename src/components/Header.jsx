import React from "react";
import { LayoutGrid, ChevronDown } from "lucide-react";

export default function Header({ activeTab = "My tasks" }) {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        {/* Desktop Breadcrumb */}
        <div className="breadcrumb-nav" aria-label="Breadcrumb">
          <span>Workspace</span>
          <span>/</span>
          <span className="current">{activeTab}</span>
        </div>

        {/* Mobile Compact Brand Header (Visible on screens <= 480px) */}
        <div className="mobile-brand-header">
          <div
            className="logo-icon-wrap"
            style={{ width: 28, height: 28, borderRadius: 8 }}
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.8" />
              <rect x="14" y="3" width="7" height="7" rx="1.8" />
              <rect x="14" y="14" width="7" height="7" rx="1.8" />
              <rect x="3" y="14" width="7" height="7" rx="1.8" />
            </svg>
          </div>
          <span>FocusBoard</span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-profile-avatar" title="Signed in as John Doe">
          JD
        </div>
        <ChevronDown size={14} style={{ color: "#9CA3AF" }} aria-hidden="true" />
      </div>
    </header>
  );
}
