import React from "react";
import { LayoutGrid, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        {/* Desktop Breadcrumb */}
        <div className="breadcrumb-nav" aria-label="Breadcrumb">
          <span>Workspace</span>
          <span>/</span>
          <span className="current">Overview</span>
        </div>

        {/* Mobile Compact Brand Header (Visible on screens <= 480px) */}
        <div className="mobile-brand-header">
          <div className="logo-icon-wrap" style={{ width: 26, height: 26, borderRadius: 6 }} aria-hidden="true">
            <LayoutGrid size={15} strokeWidth={2.4} />
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
