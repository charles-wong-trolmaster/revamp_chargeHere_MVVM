import React, { useState } from "react";

export interface PricingExpandedContentProps {
  className?: string;
  name: string;
  validStart: string;
  validEnd: string;
  activeHours: string;
  validDays: string[];
  fee: {
    name: string;
    originFee?: {
      name: string;
      price: string;
    };
    feeBadge?: {
      text: string;
      variant: string;
      description: string;
    };
    type?: {
      name: string;
      price: string;
      badge?: {
        text: string;
        variant: string;
      };
      description?: string[];
      remark?: string;
    }[];
  }[];
}

const PricingExpander: React.FC<PricingExpandedContentProps> = ({
  name,
  validStart,
  validEnd,
  activeHours,
  validDays,
  fee,
  className = "",
}) => {
  // State to track which fee categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean;
  }>({});

  // Toggle function for individual fee categories
  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

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

  const formatDateRange = (start: string, end: string) => {
    return `${start} to ${end}`;
  };

  const formatValidDays = (days: string[]) => {
    return days.join(", ");
  };

  return (
    <div className={`uk-margin-remove ${className}`}>
      {/* Header Section */}
      <div className="">
        <h3 className="uk-text-white uk-margin-remove">{name}</h3>

        <div className="" uk-grid="">
          <div className="uk-width-1-2">
            <div className="uk-card">Valid Period</div>
          </div>
          <div className="uk-width-1-2">
            <div className="uk-card">
              {formatDateRange(validStart, validEnd)}
            </div>
          </div>
        </div>

        <div className="" uk-grid="">
          <div className="uk-width-1-2">
            <div className="uk-card">Active Hours</div>
          </div>
          <div className="uk-width-1-2">
            <div className="uk-card">{activeHours}</div>
          </div>
        </div>

        <div className="" uk-grid="">
          <div className="uk-width-1-2">
            <div className="uk-card">Valid Days</div>
          </div>
          <div className="uk-width-1-2">
            <div className="uk-card">{formatValidDays(validDays)}</div>
          </div>
        </div>
      </div>

      {/* Fees Section */}
      <div className="uk-card-body uk-padding-remove">
        {fee.map((feeCategory, categoryIndex) => {
          const isCategoryExpanded = expandedCategories[categoryIndex];
          return (
            <div key={categoryIndex} className="uk-margin-bottom">
              {/* Fee Category Header - Now clickable button */}
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-background-muted uk-width-1-1 uk-button uk-button-default"
                style={{ cursor: "pointer" }}
              >
                <span className="uk-text-bold">{feeCategory.name}</span>
                {feeCategory.feeBadge && (
                  <div className="">
                    <span
                      className={getBadgeClasses(feeCategory.feeBadge.variant)}
                    >
                      {feeCategory.feeBadge.text}
                    </span>
                  </div>
                )}

                <span
                  uk-icon={`icon: chevron-${
                    isCategoryExpanded ? "up" : "down"
                  }`}
                ></span>
              </button>
              {feeCategory.originFee && (
                <div className="uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-background-muted">
                  <div
                    className="uk-flex uk-flex-middle uk-grid-small"
                    uk-grid=""
                  >
                    <div>
                      <span className="uk-text-bold">
                        {feeCategory.originFee.name}
                      </span>
                    </div>
                  </div>
                  <span className="uk-text-bold uk-text-danger">
                    {feeCategory.originFee.price}{" "}
                  </span>
                </div>
              )}
              {feeCategory.feeBadge && (
                <div className="uk-padding-small uk-background-default">
                  <span>{feeCategory.feeBadge.description}</span>
                </div>
              )}
              {/* Fee Items - Only show if this category is expanded */}
              {isCategoryExpanded && (
                <div className="">
                  {feeCategory.type &&
                    feeCategory.type.map((feeType, typeIndex) => (
                      <div key={typeIndex} className="uk-border-bottom">
                        {/* Fee Item Header */}
                        <div className="uk-flex uk-flex-between uk-flex-middle uk-padding-small uk-background-muted">
                          <div
                            className="uk-flex uk-flex-middle uk-grid-small"
                            uk-grid=""
                          >
                            <div>
                              <span className="uk-text-bold">
                                {feeType.name}
                              </span>
                            </div>
                            {feeType.badge && (
                              <div>
                                <span
                                  className={getBadgeClasses(
                                    feeType.badge.variant
                                  )}
                                >
                                  {feeType.badge.text}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="uk-text-bold uk-text-danger">
                            {feeType.price}
                          </span>
                        </div>

                        {/* Fee Item Details - Only show if expanded */}
                        {isCategoryExpanded && feeType.description && (
                          <div className="uk-padding-small uk-background-default">
                            <ul className="uk-list uk-margin-remove">
                              {feeType.description.map((desc, descIndex) => (
                                <li
                                  key={descIndex}
                                  className="uk-text-small uk-text-muted"
                                >
                                  • {desc}
                                </li>
                              ))}
                            </ul>
                            {feeType.remark && (
                              <div className="uk-padding-small ">
                                <p className="uk-text-small uk-text-muted ">
                                  {feeType.remark}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingExpander;
