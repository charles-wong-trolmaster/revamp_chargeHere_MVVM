import React from "react";

interface ChargingStatsCardProps {
  type: "time" | "cost";
  value: string;
  subtext: string;
  icon?: React.ReactNode;
}

const ChargingStatsCard: React.FC<ChargingStatsCardProps> = ({
  type,
  value,
  subtext,
  icon,
}) => {
  const getDefaultIcon = () => {
    if (type === "time") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
            fill="currentColor"
          />
        </svg>
      );
    }
  };

  return (
    <div
      className={`uk-card uk-card-default uk-card-body uk-padding-small charging-stats-card ${type}-card`}
    >
      <div className="uk-text-center">
        {/* Icon */}
        <div className="uk-margin-small-bottom">
          <div className={`charging-icon ${type}-icon`}>
            {icon || getDefaultIcon()}
          </div>
        </div>

        {/* Value Display */}
        <div
          className={`uk-text-large uk-text-bold uk-margin-small-bottom ${type}-display`}
        >
          {value}
        </div>

        {/* Subtext */}
        <div className="uk-text-small uk-text-muted charging-subtext">
          {subtext}
        </div>
      </div>
    </div>
  );
};

export default ChargingStatsCard;
