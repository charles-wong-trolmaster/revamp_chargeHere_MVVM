import React from "react";

export interface TariffTypesExpanderProps {
  title: string;
  badge: {
    text: string;
    variant:
      | "locked"
      | "dynamic"
      | "fixed"
      | "variable"
      | "reduced rate"
      | "disabled";
  };
  description: string;
  example: string;
  isExpanded: boolean;
  onToggle?: () => void;
  className?: string;
}

const TariffTypesExpander: React.FC<TariffTypesExpanderProps> = ({
  title,
  badge,
  description,
  example,
  isExpanded,
  onToggle,
  className = "",
}) => {
  const getBadgeClasses = (variant: string) => {
    const baseClasses = "uk-badge uk-text-small";
    switch (variant) {
      case "locked":
        return `${baseClasses} uk-badge-success`;
      case "dynamic":
        return `${baseClasses} uk-badge-warning`;
      case "fixed":
        return `${baseClasses} uk-badge-primary`;
      case "reduced rate":
        return `${baseClasses} uk-badge-secondary`;
      case "disabled":
        return `${baseClasses} uk-badge-warning`;
      default:
        return `${baseClasses} uk-badge-default`;
    }
  };

  return (
    <div className={`uk-margin-remove ${className}`}>
      {/* Header */}
      <div
        className="uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-background-muted"
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        <div className="uk-flex uk-flex-middle uk-grid-small" uk-grid="">
          <div>
            <span className="uk-text-bold">{title}</span>
          </div>
          {badge && (
            <div>
              <span className={getBadgeClasses(badge.variant)}>
                {badge.text}
              </span>
            </div>
          )}
        </div>
        <span uk-icon={`icon: chevron-${isExpanded ? "up" : "down"}`}></span>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="uk-padding-small uk-background-default">
          <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            {description}
          </p>

          <div className="uk-margin-small-top">
            <strong className="uk-text-small">Example</strong>
            <p className="uk-text-small uk-margin-remove-bottom uk-text-muted">
              {example}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TariffTypesExpander;
