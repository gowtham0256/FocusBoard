import React from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = "total",
  subtitle,
  progress = null,
}) {
  const iconVariantClass = `stat-icon-${variant}`;

  return (
    <div className="stat-card" role="region" aria-label={`${title} statistic`}>
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        <div className={`stat-icon-wrap ${iconVariantClass}`} aria-hidden="true">
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div className="stat-value">{value}</div>

      {progress !== null && (
        <div
          className="stat-progress-bar-container"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
        >
          <div
            className="stat-progress-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {subtitle && <div className="stat-footer-text">{subtitle}</div>}
    </div>
  );
}
