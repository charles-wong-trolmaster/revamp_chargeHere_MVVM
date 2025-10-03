import React from "react";
import { DayOfWeekEnum } from "@/interfaces/common.type";
import { styles } from "@/styles/(layer 1)/serviceStartupPenaltySchemePanelStyles";

interface DayOfWeekSelectorProps {
  selectedDays?: DayOfWeekEnum[];
  onChange: (selectedDays: DayOfWeekEnum[]) => void;
  disabled?: boolean;
  containerStyle?: React.CSSProperties;
  // showQuickSelect?: boolean;
  showIndividualSelect?: boolean;
  label?: string;
}

const DayOfWeekSelector: React.FC<DayOfWeekSelectorProps> = ({
  selectedDays = [],
  onChange,
  disabled = false,
  containerStyle = { marginTop: "15px" },
  // showQuickSelect = true,
  showIndividualSelect = true,
  label = "Days of Week:",
}) => {
  // const selectWeekdays = () => {
  //   if (disabled) return;
  //   const weekdays: DayOfWeekEnum[] = [
  //     DayOfWeekEnum.MONDAY,
  //     DayOfWeekEnum.TUESDAY,
  //     DayOfWeekEnum.WEDNESDAY,
  //     DayOfWeekEnum.THURSDAY,
  //     DayOfWeekEnum.FRIDAY,
  //   ];
  //   onChange(weekdays);
  // };

  // const selectWeekend = () => {
  //   if (disabled) return;
  //   const weekend: DayOfWeekEnum[] = [
  //     DayOfWeekEnum.SATURDAY,
  //     DayOfWeekEnum.SUNDAY,
  //   ];
  //   onChange(weekend);
  // };

  // const selectAllDays = () => {
  //   if (disabled) return;
  //   const allDays: DayOfWeekEnum[] = [
  //     DayOfWeekEnum.MONDAY,
  //     DayOfWeekEnum.TUESDAY,
  //     DayOfWeekEnum.WEDNESDAY,
  //     DayOfWeekEnum.THURSDAY,
  //     DayOfWeekEnum.FRIDAY,
  //     DayOfWeekEnum.SATURDAY,
  //     DayOfWeekEnum.SUNDAY,
  //   ];
  //   onChange(allDays);
  // };

  // const selectNoDays = () => {
  //   if (disabled) return;
  //   onChange([]);
  // };

  const handleDayChange = (day: DayOfWeekEnum) => {
    if (disabled) return;

    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  const dayConfigs = [
    { day: DayOfWeekEnum.SUNDAY, label: "S", isWeekend: false },
    { day: DayOfWeekEnum.MONDAY, label: "M", isWeekend: false },
    { day: DayOfWeekEnum.TUESDAY, label: "T", isWeekend: false },
    { day: DayOfWeekEnum.WEDNESDAY, label: "W", isWeekend: false },
    { day: DayOfWeekEnum.THURSDAY, label: "TH", isWeekend: false },
    { day: DayOfWeekEnum.FRIDAY, label: "F", isWeekend: false },
    { day: DayOfWeekEnum.SATURDAY, label: "SA", isWeekend: false },
  ];

  const getDayButtonStyle = (isSelected: boolean): React.CSSProperties => {
    const baseColor = "#4CAF50"; // Green for weekends, gray for weekdays

    return {
      backgroundColor: isSelected ? baseColor : "transparent",
      color: "#ffffff",
      border: `1px solid #666666`,
      borderRadius: "4px",
      padding: "4px 8px",
      fontSize: "12px",
      fontWeight: "500",
      cursor: disabled ? "not-allowed" : "pointer",
      minWidth: "28px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
      opacity: disabled ? 0.5 : 1,
      outline: "none",
    };
  };

  return (
    <div style={containerStyle}>
      <label style={styles.formLabel}>{label}</label>

      {showIndividualSelect && (
        <div style={{ ...styles.daySelector, gap: "6px" }}>
          {dayConfigs.map(({ day, label }) => (
            <button
              key={day}
              style={getDayButtonStyle(selectedDays.includes(day))}
              onClick={() => handleDayChange(day)}
              disabled={disabled}
              title={`Toggle ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayOfWeekSelector;
