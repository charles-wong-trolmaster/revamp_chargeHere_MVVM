import React, { useState, useRef, useEffect, useCallback } from "react";

interface DayPickerProps {
  initialDate?: string; // ISO date string like "2026-08-04"
  onChange?: (date: string) => void; // Returns ISO date string
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

const DayPicker: React.FC<DayPickerProps> = ({
  initialDate,
  onChange,
  className = "",
}) => {
  console.log(initialDate);

  // Parse initial date or use current date
  const parseInitialDate = useCallback((dateString?: string) => {
    if (dateString) {
      const date = new Date(dateString);
      return {
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
      };
    }
    const now = new Date();
    return {
      month: now.getMonth() + 1,
      day: now.getDate(),
      year: now.getFullYear(),
    };
  }, []);

  // Initialize state from parsed initial date
  const initialParsedDate = parseInitialDate(initialDate);
  const [selectedMonth, setSelectedMonth] = useState(initialParsedDate.month);
  const [selectedDay, setSelectedDay] = useState(initialParsedDate.day);
  const [selectedYear, setSelectedYear] = useState(initialParsedDate.year);

  const itemHeight = 40;
  const centerOffset = 50;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  // Calculate days in month
  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  }, []);

  const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  // Format date as ISO string (YYYY-MM-DD)
  const formatDateAsISO = useCallback(
    (month: number, day: number, year: number) => {
      const monthStr = month.toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      return `${year}-${monthStr}-${dayStr}`;
    },
    []
  );

  const selectorRefs = useRef<{
    month: SelectorData;
    day: SelectorData;
    year: SelectorData;
  }>({
    month: createInitialSelectorData(selectedMonth - 1),
    day: createInitialSelectorData(selectedDay - 1),
    year: createInitialSelectorData(years.indexOf(selectedYear)),
  });

  const monthContentRef = useRef<HTMLDivElement>(null);
  const dayContentRef = useRef<HTMLDivElement>(null);
  const yearContentRef = useRef<HTMLDivElement>(null);

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

  const updateSelectedValue = useCallback(
    (type: "month" | "day" | "year", value: any) => {
      let newMonth = selectedMonth;
      let newDay = selectedDay;
      let newYear = selectedYear;

      switch (type) {
        case "month":
          newMonth = value;
          setSelectedMonth(value);
          // Adjust day if it's beyond the new month's range
          const newDaysInMonth = getDaysInMonth(value, selectedYear);
          if (selectedDay > newDaysInMonth) {
            newDay = newDaysInMonth;
            setSelectedDay(newDaysInMonth);
          }
          break;
        case "day":
          newDay = value;
          setSelectedDay(value);
          break;
        case "year":
          newYear = value;
          setSelectedYear(value);
          // Adjust day if it's February 29th and new year is not a leap year
          const newDaysInMonthForYear = getDaysInMonth(selectedMonth, value);
          if (selectedDay > newDaysInMonthForYear) {
            newDay = newDaysInMonthForYear;
            setSelectedDay(newDaysInMonthForYear);
          }
          break;
      }

      if (onChange) {
        onChange(formatDateAsISO(newMonth, newDay, newYear));
      }
    },
    [
      selectedMonth,
      selectedDay,
      selectedYear,
      onChange,
      getDaysInMonth,
      formatDateAsISO,
    ]
  );

  const updateItemStatesByIndex = useCallback(
    (type: "month" | "day" | "year", centerIndex: number) => {
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;
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
    (type: "month" | "day" | "year", index: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

      selector.translateY = centerOffset - index * itemHeight;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${selector.translateY}px)`;
      }
    },
    []
  );

  const animateToPosition = useCallback(
    (type: "month" | "day" | "year", index: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

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
    (type: "month" | "day" | "year") => {
      const selector = selectorRefs.current[type];
      const options = type === "month" ? months : type === "day" ? days : years;

      const currentPosition = centerOffset - selector.translateY;
      const nearestIndex = Math.round(currentPosition / itemHeight);
      const clampedIndex = Math.max(
        0,
        Math.min(options.length - 1, nearestIndex)
      );

      selector.currentIndex = clampedIndex;
      animateToPosition(type, clampedIndex);

      if (type === "month") {
        updateSelectedValue(type, clampedIndex + 1);
      } else if (type === "day") {
        updateSelectedValue(type, options[clampedIndex]);
      } else {
        updateSelectedValue(type, options[clampedIndex]);
      }
    },
    [animateToPosition, updateSelectedValue, months, days, years]
  );

  const applyMomentum = useCallback(
    (type: "month" | "day" | "year") => {
      const selector = selectorRefs.current[type];
      const options = type === "month" ? months : type === "day" ? days : years;
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

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
    [snapToNearest, updateItemStatesByIndex, months, days, years]
  );

  const handleStart = useCallback(
    (type: "month" | "day" | "year", clientY: number) => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

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
    (type: "month" | "day" | "year", clientY: number) => {
      const selector = selectorRefs.current[type];
      const options = type === "month" ? months : type === "day" ? days : years;
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

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
    [updateItemStatesByIndex, months, days, years]
  );

  const handleEnd = useCallback(
    (type: "month" | "day" | "year") => {
      const selector = selectorRefs.current[type];
      const contentRef =
        type === "month"
          ? monthContentRef
          : type === "day"
          ? dayContentRef
          : yearContentRef;

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
    (type: "month" | "day" | "year", direction: number) => {
      const selector = selectorRefs.current[type];
      const options = type === "month" ? months : type === "day" ? days : years;

      const newIndex = Math.max(
        0,
        Math.min(options.length - 1, selector.currentIndex + direction)
      );
      if (newIndex !== selector.currentIndex) {
        selector.currentIndex = newIndex;
        animateToPosition(type, newIndex);

        if (type === "month") {
          updateSelectedValue(type, newIndex + 1);
        } else if (type === "day") {
          updateSelectedValue(type, options[newIndex]);
        } else {
          updateSelectedValue(type, options[newIndex]);
        }
      }
    },
    [animateToPosition, updateSelectedValue, months, days, years]
  );

  const handleWheel = useCallback(
    (type: "month" | "day" | "year", e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

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
        const typedType = type as "month" | "day" | "year";
        if (selectorRefs.current[typedType].isDragging) {
          handleMove(typedType, e.clientY);
        }
      });
    };

    const handleGlobalMouseUp = () => {
      Object.keys(selectorRefs.current).forEach((type) => {
        const typedType = type as "month" | "day" | "year";
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

  // Effect to handle prop changes (if initialDate changes after mount)
  useEffect(() => {
    if (initialDate) {
      const parsedDate = parseInitialDate(initialDate);
      if (
        parsedDate.month !== selectedMonth ||
        parsedDate.day !== selectedDay ||
        parsedDate.year !== selectedYear
      ) {
        setSelectedMonth(parsedDate.month);
        setSelectedDay(parsedDate.day);
        setSelectedYear(parsedDate.year);

        // Update selector refs
        selectorRefs.current.month.currentIndex = parsedDate.month - 1;
        selectorRefs.current.day.currentIndex = parsedDate.day - 1;
        selectorRefs.current.year.currentIndex = years.indexOf(parsedDate.year);

        // Update positions
        setPosition("month", parsedDate.month - 1);
        setPosition("day", parsedDate.day - 1);
        setPosition("year", years.indexOf(parsedDate.year));

        // Update visual states
        setTimeout(() => {
          updateItemStatesByIndex("month", parsedDate.month - 1);
          updateItemStatesByIndex("day", parsedDate.day - 1);
          updateItemStatesByIndex("year", years.indexOf(parsedDate.year));
        }, 50);
      }
    }
  }, [
    initialDate,
    selectedMonth,
    selectedDay,
    selectedYear,
    years,
    setPosition,
    updateItemStatesByIndex,
    parseInitialDate,
  ]);

  // Update day selector when month or year changes
  useEffect(() => {
    const newDaysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    if (newDaysInMonth !== days.length) {
      // Reset day selector position if the number of days changed
      const newDayIndex = Math.min(selectedDay - 1, newDaysInMonth - 1);
      selectorRefs.current.day.currentIndex = newDayIndex;
      setPosition("day", newDayIndex);
      updateItemStatesByIndex("day", newDayIndex);
    }
  }, [
    selectedMonth,
    selectedYear,
    getDaysInMonth,
    days.length,
    selectedDay,
    setPosition,
    updateItemStatesByIndex,
  ]);

  // Initialize positions on mount
  useEffect(() => {
    setPosition("month", selectedMonth - 1);
    setPosition("day", selectedDay - 1);
    setPosition("year", years.indexOf(selectedYear));

    setTimeout(() => {
      updateItemStatesByIndex("month", selectedMonth - 1);
      updateItemStatesByIndex("day", selectedDay - 1);
      updateItemStatesByIndex("year", years.indexOf(selectedYear));
    }, 100);
  }, []); // Empty dependency array - only run on mount

  const styles = {
    datePicker: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      background: "rgba(255, 255, 255, 0.15)",
      padding: "10px",
      borderRadius: "20px",
      marginBottom: "20px",
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
      <div style={styles.datePicker}>
        {/* Month Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("month", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("month", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("month", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.month.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("month", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.month.isDragging) {
                handleEnd("month");
              }
            }}
          >
            <div ref={monthContentRef} style={styles.scrollContent}>
              {months.map((month, index) => (
                <div
                  key={month}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.selectorOverlay}>
            <div style={styles.selectionIndicator}></div>
          </div>
        </div>

        {/* Day Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("day", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("day", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("day", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.day.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("day", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.day.isDragging) {
                handleEnd("day");
              }
            }}
          >
            <div ref={dayContentRef} style={styles.scrollContent}>
              {days.map((day, index) => (
                <div
                  key={day}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {day.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div style={styles.selectorOverlay}>
            <div style={styles.selectionIndicator}></div>
          </div>
        </div>

        {/* Year Selector */}
        <div style={styles.scrollSelector}>
          <div
            style={styles.scrollContainer}
            onWheel={(e) => handleWheel("year", e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleStart("year", e.clientY);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart("year", e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (selectorRefs.current.year.isDragging) {
                e.preventDefault();
                e.stopPropagation();
                handleMove("year", e.touches[0].clientY);
              }
            }}
            onTouchEnd={() => {
              if (selectorRefs.current.year.isDragging) {
                handleEnd("year");
              }
            }}
          >
            <div ref={yearContentRef} style={styles.scrollContent}>
              {years.map((year, index) => (
                <div
                  key={year}
                  className="scroll-item"
                  style={styles.scrollItem}
                >
                  {year}
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

export default DayPicker;
