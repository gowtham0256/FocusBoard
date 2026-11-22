import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = "total",
  subtext,
}) {
  const iconVariantClass = `stat-icon-${variant}`;

  return (
    <div className="stat-card-white" role="region" aria-label={`${title} statistic`}>
      <div className="stat-card-top">
        <div className={`stat-icon-square ${iconVariantClass}`} aria-hidden="true">
          {Icon && <Icon size={16} strokeWidth={2.4} />}
        </div>
        <span className="stat-card-label">{title}</span>
      </div>

      <div className="stat-card-bottom">
        <div className="stat-card-value">{value}</div>
        {subtext && <div className="stat-card-subtext">{subtext}</div>}
      </div>
    </div>
  );
}
