import React, { useState, useRef, useEffect, useCallback } from "react";

interface TimePickerProps {
  initialTime?: string; // Changed to accept "HH:MM" format (24-hour)
  onChange?: (time: string) => void; // Returns string in "HH:MM" format
  className?: string;
}

interface SelectorData {
  currentIndex: number;
  isDragging: boolean;
  startY: number;
  startTranslateY: number;
  translateY: number;
  velocity: number;
  lastMoveTime: number;
  lastMoveY: number;
  animationId: number | null;
  wheelAccumulator: number;
  wheelTimeout: NodeJS.Timeout | null;
}

const TimePicker: React.FC<TimePickerProps> = ({
  initialTime = "01:25", // Default to "01:25" (1:25 AM)
  onChange,
  className = "",
}) => {
  // Parse initial time string to extract hour, minute, and period
  const parseTimeString = useCallback((timeString: string) => {
    const [hourStr, minuteStr] = timeString.split(":");
    const hour24 = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    // Convert 24-hour to 12-hour format
    let hour12: number;
    let period: "AM" | "PM";

    if (hour24 === 0) {
      hour12 = 12;
      period = "AM";
    } else if (hour24 < 12) {
      hour12 = hour24;
      period = "AM";
    } else if (hour24 === 12) {
      hour12 = 12;
      period = "PM";
    } else {
      hour12 = hour24 - 12;
      period = "PM";
    }

    return { hour: hour12, minute, period };
  }, []);

  // Initialize state from parsed time string
  const initialParsedTime = parseTimeString(initialTime);
  const [selectedHour, setSelectedHour] = useState(initialParsedTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(
    initialParsedTime.minute
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    initialParsedTime.period
  );

  const itemHeight = 40;
  const centerOffset = 50;

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ["AM", "PM"] as const;

  const selectorRefs = useRef<{
    hour: SelectorData;
    minute: SelectorData;
    period: SelectorData;
  }>({
    hour: createInitialSelectorData(hours.indexOf(selectedHour)),
    minute: createInitialSelectorData(selectedMinute),
    period: createInitialSelectorData(periods.indexOf(selectedPeriod)),
  });

  const hourContentRef = useRef<HTMLDivElement>(null);
  const minuteContentRef = useRef<HTMLDivElement>(null);
  const periodContentRef = useRef<HTMLDivElement>(null);

  function createInitialSelectorData(index: number): SelectorData {
    return {
      currentIndex: index,
      isDragging: false,
      startY: 0,
      startTranslateY: 0,
      translateY: centerOffset - index * itemHeight,
      velocity: 0,
      lastMoveTime: 0,
      lastMoveY: 0,
      animationId: null,
      wheelAccumulator: 0,
      wheelTimeout: null,
    };
  }

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = useCallback(
    (hour: number, period: "AM" | "PM"): number => {
      if (period === "AM") {
        return hour === 12 ? 0 : hour;
      } else {
        return hour === 12 ? 12 : hour + 12;
      }
    },
    []
  );

  // Helper function to format time as "HH:MM"
  const formatTime = useCallback(
    (hour: number, minute: number, period: "AM" | "PM"): string => {
      const hour24 = convertTo24Hour(hour, period);
      return `${hour24.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    },
    [convertTo24Hour]
  );

  const updateSelectedValue = useCallback(
    (type: "hour" | "minute" | "period", value: any) => {
      let newHour = selectedHour;
      let newMinute = selectedMinute;
      let newPeriod = selectedPeriod;

      switch (type) {
        case "hour":
          newHour = value;
          setSelectedHour(value);
          break;
        case "minute":
          newMinute = value;
          setSelectedMinute(value);
          break;
        case "period":
          newPeriod = value;
          setSelectedPeriod(value);
          break;
      }

      if (onChange) {
        onChange(formatTime(newHour, newMinute, newPeriod));
      }
    },
    [selectedHour, selectedMinute, selectedPeriod, onChange, formatTime]
  );

  const updateItemStatesByIndex = useCallback(
    (type: "hour" | "minute" | "period", centerIndex: number) => {
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;
      const items = contentRef.current?.querySelectorAll(".scroll-item");

      if (items) {
        items.forEach((item, index) => {
          item.classList.remove("selected", "adjacent");

          if (index === centerIndex) {
            item.classList.add("selected");
          } else if (Math.abs(index - centerIndex) === 1) {
            item.classList.add("adjacent");
          }
        });
      }
    },
    []
  );

  const setPosition = useCallback(
    (type: "hour" | "minute" | "period", index: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      selector.translateY = centerOffset - index * itemHeight;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${selector.translateY}px)`;
      }
    },
    []
  );

  const animateToPosition = useCallback(
    (type: "hour" | "minute" | "period", index: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      selector.translateY = centerOffset - index * itemHeight;
      if (contentRef.current) {
        contentRef.current.style.transition =
          "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
        contentRef.current.style.transform = `translateY(${selector.translateY}px)`;
      }

      setTimeout(() => {
        updateItemStatesByIndex(type, index);
      }, 200);
    },
    [updateItemStatesByIndex]
  );

  const snapToNearest = useCallback(
    (type: "hour" | "minute" | "period") => {
      const selector = selectorRefs.current[type];
      const options =
        type === "hour" ? hours : type === "minute" ? minutes : periods;

      const currentPosition = centerOffset - selector.translateY;
      const nearestIndex = Math.round(currentPosition / itemHeight);
      const clampedIndex = Math.max(
        0,
        Math.min(options.length - 1, nearestIndex)
      );

      selector.currentIndex = clampedIndex;
      animateToPosition(type, clampedIndex);
      updateSelectedValue(type, options[clampedIndex]);
    },
    [animateToPosition, updateSelectedValue, hours, minutes, periods]
  );

  const applyMomentum = useCallback(
    (type: "hour" | "minute" | "period") => {
      const selector = selectorRefs.current[type];
      const options =
        type === "hour" ? hours : type === "minute" ? minutes : periods;
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      let currentVelocity = selector.velocity * 30;
      const friction = 0.88;
      const minVelocity = 1;

      const animate = () => {
        if (Math.abs(currentVelocity) < minVelocity) {
          snapToNearest(type);
          return;
        }

        currentVelocity *= friction;
        selector.translateY += currentVelocity;

        const maxTranslateY = centerOffset;
        const minTranslateY = centerOffset - (options.length - 1) * itemHeight;
        selector.translateY = Math.max(
          minTranslateY,
          Math.min(maxTranslateY, selector.translateY)
        );

        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${selector.translateY}px)`;
        }

        const currentPosition = centerOffset - selector.translateY;
        const centerIndex = Math.round(currentPosition / itemHeight);
        updateItemStatesByIndex(type, centerIndex);

        selector.animationId = requestAnimationFrame(animate);
      };

      selector.animationId = requestAnimationFrame(animate);
    },
    [snapToNearest, updateItemStatesByIndex, hours, minutes, periods]
  );

  const handleStart = useCallback(
    (type: "hour" | "minute" | "period", clientY: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      selector.isDragging = true;
      selector.startY = clientY;
      selector.startTranslateY = selector.translateY;
      selector.velocity = 0;
      selector.lastMoveTime = Date.now();
      selector.lastMoveY = clientY;

      if (selector.animationId) {
        cancelAnimationFrame(selector.animationId);
        selector.animationId = null;
      }

      if (contentRef.current) {
        contentRef.current.style.transition = "none";
      }
    },
    []
  );

  const handleMove = useCallback(
    (type: "hour" | "minute" | "period", clientY: number) => {
      const selector = selectorRefs.current[type];
      const options =
        type === "hour" ? hours : type === "minute" ? minutes : periods;
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      if (!selector.isDragging) return;

      const deltaY = (clientY - selector.startY) * 0.4;
      selector.translateY = selector.startTranslateY + deltaY;

      const maxTranslateY = centerOffset;
      const minTranslateY = centerOffset - (options.length - 1) * itemHeight;
      selector.translateY = Math.max(
        minTranslateY,
        Math.min(maxTranslateY, selector.translateY)
      );

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${selector.translateY}px)`;
      }

      const now = Date.now();
      const timeDelta = now - selector.lastMoveTime;
      if (timeDelta > 16) {
        selector.velocity = ((clientY - selector.lastMoveY) / timeDelta) * 0.2;
        selector.lastMoveTime = now;
        selector.lastMoveY = clientY;
      }

      const currentPosition = centerOffset - selector.translateY;
      const centerIndex = Math.round(currentPosition / itemHeight);
      updateItemStatesByIndex(type, centerIndex);
    },
    [updateItemStatesByIndex, hours, minutes, periods]
  );

  const handleEnd = useCallback(
    (type: "hour" | "minute" | "period") => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "hour"
          ? hourContentRef
          : type === "minute"
          ? minuteContentRef
          : periodContentRef;

      selector.isDragging = false;
      if (contentRef.current) {
        contentRef.current.style.transition =
          "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
      }

      if (Math.abs(selector.velocity) > 0.8) {
        applyMomentum(type);
      } else {
        snapToNearest(type);
      }
    },
    [applyMomentum, snapToNearest]
  );

  const scrollByStep = useCallback(
    (type: "hour" | "minute" | "period", direction: number) => {
      const selector = selectorRefs.current[type];
      const options =
        type === "hour" ? hours : type === "minute" ? minutes : periods;

      const newIndex = Math.max(
        0,
        Math.min(options.length - 1, selector.currentIndex + direction)
      );
      if (newIndex !== selector.currentIndex) {
        selector.currentIndex = newIndex;
        animateToPosition(type, newIndex);
        updateSelectedValue(type, options[newIndex]);
      }
    },
    [animateToPosition, updateSelectedValue, hours, minutes, periods]
  );

  const handleWheel = useCallback(
    (type: "hour" | "minute" | "period", e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation(); // Added this line

      const selector = selectorRefs.current[type];

      selector.wheelAccumulator += e.deltaY;

      if (selector.wheelTimeout) {
        clearTimeout(selector.wheelTimeout);
      }

      const threshold = 50;
      if (Math.abs(selector.wheelAccumulator) >= threshold) {
        const direction = selector.wheelAccumulator > 0 ? 1 : -1;
        scrollByStep(type, direction);
        selector.wheelAccumulator = 0;
      }

      selector.wheelTimeout = setTimeout(() => {
        selector.wheelAccumulator = 0;
      }, 150);
    },
    [scrollByStep]
  );

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      Object.keys(selectorRefs.current).forEach((type) => {
        const typedType = type as "hour" | "minute" | "period";
        if (selectorRefs.current[typedType].isDragging) {
          handleMove(typedType, e.clientY);
        }
      });
    };

    const handleGlobalMouseUp = () => {
      Object.keys(selectorRefs.current).forEach((type) => {
        const typedType = type as "hour" | "minute" | "period";
        if (selectorRefs.current[typedType].isDragging) {
          handleEnd(typedType);
        }
      });
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [handleMove, handleEnd]);

  useEffect(() => {
    // Initialize positions
    setPosition("hour", hours.indexOf(selectedHour));
    setPosition("minute", selectedMinute);
    setPosition("period", periods.indexOf(selectedPeriod));

    // Update item states
    setTimeout(() => {
      updateItemStatesByIndex("hour", hours.indexOf(selectedHour));
      updateItemStatesByIndex("minute", selectedMinute);
      updateItemStatesByIndex("period", periods.indexOf(selectedPeriod));
    }, 100);
  }, []);

  // Effect to handle prop changes (if initialTime changes after mount)
  useEffect(() => {
    const parsedTime = parseTimeString(initialTime);
    if (
      parsedTime.hour !== selectedHour ||
      parsedTime.minute !== selectedMinute ||
      parsedTime.period !== selectedPeriod
    ) {
      setSelectedHour(parsedTime.hour);
      setSelectedMinute(parsedTime.minute);
      setSelectedPeriod(parsedTime.period);

      // Update positions
      setPosition("hour", hours.indexOf(parsedTime.hour));
      setPosition("minute", parsedTime.minute);
      setPosition("period", periods.indexOf(parsedTime.period));

      // Update visual states
      setTimeout(() => {
        updateItemStatesByIndex("hour", hours.indexOf(parsedTime.hour));
        updateItemStatesByIndex("minute", parsedTime.minute);
        updateItemStatesByIndex("period", periods.indexOf(parsedTime.period));
      }, 100);
    }
  }, [
    initialTime,
    parseTimeString,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    setPosition,
    updateItemStatesByIndex,
    hours,
    periods,
  ]);

  const styles = {
    timePicker: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      background: "rgba(255, 255, 255, 0.15)",
      padding: "10px",
      borderRadius: "20px",
      marginBottom: "20px",
    },
    separator: {
      fontSize: "28px",
      fontWeight: 300,
      color: "white",
      margin: "0 8px",
    },
    scrollSelector: {
      position: "relative" as const,
      width: "80px",
      height: "140px",
    },
    scrollContainer: {
      height: "140px",
      overflow: "hidden",
      position: "relative" as const,
      cursor: "ns-resize",
      userSelect: "none" as const,
      touchAction: "pan-y",
      overscrollBehavior: "contain",
    },
    scrollContent: {
      position: "relative" as const,
      transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: "translateY(50px)",
    },
    scrollItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "40px",
      fontSize: "22px",
      fontWeight: 300,
      color: "rgba(255, 255, 255, 0.5)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    selectorOverlay: {
      position: "absolute" as const,
      top: "50px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "70px",
      height: "40px",
      pointerEvents: "none" as const,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    selectionIndicator: {
      width: "100%",
      height: "100%",
      borderTop: "2px solid white",
      borderBottom: "2px solid white",
      background:
        "linear-gradient(135deg, rgba(40, 167, 69, 0.08), rgba(40, 167, 69, 0.03))",
      boxShadow: "0 0 15px rgba(40, 167, 69, 0.2)",
    },
  };

  const cssString = `
    .scroll-item.selected {
      color: white !important;
      font-weight: 600 !important;
      transform: scale(1.1);
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .scroll-item.adjacent {
      color: rgba(255, 255, 255, 0.7) !important;
      font-weight: 400 !important;
    }
  `;

  return (
    <div className={className}>
      <style>{cssString}</style>
      <div style={styles.timePicker}>
        {/* Hour Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("hour", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("hour", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("hour", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.hour.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("hour", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.hour.isDragging) {
                handleEnd("hour");
              }
            }}
          >
            <div ref={hourContentRef} style={styles.scrollContent}>
              {hours.map((hour, index) => (
                <div
                  key={hour}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {hour.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.selectorOverlay}>
            <div style={styles.selectionIndicator}></div>
          </div>
        </div>

        <div style={styles.separator}>:</div>

        {/* Minute Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("minute", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("minute", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("minute", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.minute.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("minute", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.minute.isDragging) {
                handleEnd("minute");
              }
            }}
          >
            <div ref={minuteContentRef} style={styles.scrollContent}>
              {minutes.map((minute, index) => (
                <div
                  key={minute}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {minute.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.selectorOverlay}>
            <div style={styles.selectionIndicator}></div>
          </div>
        </div>

        {/* Period Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("period", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("period", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("period", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.period.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("period", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.period.isDragging) {
                handleEnd("period");
              }
            }}
          >
            <div ref={periodContentRef} style={styles.scrollContent}>
              {periods.map((period, index) => (
                <div
                  key={period}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.selectorOverlay}>
            <div style={styles.selectionIndicator}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
