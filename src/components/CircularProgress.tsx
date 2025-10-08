import React from "react";
import "../styles/(layer 1)/CircularProgress.css";

type Mode = "power" | "time";

interface CircularProgressProps {
  mode: Mode;
  value: number;
  max?: number;
  /** Size of the circle in pixels (default: 120) */
  size?: number;
  /** Stroke width in pixels (default: 8) */
  strokeWidth?: number;
  /** Color of the progress arc */
  progressColor?: string;
  /** Color of the background arc (default: #333) */
  backgroundColor?: string;
  /** Additional text to display below main text (for power mode, e.g., "125 kW") */
  secondaryText?: string;
  /** Additional CSS class */
  className?: string;
  /** Total duration in seconds (for time mode, to calculate progress percentage) */
  totalDuration?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  mode,
  value,
  max,
  size = 120,
  strokeWidth = 8,
  progressColor = "#10b981",
  backgroundColor = "#374151",
  secondaryText,
  className = "",
  totalDuration,
}) => {
  // Helper function to format time from seconds
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate display values based on mode
  const getDisplayData = () => {
    switch (mode) {
      case "power":
        return {
          primaryText: `${Math.round(value)}%`,
          secondaryText: secondaryText || "",
          progressValue: value, // Direct percentage
          maxValue: max || 100,
          icon: "⚡",
        };

      case "time": {
        let progressPercentage = 0;
        if (totalDuration && totalDuration > 0) {
          // Make sure value doesn't exceed totalDuration
          const remainingTime = Math.min(value, totalDuration);
          const elapsedTime = totalDuration - remainingTime;
          progressPercentage = (elapsedTime / totalDuration) * 100;
        }
        return {
          primaryText: formatTime(value),
          secondaryText: secondaryText || "Remaining",
          progressValue: Math.max(0, Math.min(100, progressPercentage)),
          maxValue: 100,
          icon: "⏰",
        };
      }

      default:
        return {
          primaryText: String(value),
          secondaryText: secondaryText || "",
          progressValue: value,
          maxValue: max || 100,
          icon: "",
        };
    }
  };

  const displayData = getDisplayData();

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(
    displayData.progressValue / displayData.maxValue,
    1
  );
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - progress * circumference;

  // Determine color based on mode and value
  const getProgressColor = (): string => {
    if (progressColor !== "#10b981") return progressColor; // Use custom color if provided

    if (mode === "power") {
      if (value < 20) return "#ef4444"; // red - low battery
      if (value < 50) return "#f59e0b"; // yellow - medium battery
      return "#10b981"; // green - good battery
    }

    if (mode === "time") {
      // For time mode, we want to show urgency based on time remaining
      // OR based on percentage of time elapsed

      // Option 1: Based on absolute time remaining (simpler)
      if (value < 300) return "#ef4444"; // red if less than 5 minutes left

      if (totalDuration) {
        const percentageLeft = (value / totalDuration) * 100;
        if (percentageLeft < 10) return "#ef4444"; // red if less than 10% time left
        if (percentageLeft < 25) return "#f59e0b"; // yellow if less than 25% time left
        return "#10b981"; // green if more than 25% time left
      }
      if (value < 300) return "#ef4444";
      if (value < 1800) return "#f59e0b";
      return "#10b981";
    }

    return progressColor;
  };

  const finalProgressColor = getProgressColor();

  return (
    <div
      className={`circular-progress ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="circular-progress__svg">
        {" "}
        {/* Change to string literal */}
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="circular-progress__background" // Change to string literal
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={finalProgressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="circular-progress__progress" // Change to string literal
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      {/* Content overlay */}
      <div className="circular-progress__content">
        {" "}
        {/* Change to string literal */}
        <div className="circular-progress__icon">{displayData.icon}</div>{" "}
        {/* Change to string literal */}
        <div className="circular-progress__primary">
          {displayData.primaryText}
        </div>{" "}
        {displayData.secondaryText && (
          <div className="circular-progress__secondary">
            {displayData.secondaryText}
          </div>
        )}
        {/* Change to string literal */}
      </div>
    </div>
  );
};

export default CircularProgress;
