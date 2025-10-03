import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DayOfWeekEnum,
  EnergyRateFee,
  EnergyTier,
  PenaltyFee,
  PenaltyFeeWithGracePeriod,
  RateType,
  Scheme,
  ServiceFee,
  StartupFee,
  TierMode,
  TimeRateFee,
  TimeRateFeeWithGracePeriod,
  TimeTier,
} from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import TimePicker from "./TimePicker";
import DayPicker from "./DayPicker";
import DayOfWeekSelector from "./DayOfWeekSelector";

interface SchemeDetailFormProps {
  displayMode?: boolean;
  scheme?: Scheme;
  onSave?: (scheme: Scheme) => void;
  onDelete?: () => void;
}

const SchemeDetailForm: React.FC<SchemeDetailFormProps> = ({
  displayMode = false,
  scheme,
  onSave,
  onDelete,
}) => {
  const [editedScheme, setEditedScheme] = useState<Scheme>(new Scheme(""));
  const [energyRateFeeMode, setEnergyRateFeeMode] = useState<string>("default");
  const [rateType, setRateType] = useState<RateType>(RateType.DYNAMIC);
  const [feeDate, setFeeDate] = useState<{ fromDate: string; toDate: string }>({
    fromDate: "2025-01-01",
    toDate: "2025-01-01",
  });
  const [feeTime, setFeeTime] = useState<{ fromTime: string; toTime: string }>({
    fromTime: "00:00",
    toTime: "00:00",
  });
  const [selectedDays, setSelectedDays] = useState<DayOfWeekEnum[]>([]);

  const updateScheme = (updater: (scheme: Scheme) => void) => {
    if (editedScheme) {
      const cloned = Scheme.fromObject(editedScheme.toObject());
      updater(cloned);
      setEditedScheme(cloned);
    }
  };

  const handleSave = () => {
    if (editedScheme.reservationCategory.keptRateFee?.rateType) {
      editedScheme.reservationCategory.keptRateFee.rateType = rateType;
    }
    if (editedScheme.reservationCategory.canceledRateFee?.rateType) {
      editedScheme.reservationCategory.canceledRateFee.rateType = rateType;
    }
    if (editedScheme.reservationCategory.noShowRateFee?.rateType) {
      editedScheme.reservationCategory.noShowRateFee.rateType = rateType;
    }
    if (editedScheme.energyCategory.rateFee?.rateType) {
      editedScheme.energyCategory.rateFee.rateType = rateType;
    }
    if (editedScheme.timeCategory.rateFee?.rateType) {
      editedScheme.timeCategory.rateFee.rateType = rateType;
    }
    if (editedScheme.overstayCategory.rateFee?.rateType) {
      editedScheme.overstayCategory.rateFee.rateType = rateType;
    }
    if (editedScheme.reservationCategory.serviceFee) {
      editedScheme.reservationCategory.serviceFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.reservationCategory.keptRateFee) {
      editedScheme.reservationCategory.keptRateFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.reservationCategory.canceledRateFee) {
      editedScheme.reservationCategory.canceledRateFee.withTemporalRestrictions(
        {
          start_date: feeDate.fromDate,
          end_date: feeDate.toDate,
          start_time: feeTime.fromTime,
          end_time: feeTime.toTime,
          day_of_week: selectedDays,
        }
      );
    }
    if (editedScheme.reservationCategory.noShowRateFee) {
      editedScheme.reservationCategory.noShowRateFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.reservationCategory.canceledPenaltyFee) {
      editedScheme.reservationCategory.canceledPenaltyFee.withTemporalRestrictions(
        {
          start_date: feeDate.fromDate,
          end_date: feeDate.toDate,
          start_time: feeTime.fromTime,
          end_time: feeTime.toTime,
          day_of_week: selectedDays,
        }
      );
    }
    if (editedScheme.reservationCategory.noShowPenaltyFee) {
      editedScheme.reservationCategory.noShowPenaltyFee.withTemporalRestrictions(
        {
          start_date: feeDate.fromDate,
          end_date: feeDate.toDate,
          start_time: feeTime.fromTime,
          end_time: feeTime.toTime,
          day_of_week: selectedDays,
        }
      );
    }
    if (editedScheme.energyCategory.startupFee) {
      editedScheme.energyCategory.startupFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.energyCategory.rateFee) {
      editedScheme.energyCategory.rateFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.timeCategory.startupFee) {
      editedScheme.timeCategory.startupFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.timeCategory.rateFee) {
      editedScheme.timeCategory.rateFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.overstayCategory.penaltyFee) {
      editedScheme.overstayCategory.penaltyFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }
    if (editedScheme.overstayCategory.rateFee) {
      editedScheme.overstayCategory.rateFee.withTemporalRestrictions({
        start_date: feeDate.fromDate,
        end_date: feeDate.toDate,
        start_time: feeTime.fromTime,
        end_time: feeTime.toTime,
        day_of_week: selectedDays,
      });
    }

    if (onSave) {
      onSave(editedScheme);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  useEffect(() => {
    if (scheme) {
      if (scheme.reservationCategory.keptRateFee) {
        setRateType(scheme.reservationCategory.keptRateFee.rateType);
      }
      if (scheme.reservationCategory.canceledRateFee) {
        setRateType(scheme.reservationCategory.canceledRateFee.rateType);
      }
      if (scheme.reservationCategory.noShowRateFee) {
        setRateType(scheme.reservationCategory.noShowRateFee.rateType);
      }
      if (scheme.energyCategory.rateFee) {
        setRateType(scheme.energyCategory.rateFee.rateType);
      }
      if (scheme.timeCategory.rateFee) {
        setRateType(scheme.timeCategory.rateFee.rateType);
      }
      if (scheme.overstayCategory.rateFee) {
        setRateType(scheme.overstayCategory.rateFee.rateType);
      }

      if (scheme.reservationCategory.serviceFee) {
        if (scheme.reservationCategory.serviceFee?.start_date) {
          const startDate = scheme.reservationCategory.serviceFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.serviceFee?.end_date) {
          const endDate = scheme.reservationCategory.serviceFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.serviceFee?.start_time) {
          const startTime = scheme.reservationCategory.serviceFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.serviceFee?.end_time) {
          const endTime = scheme.reservationCategory.serviceFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.serviceFee?.day_of_week) {
          const day_of_week = scheme.reservationCategory.serviceFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.reservationCategory.keptRateFee) {
        if (scheme.reservationCategory.keptRateFee?.start_date) {
          const startDate = scheme.reservationCategory.keptRateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.keptRateFee?.end_date) {
          const endDate = scheme.reservationCategory.keptRateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.keptRateFee?.start_time) {
          const startTime = scheme.reservationCategory.keptRateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.keptRateFee?.end_time) {
          const endTime = scheme.reservationCategory.keptRateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.keptRateFee?.day_of_week) {
          const day_of_week =
            scheme.reservationCategory.keptRateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.reservationCategory.canceledRateFee) {
        if (scheme.reservationCategory.canceledRateFee?.start_date) {
          const startDate =
            scheme.reservationCategory.canceledRateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.canceledRateFee?.end_date) {
          const endDate = scheme.reservationCategory.canceledRateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.canceledRateFee?.start_time) {
          const startTime =
            scheme.reservationCategory.canceledRateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.canceledRateFee?.end_time) {
          const endTime = scheme.reservationCategory.canceledRateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.canceledRateFee?.day_of_week) {
          const day_of_week =
            scheme.reservationCategory.canceledRateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.reservationCategory.noShowRateFee) {
        if (scheme.reservationCategory.noShowRateFee?.start_date) {
          const startDate = scheme.reservationCategory.noShowRateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.noShowRateFee?.end_date) {
          const endDate = scheme.reservationCategory.noShowRateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.noShowRateFee?.start_time) {
          const startTime = scheme.reservationCategory.noShowRateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.noShowRateFee?.end_time) {
          const endTime = scheme.reservationCategory.noShowRateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.noShowRateFee?.day_of_week) {
          const day_of_week =
            scheme.reservationCategory.noShowRateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.reservationCategory.canceledPenaltyFee) {
        if (scheme.reservationCategory.canceledPenaltyFee?.start_date) {
          const startDate =
            scheme.reservationCategory.canceledPenaltyFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.canceledPenaltyFee?.end_date) {
          const endDate =
            scheme.reservationCategory.canceledPenaltyFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.canceledPenaltyFee?.start_time) {
          const startTime =
            scheme.reservationCategory.canceledPenaltyFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.canceledPenaltyFee?.end_time) {
          const endTime =
            scheme.reservationCategory.canceledPenaltyFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.canceledPenaltyFee?.day_of_week) {
          const day_of_week =
            scheme.reservationCategory.canceledPenaltyFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.reservationCategory.noShowPenaltyFee) {
        if (scheme.reservationCategory.noShowPenaltyFee?.start_date) {
          const startDate =
            scheme.reservationCategory.noShowPenaltyFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.reservationCategory.noShowPenaltyFee?.end_date) {
          const endDate = scheme.reservationCategory.noShowPenaltyFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.reservationCategory.noShowPenaltyFee?.start_time) {
          const startTime =
            scheme.reservationCategory.noShowPenaltyFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.reservationCategory.noShowPenaltyFee?.end_time) {
          const endTime = scheme.reservationCategory.noShowPenaltyFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.reservationCategory.noShowPenaltyFee?.day_of_week) {
          const day_of_week =
            scheme.reservationCategory.noShowPenaltyFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.energyCategory.startupFee) {
        if (scheme.energyCategory.startupFee?.start_date) {
          const startDate = scheme.energyCategory.startupFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.energyCategory.startupFee?.end_date) {
          const endDate = scheme.energyCategory.startupFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.energyCategory.startupFee?.start_time) {
          const startTime = scheme.energyCategory.startupFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.energyCategory.startupFee?.end_time) {
          const endTime = scheme.energyCategory.startupFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.energyCategory.startupFee?.day_of_week) {
          const day_of_week = scheme.energyCategory.startupFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.energyCategory.rateFee) {
        if (scheme.energyCategory.rateFee?.start_date) {
          const startDate = scheme.energyCategory.rateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.energyCategory.rateFee?.end_date) {
          const endDate = scheme.energyCategory.rateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.energyCategory.rateFee?.start_time) {
          const startTime = scheme.energyCategory.rateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.energyCategory.rateFee?.end_time) {
          const endTime = scheme.energyCategory.rateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.energyCategory.rateFee?.day_of_week) {
          const day_of_week = scheme.energyCategory.rateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.timeCategory.startupFee) {
        if (scheme.timeCategory.startupFee?.start_date) {
          const startDate = scheme.timeCategory.startupFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.timeCategory.startupFee?.end_date) {
          const endDate = scheme.timeCategory.startupFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.timeCategory.startupFee?.start_time) {
          const startTime = scheme.timeCategory.startupFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.timeCategory.startupFee?.end_time) {
          const endTime = scheme.timeCategory.startupFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.timeCategory.startupFee?.day_of_week) {
          const day_of_week = scheme.timeCategory.startupFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.timeCategory.rateFee) {
        if (scheme.timeCategory.rateFee?.start_date) {
          const startDate = scheme.timeCategory.rateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.timeCategory.rateFee?.end_date) {
          const endDate = scheme.timeCategory.rateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.timeCategory.rateFee?.start_time) {
          const startTime = scheme.timeCategory.rateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.timeCategory.rateFee?.end_time) {
          const endTime = scheme.timeCategory.rateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.timeCategory.rateFee?.day_of_week) {
          const day_of_week = scheme.timeCategory.rateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.overstayCategory.penaltyFee) {
        if (scheme.overstayCategory.penaltyFee?.start_date) {
          const startDate = scheme.overstayCategory.penaltyFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.overstayCategory.penaltyFee?.end_date) {
          const endDate = scheme.overstayCategory.penaltyFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.overstayCategory.penaltyFee?.start_time) {
          const startTime = scheme.overstayCategory.penaltyFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.overstayCategory.penaltyFee?.end_time) {
          const endTime = scheme.overstayCategory.penaltyFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.overstayCategory.penaltyFee?.day_of_week) {
          const day_of_week = scheme.overstayCategory.penaltyFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      if (scheme.overstayCategory.rateFee) {
        if (scheme.overstayCategory.rateFee?.start_date) {
          const startDate = scheme.overstayCategory.rateFee.start_date;
          setFeeDate((prev) => ({ ...prev, fromDate: startDate }));
        }
        if (scheme.overstayCategory.rateFee?.end_date) {
          const endDate = scheme.overstayCategory.rateFee.end_date;
          setFeeDate((prev) => ({ ...prev, toDate: endDate }));
        }
        if (scheme.overstayCategory.rateFee?.start_time) {
          const startTime = scheme.overstayCategory.rateFee.start_time;
          setFeeTime((prev) => ({ ...prev, fromTime: startTime }));
        }
        if (scheme.overstayCategory.rateFee?.end_time) {
          const endTime = scheme.overstayCategory.rateFee.end_time;
          setFeeTime((prev) => ({ ...prev, toTime: endTime }));
        }
        if (scheme.overstayCategory.rateFee?.day_of_week) {
          const day_of_week = scheme.overstayCategory.rateFee.day_of_week;
          setSelectedDays(day_of_week);
        }
      }

      setEditedScheme(scheme);
    } else {
      setEnergyRateFeeMode("default");
      setRateType(RateType.DYNAMIC);
      setFeeDate({
        fromDate: "2025-01-01",
        toDate: "2025-01-01",
      });
      setFeeTime({ fromTime: "00:00", toTime: "00:00" });
      setSelectedDays([]);
      setEditedScheme(new Scheme(""));
    }
  }, [scheme]);

  return (
    <div style={styles.container}>
      <div style={styles.locationsPanel}>
        <div style={styles.contentContainer}>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name:</label>
                <input
                  type="text"
                  value={editedScheme.name}
                  style={styles.input}
                  onChange={(e) =>
                    updateScheme((scheme) => {
                      scheme.name = e.target.value;
                    })
                  }
                  disabled={displayMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description:</label>
                <input
                  type="text"
                  value={editedScheme.description || ""}
                  style={styles.input}
                  onChange={(e) =>
                    updateScheme((scheme) => {
                      scheme.description = e.target.value;
                    })
                  }
                  disabled={displayMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Rate Type:</label>
                <div
                  style={{
                    display: "flex",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor:
                        rateType === RateType.DYNAMIC
                          ? "#10b981"
                          : "rgba(255,255,255,0.1)",
                      color:
                        rateType === RateType.DYNAMIC
                          ? "white"
                          : "rgba(255,255,255,0.7)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      setRateType(RateType.DYNAMIC);
                    }}
                    disabled={displayMode}
                  >
                    Dynamic
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor:
                        rateType === RateType.LOCK
                          ? "#10b981"
                          : "rgba(255,255,255,0.1)",
                      color:
                        rateType === RateType.LOCK
                          ? "white"
                          : "rgba(255,255,255,0.7)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      setRateType(RateType.LOCK);
                    }}
                    disabled={displayMode}
                  >
                    LOCK
                  </button>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Temporal Restriction</label>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>From Date</label>
                <DayPicker
                  initialDate={feeDate.fromDate}
                  onChange={(date) =>
                    setFeeDate((prev) => ({ ...prev, fromDate: date }))
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>To Date</label>
                <DayPicker
                  initialDate={feeDate.toDate}
                  onChange={(date) =>
                    setFeeDate((prev) => ({ ...prev, toDate: date }))
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>From Time</label>
                <TimePicker
                  initialTime={feeTime.fromTime}
                  onChange={(time) =>
                    setFeeTime((prev) => ({ ...prev, fromTime: time }))
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>To Time</label>
                <TimePicker
                  initialTime={feeTime.toTime}
                  onChange={(time) =>
                    setFeeTime((prev) => ({ ...prev, toTime: time }))
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Day of Week</label>
                <DayOfWeekSelector
                  selectedDays={selectedDays}
                  onChange={(e) => setSelectedDays(e)}
                />
              </div>

              <div style={styles.formGroup}>
                <h4 style={styles.sectionHeader}>Reservation</h4>
                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Service Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.categories.reservation.serviceFee) {
                          cloned.categories.reservation.setServiceFee(
                            new ServiceFee(0)
                          );
                        } else {
                          if (
                            editedScheme.categories.reservation.serviceFee
                              .enabled
                          ) {
                            cloned.categories.reservation.serviceFee?.disable();
                          } else {
                            cloned.categories.reservation.serviceFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.categories.reservation
                            .serviceFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.categories.reservation.serviceFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.serviceFee?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getServiceFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getServiceFee();
                                  if (fee) {
                                    fee.amount =
                                      parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              VAT
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getServiceFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getServiceFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>
                        {"Rate Fee - Kept"}
                      </span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.reservationCategory.keptRateFee) {
                          cloned.reservationCategory.setKeptRateFee(
                            new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                          );
                        } else {
                          if (
                            editedScheme.reservationCategory.keptRateFee.enabled
                          ) {
                            cloned.reservationCategory.keptRateFee?.disable();
                          } else {
                            cloned.reservationCategory.keptRateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.reservationCategory
                            .keptRateFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.reservationCategory.keptRateFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.getKeptRateFee()
                      ?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="uk-flex">
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Tier Mode
                            </label>
                            <div
                              style={{
                                display: "flex",
                                borderRadius: "6px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory.keptRateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory.keptRateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.keptRateFee?.setTierMode(
                                    TierMode.BRACKET
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Bracket
                              </button>
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory.keptRateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory.keptRateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.keptRateFee?.setTierMode(
                                    TierMode.THRESHOLD
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Threshold
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                                height: "30px",
                              }}
                              value={
                                editedScheme.reservationCategory.getKeptRateFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getKeptRateFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>

                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (min)"}</div>
                                <div>{"To (min)"}</div>
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.reservationCategory.keptRateFee?.getTimeTiers() &&
                                editedScheme.reservationCategory.keptRateFee
                                  .getTimeTiers()
                                  .map((time_tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.keptRateFee?.getTimeTier(
                                            index
                                          )?.minDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .keptRateFee
                                          ) {
                                            cloned.reservationCategory.keptRateFee.timeTiers[
                                              index
                                            ].minDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.keptRateFee?.getTimeTier(
                                            index
                                          )?.maxDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .keptRateFee
                                          ) {
                                            cloned.reservationCategory.keptRateFee.timeTiers[
                                              index
                                            ].maxDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.keptRateFee?.getTimeTier(
                                            index
                                          )?.pricePerHour
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .keptRateFee
                                          ) {
                                            cloned.reservationCategory.keptRateFee.timeTiers[
                                              index
                                            ].pricePerHour = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.reservationCategory.keptRateFee?.removeTimeTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.keptRateFee?.addTimeTier(
                                    new TimeTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>
                        {"Rate Fee - Canceled"}
                      </span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.reservationCategory.canceledRateFee) {
                          cloned.reservationCategory.setCanceledRateFee(
                            new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                          );
                        } else {
                          if (
                            editedScheme.reservationCategory.canceledRateFee
                              .enabled
                          ) {
                            cloned.reservationCategory.canceledRateFee?.disable();
                          } else {
                            cloned.reservationCategory.canceledRateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.reservationCategory
                            .canceledRateFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.reservationCategory
                              .canceledRateFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.getCanceledRateFee()
                      ?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="uk-flex">
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Tier Mode
                            </label>
                            <div
                              style={{
                                display: "flex",
                                borderRadius: "6px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory
                                      .canceledRateFee?.tierMode ===
                                    TierMode.BRACKET
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory
                                      .canceledRateFee?.tierMode ===
                                    TierMode.BRACKET
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.canceledRateFee?.setTierMode(
                                    TierMode.BRACKET
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Bracket
                              </button>
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory
                                      .canceledRateFee?.tierMode ===
                                    TierMode.THRESHOLD
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory
                                      .canceledRateFee?.tierMode ===
                                    TierMode.THRESHOLD
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.canceledRateFee?.setTierMode(
                                    TierMode.THRESHOLD
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Threshold
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                                height: "30px",
                              }}
                              value={
                                editedScheme.reservationCategory.getCanceledRateFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getCanceledRateFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (min)"}</div>
                                <div>{"To (min)"}</div>
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.reservationCategory.canceledRateFee?.getTimeTiers() &&
                                editedScheme.reservationCategory.canceledRateFee
                                  .getTimeTiers()
                                  .map((time_tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.canceledRateFee?.getTimeTier(
                                            index
                                          )?.minDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .canceledRateFee
                                          ) {
                                            cloned.reservationCategory.canceledRateFee.timeTiers[
                                              index
                                            ].minDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.canceledRateFee?.getTimeTier(
                                            index
                                          )?.maxDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .canceledRateFee
                                          ) {
                                            cloned.reservationCategory.canceledRateFee.timeTiers[
                                              index
                                            ].maxDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.canceledRateFee?.getTimeTier(
                                            index
                                          )?.pricePerHour
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .canceledRateFee
                                          ) {
                                            cloned.reservationCategory.canceledRateFee.timeTiers[
                                              index
                                            ].pricePerHour = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.reservationCategory.canceledRateFee?.removeTimeTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.canceledRateFee?.addTimeTier(
                                    new TimeTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>
                        {"Rate Fee - No Show"}
                      </span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.reservationCategory.noShowRateFee) {
                          cloned.reservationCategory.setNoShowRateFee(
                            new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                          );
                        } else {
                          if (
                            editedScheme.reservationCategory.noShowRateFee
                              .enabled
                          ) {
                            cloned.reservationCategory.noShowRateFee?.disable();
                          } else {
                            cloned.reservationCategory.noShowRateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.reservationCategory
                            .noShowRateFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.reservationCategory.noShowRateFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.getNoShowRateFee()
                      ?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="uk-flex">
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Tier Mode
                            </label>
                            <div
                              style={{
                                display: "flex",
                                borderRadius: "6px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory
                                      .noShowRateFee?.tierMode ===
                                    TierMode.BRACKET
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory
                                      .noShowRateFee?.tierMode ===
                                    TierMode.BRACKET
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.noShowRateFee?.setTierMode(
                                    TierMode.BRACKET
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Bracket
                              </button>
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.reservationCategory
                                      .noShowRateFee?.tierMode ===
                                    TierMode.THRESHOLD
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.reservationCategory
                                      .noShowRateFee?.tierMode ===
                                    TierMode.THRESHOLD
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.noShowRateFee?.setTierMode(
                                    TierMode.THRESHOLD
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Threshold
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                                height: "30px",
                              }}
                              value={
                                editedScheme.reservationCategory.noShowRateFee
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.noShowRateFee;
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (min)"}</div>
                                <div>{"To (min)"}</div>
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.reservationCategory.noShowRateFee?.getTimeTiers() &&
                                editedScheme.reservationCategory.noShowRateFee
                                  .getTimeTiers()
                                  .map((time_tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.noShowRateFee?.getTimeTier(
                                            index
                                          )?.minDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .noShowRateFee
                                          ) {
                                            cloned.reservationCategory.noShowRateFee.timeTiers[
                                              index
                                            ].minDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.noShowRateFee?.getTimeTier(
                                            index
                                          )?.maxDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .noShowRateFee
                                          ) {
                                            cloned.reservationCategory.noShowRateFee.timeTiers[
                                              index
                                            ].maxDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.reservationCategory.noShowRateFee?.getTimeTier(
                                            index
                                          )?.pricePerHour
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.reservationCategory
                                              .noShowRateFee
                                          ) {
                                            cloned.reservationCategory.noShowRateFee.timeTiers[
                                              index
                                            ].pricePerHour = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.reservationCategory.noShowRateFee?.removeTimeTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.reservationCategory.noShowRateFee?.addTimeTier(
                                    new TimeTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>
                        {"Penalty Fee - Canceled"}
                      </span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (
                          !editedScheme.reservationCategory.canceledPenaltyFee
                        ) {
                          cloned.categories.reservation.setCanceledPenaltyFee(
                            new PenaltyFee(0)
                          );
                        } else {
                          if (
                            editedScheme.reservationCategory.canceledPenaltyFee
                              .enabled
                          ) {
                            cloned.reservationCategory.canceledPenaltyFee?.disable();
                          } else {
                            cloned.reservationCategory.canceledPenaltyFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.reservationCategory
                            .canceledPenaltyFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.reservationCategory
                              .canceledPenaltyFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.canceledPenaltyFee
                      ?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getCanceledPenaltyFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                const penaltyFee =
                                  editedScheme.reservationCategory.getCanceledPenaltyFee();
                                const cloned = Scheme.fromObject(
                                  editedScheme.toObject()
                                );
                                cloned.reservationCategory.setCanceledPenaltyFee(
                                  new PenaltyFee(
                                    parseFloat(e.target.value) || 0
                                  )
                                );
                                if (
                                  penaltyFee &&
                                  penaltyFee.vat &&
                                  cloned.reservationCategory.canceledPenaltyFee
                                ) {
                                  cloned.reservationCategory.canceledPenaltyFee.vat =
                                    penaltyFee.vat;
                                }
                                setEditedScheme(cloned);
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getCanceledPenaltyFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getCanceledPenaltyFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>
                        {"Penalty Fee - No Show"}
                      </span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (
                          !editedScheme.reservationCategory.noShowPenaltyFee
                        ) {
                          cloned.categories.reservation.setNoShowPenaltyFee(
                            new PenaltyFee(0)
                          );
                        } else {
                          if (
                            editedScheme.reservationCategory.noShowPenaltyFee
                              .enabled
                          ) {
                            cloned.reservationCategory.noShowPenaltyFee?.disable();
                          } else {
                            cloned.reservationCategory.noShowPenaltyFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.reservationCategory
                            .noShowPenaltyFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.reservationCategory
                              .noShowPenaltyFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.reservationCategory.noShowPenaltyFee
                      ?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getNoShowPenaltyFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                const penaltyFee =
                                  editedScheme.reservationCategory.getNoShowPenaltyFee();
                                const cloned = Scheme.fromObject(
                                  editedScheme.toObject()
                                );
                                cloned.reservationCategory.setNoShowPenaltyFee(
                                  new PenaltyFee(
                                    parseFloat(e.target.value) || 0
                                  )
                                );
                                if (
                                  penaltyFee &&
                                  penaltyFee.vat &&
                                  cloned.reservationCategory.noShowPenaltyFee
                                ) {
                                  cloned.reservationCategory.noShowPenaltyFee.vat =
                                    penaltyFee.vat;
                                }
                                setEditedScheme(cloned);
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.reservationCategory.getNoShowPenaltyFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.reservationCategory.getNoShowPenaltyFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div style={styles.formGroup}>
                <h4 style={styles.sectionHeader}>Charging</h4>
                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Startup Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.categories.energy.startupFee) {
                          cloned.categories.energy.setStartupFee(
                            new StartupFee(0)
                          );
                        } else {
                          if (
                            editedScheme.categories.energy.startupFee.enabled
                          ) {
                            cloned.categories.energy.startupFee?.disable();
                          } else {
                            cloned.categories.energy.startupFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.categories.energy
                            .startupFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.categories.energy.startupFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {editedScheme.energyCategory.getStartupFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.energyCategory.getStartupFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.energyCategory.getStartupFee();
                                  if (fee) {
                                    fee.amount =
                                      parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.energyCategory.getStartupFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.energyCategory.getStartupFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Rate Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.categories.energy.rateFee) {
                          cloned.categories.energy.setRateFee(
                            new EnergyRateFee(
                              RateType.DYNAMIC,
                              TierMode.BRACKET
                            )
                          );
                        } else {
                          if (editedScheme.categories.energy.rateFee.enabled) {
                            cloned.categories.energy.rateFee?.disable();
                          } else {
                            cloned.categories.energy.rateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.categories.energy
                            .rateFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.categories.energy.rateFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {editedScheme.energyCategory.getRateFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="uk-flex">
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Tier Mode
                            </label>
                            <div
                              style={{
                                display: "flex",
                                borderRadius: "6px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.energyCategory.rateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.energyCategory.rateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.energyCategory.rateFee?.setTierMode(
                                    TierMode.BRACKET
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Bracket
                              </button>
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.energyCategory.rateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.energyCategory.rateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.energyCategory.rateFee?.setTierMode(
                                    TierMode.THRESHOLD
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Threshold
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                                height: "30px",
                              }}
                              value={
                                editedScheme.energyCategory.rateFee?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee = scheme.energyCategory.rateFee;
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Toggle Buttons */}
                            <div
                              style={
                                displayMode
                                  ? styles.rateTypeToggleDisabled
                                  : styles.rateTypeToggle
                              }
                              className="uk-margin-small-top"
                            >
                              <button
                                type="button"
                                style={{
                                  ...(energyRateFeeMode === "default"
                                    ? displayMode
                                      ? styles.rateTypeButtonActiveDisabled
                                      : styles.rateTypeButtonActive
                                    : displayMode
                                    ? styles.rateTypeButtonInactiveDisabled
                                    : styles.rateTypeButtonInactive),
                                }}
                                onClick={() => {
                                  setEnergyRateFeeMode("default");
                                }}
                                disabled={displayMode}
                              >
                                Default
                              </button>
                              <button
                                type="button"
                                style={{
                                  ...(energyRateFeeMode === "power"
                                    ? displayMode
                                      ? styles.rateTypeButtonActiveDisabled
                                      : styles.rateTypeButtonActive
                                    : displayMode
                                    ? styles.rateTypeButtonInactiveDisabled
                                    : styles.rateTypeButtonInactive),
                                }}
                                onClick={() => {
                                  setEnergyRateFeeMode("power");
                                }}
                                disabled={displayMode}
                              >
                                Power
                              </button>
                              <button
                                type="button"
                                style={{
                                  ...(energyRateFeeMode === "current"
                                    ? displayMode
                                      ? styles.rateTypeButtonActiveDisabled
                                      : styles.rateTypeButtonActive
                                    : displayMode
                                    ? styles.rateTypeButtonInactiveDisabled
                                    : styles.rateTypeButtonInactive),
                                }}
                                onClick={() => {
                                  setEnergyRateFeeMode("current");
                                }}
                                disabled={displayMode}
                              >
                                Current
                              </button>
                            </div>

                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (kWh)"}</div>
                                <div>{"To (kWh)"}</div>
                                {energyRateFeeMode !== "default" && (
                                  <>
                                    <div>{`${
                                      energyRateFeeMode === "power"
                                        ? "Min Power"
                                        : "Min Current"
                                    }`}</div>
                                    <div>{`${
                                      energyRateFeeMode === "power"
                                        ? "Max Power"
                                        : "Max Current"
                                    }`}</div>
                                  </>
                                )}
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.categories.energy.rateFee?.getEnergyTiers() &&
                                editedScheme.categories.energy.rateFee
                                  ?.getEnergyTiers()
                                  .map((tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.categories.energy.rateFee?.getEnergyTier(
                                            index
                                          )?.minKwh
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.categories.energy.rateFee
                                          ) {
                                            cloned.categories.energy.rateFee.energyTiers[
                                              index
                                            ].minKwh = Number(e.target.value);
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.categories.energy.rateFee?.getEnergyTier(
                                            index
                                          )?.maxKwh
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.categories.energy.rateFee
                                          ) {
                                            cloned.categories.energy.rateFee.energyTiers[
                                              index
                                            ].maxKwh = Number(e.target.value);
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Conditionally render Min/Max Power or Current fields */}
                                      {energyRateFeeMode !== "default" && (
                                        <>
                                          {/* Min Power/Current field */}
                                          <input
                                            style={
                                              displayMode
                                                ? styles.tierInputDisabled
                                                : styles.tierInput
                                            }
                                            value={
                                              energyRateFeeMode === "current"
                                                ? editedScheme.categories.energy
                                                    .getRateFee()
                                                    ?.getEnergyTier(index)
                                                    ?.minPower
                                                : editedScheme.categories.energy
                                                    .getRateFee()
                                                    ?.getEnergyTier(index)
                                                    ?.minCurrent
                                            }
                                            onChange={(e) => {
                                              const cloned = Scheme.fromObject(
                                                editedScheme.toObject()
                                              );
                                              if (
                                                cloned.categories.energy.rateFee
                                              ) {
                                                if (
                                                  energyRateFeeMode === "power"
                                                ) {
                                                  cloned.categories.energy.rateFee.energyTiers[
                                                    index
                                                  ].minPower = Number(
                                                    e.target.value
                                                  );
                                                } else {
                                                  cloned.categories.energy.rateFee.energyTiers[
                                                    index
                                                  ].minCurrent = Number(
                                                    e.target.value
                                                  );
                                                }
                                              }
                                              setEditedScheme(cloned);
                                            }}
                                            disabled={displayMode}
                                          />

                                          {/* Max Power/Current field */}
                                          <input
                                            style={
                                              displayMode
                                                ? styles.tierInputDisabled
                                                : styles.tierInput
                                            }
                                            value={
                                              energyRateFeeMode === "power"
                                                ? editedScheme.categories.energy
                                                    .getRateFee()
                                                    ?.getEnergyTier(index)
                                                    ?.maxPower
                                                : editedScheme.categories.energy
                                                    .getRateFee()
                                                    ?.getEnergyTier(index)
                                                    ?.maxCurrent
                                            }
                                            onChange={(e) => {
                                              const cloned = Scheme.fromObject(
                                                editedScheme.toObject()
                                              );
                                              if (
                                                cloned.categories.energy.rateFee
                                              ) {
                                                if (
                                                  energyRateFeeMode === "power"
                                                ) {
                                                  cloned.categories.energy.rateFee.energyTiers[
                                                    index
                                                  ].maxPower = Number(
                                                    e.target.value
                                                  );
                                                } else {
                                                  cloned.categories.energy.rateFee.energyTiers[
                                                    index
                                                  ].maxCurrent = Number(
                                                    e.target.value
                                                  );
                                                }
                                              }
                                              setEditedScheme(cloned);
                                            }}
                                            disabled={displayMode}
                                          />
                                        </>
                                      )}

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.categories.energy.rateFee?.getEnergyTier(
                                            index
                                          )?.pricePerKwh
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (
                                            cloned.categories.energy.rateFee
                                          ) {
                                            cloned.categories.energy.rateFee.energyTiers[
                                              index
                                            ].pricePerKwh = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.categories.energy.rateFee?.removeEnergyTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.categories.energy.rateFee?.addEnergyTier(
                                    new EnergyTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div style={styles.formGroup}>
                <h4 style={styles.sectionHeader}>Time</h4>
                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Startup Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.timeCategory.startupFee) {
                          cloned.timeCategory.setStartupFee(new StartupFee(0));
                        } else {
                          if (editedScheme.timeCategory.startupFee.enabled) {
                            cloned.timeCategory.startupFee?.disable();
                          } else {
                            cloned.timeCategory.startupFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.timeCategory.startupFee
                            ?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.timeCategory.startupFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {editedScheme.timeCategory.getStartupFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.timeCategory.getStartupFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.timeCategory.getStartupFee();
                                  if (fee) {
                                    fee.amount =
                                      parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.timeCategory.getStartupFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.timeCategory.getStartupFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Rate Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.timeCategory.rateFee) {
                          cloned.timeCategory.setRateFee(
                            new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                          );
                        } else {
                          if (editedScheme.timeCategory.rateFee.enabled) {
                            cloned.timeCategory.rateFee?.disable();
                          } else {
                            cloned.timeCategory.rateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.timeCategory.rateFee
                            ?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.timeCategory.rateFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.timeCategory.getRateFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="uk-flex">
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Tier Mode
                            </label>
                            <div
                              style={{
                                display: "flex",
                                borderRadius: "6px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            >
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.timeCategory.rateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.timeCategory.rateFee
                                      ?.tierMode === TierMode.BRACKET
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.timeCategory.rateFee?.setTierMode(
                                    TierMode.BRACKET
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Bracket
                              </button>
                              <button
                                style={{
                                  flex: 1,
                                  padding: "8px 12px",
                                  backgroundColor:
                                    editedScheme.timeCategory.rateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "#10b981"
                                      : "rgba(255,255,255,0.1)",
                                  color:
                                    editedScheme.timeCategory.rateFee
                                      ?.tierMode === TierMode.THRESHOLD
                                      ? "white"
                                      : "rgba(255,255,255,0.7)",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.timeCategory.rateFee?.setTierMode(
                                    TierMode.THRESHOLD
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                Threshold
                              </button>
                            </div>
                          </div>
                          <div style={{ width: "50%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                                height: "30px",
                              }}
                              value={
                                editedScheme.timeCategory.rateFee?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee = scheme.timeCategory.rateFee;
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (min)"}</div>
                                <div>{"To (min)"}</div>
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.timeCategory.rateFee?.getTimeTiers() &&
                                editedScheme.timeCategory.rateFee
                                  .getTimeTiers()
                                  .map((time_tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.timeCategory.rateFee?.getTimeTier(
                                            index
                                          )?.minDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.timeCategory.rateFee) {
                                            cloned.timeCategory.rateFee.timeTiers[
                                              index
                                            ].minDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.timeCategory.rateFee?.getTimeTier(
                                            index
                                          )?.maxDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.timeCategory.rateFee) {
                                            cloned.timeCategory.rateFee.timeTiers[
                                              index
                                            ].maxDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.timeCategory.rateFee?.getTimeTier(
                                            index
                                          )?.pricePerHour
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.timeCategory.rateFee) {
                                            cloned.timeCategory.rateFee.timeTiers[
                                              index
                                            ].pricePerHour = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.timeCategory.rateFee?.removeTimeTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.timeCategory.rateFee?.addTimeTier(
                                    new TimeTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div style={styles.formGroup}>
                <h4 style={styles.sectionHeader}>Overstay</h4>
                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Penalty Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.overstayCategory.penaltyFee) {
                          cloned.overstayCategory.setPenaltyFee(
                            new PenaltyFeeWithGracePeriod(0)
                          );
                        } else {
                          if (
                            editedScheme.overstayCategory.penaltyFee.enabled
                          ) {
                            cloned.overstayCategory.penaltyFee?.disable();
                          } else {
                            cloned.overstayCategory.penaltyFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.overstayCategory
                            .penaltyFee?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.overstayCategory.penaltyFee
                              ?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {editedScheme.overstayCategory.getPenaltyFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.overstayCategory.getPenaltyFee()
                                  ?.amount || ""
                              }
                              onChange={(e) => {
                                const penaltyFee =
                                  editedScheme.overstayCategory.getPenaltyFee();
                                const cloned = Scheme.fromObject(
                                  editedScheme.toObject()
                                );
                                cloned.overstayCategory.setPenaltyFee(
                                  new PenaltyFeeWithGracePeriod(
                                    parseFloat(e.target.value) || 0
                                  )
                                );
                                if (
                                  penaltyFee &&
                                  penaltyFee.vat &&
                                  cloned.overstayCategory.penaltyFee
                                ) {
                                  cloned.overstayCategory.penaltyFee.vat =
                                    penaltyFee.vat;
                                }
                                setEditedScheme(cloned);
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Vat
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.overstayCategory.getPenaltyFee()
                                  ?.vat || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.overstayCategory.getPenaltyFee();
                                  if (fee) {
                                    fee.vat = parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>

                          <div>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Grace Period
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.overstayCategory.getPenaltyFee()
                                  ?.gracePeriod || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.overstayCategory.getPenaltyFee();
                                  if (fee) {
                                    fee.gracePeriod =
                                      parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <div style={styles.locationItem}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: "10px",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <span style={styles.locationName}>{"Rate Fee"}</span>
                    </div>

                    <div
                      style={styles.toggleContainer}
                      onClick={() => {
                        const cloned = Scheme.fromObject(
                          editedScheme.toObject()
                        );
                        if (!editedScheme.overstayCategory.rateFee) {
                          cloned.overstayCategory.setRateFee(
                            new TimeRateFeeWithGracePeriod(
                              RateType.DYNAMIC,
                              TierMode.BRACKET
                            )
                          );
                        } else {
                          if (editedScheme.overstayCategory.rateFee.enabled) {
                            cloned.overstayCategory.rateFee?.disable();
                          } else {
                            cloned.overstayCategory.rateFee?.enable();
                          }
                        }
                        setEditedScheme(cloned);
                      }}
                    >
                      <span
                        style={{
                          ...styles.toggleBackground,
                          backgroundColor: editedScheme.overstayCategory.rateFee
                            ?.enabled
                            ? "#10b981"
                            : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <span
                          style={{
                            ...styles.toggleCircle,
                            left: editedScheme.overstayCategory.rateFee?.enabled
                              ? "29px"
                              : "3px",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {editedScheme.overstayCategory.getRateFee()?.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: "hidden",
                          marginLeft: "20px",
                          marginTop: "10px",
                          padding: "15px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "50%", padding: "10px" }}>
                              <label
                                style={{
                                  color: "rgba(255,255,255,0.8)",
                                  fontSize: "12px",
                                  marginBottom: "4px",
                                  display: "block",
                                }}
                              >
                                Tier Mode
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  borderRadius: "6px",
                                  overflow: "hidden",
                                  border: "1px solid rgba(255,255,255,0.2)",
                                }}
                              >
                                <button
                                  style={{
                                    flex: 1,
                                    padding: "8px 12px",
                                    backgroundColor:
                                      editedScheme.overstayCategory.rateFee
                                        ?.tierMode === TierMode.BRACKET
                                        ? "#10b981"
                                        : "rgba(255,255,255,0.1)",
                                    color:
                                      editedScheme.overstayCategory.rateFee
                                        ?.tierMode === TierMode.BRACKET
                                        ? "white"
                                        : "rgba(255,255,255,0.7)",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    const cloned = Scheme.fromObject(
                                      editedScheme.toObject()
                                    );
                                    cloned.overstayCategory.rateFee?.setTierMode(
                                      TierMode.BRACKET
                                    );
                                    setEditedScheme(cloned);
                                  }}
                                  disabled={displayMode}
                                >
                                  Bracket
                                </button>
                                <button
                                  style={{
                                    flex: 1,
                                    padding: "8px 12px",
                                    backgroundColor:
                                      editedScheme.overstayCategory.rateFee
                                        ?.tierMode === TierMode.THRESHOLD
                                        ? "#10b981"
                                        : "rgba(255,255,255,0.1)",
                                    color:
                                      editedScheme.overstayCategory.rateFee
                                        ?.tierMode === TierMode.THRESHOLD
                                        ? "white"
                                        : "rgba(255,255,255,0.7)",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    const cloned = Scheme.fromObject(
                                      editedScheme.toObject()
                                    );
                                    cloned.overstayCategory.rateFee?.setTierMode(
                                      TierMode.THRESHOLD
                                    );
                                    setEditedScheme(cloned);
                                  }}
                                  disabled={displayMode}
                                >
                                  Threshold
                                </button>
                              </div>
                            </div>
                            <div style={{ width: "50%", padding: "10px" }}>
                              <label
                                style={{
                                  color: "rgba(255,255,255,0.8)",
                                  fontSize: "12px",
                                  marginBottom: "4px",
                                  display: "block",
                                }}
                              >
                                Vat
                              </label>
                              <input
                                type="number"
                                style={{
                                  width: "100%",
                                  padding: "6px 8px",
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                  border: "1px solid rgba(255,255,255,0.2)",
                                  borderRadius: "4px",
                                  color: "white",
                                  fontSize: "12px",
                                  boxSizing: "border-box",
                                  height: "30px",
                                }}
                                value={
                                  editedScheme.overstayCategory.rateFee?.vat ||
                                  ""
                                }
                                onChange={(e) => {
                                  updateScheme((scheme) => {
                                    const fee = scheme.overstayCategory.rateFee;
                                    if (fee) {
                                      fee.vat = parseFloat(e.target.value) || 0;
                                    }
                                  });
                                }}
                                placeholder="0.00"
                                disabled={displayMode}
                              />
                            </div>
                          </div>
                          <div style={{ width: "100%", padding: "10px" }}>
                            <label
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "12px",
                                marginBottom: "4px",
                                display: "block",
                              }}
                            >
                              Grace Period
                            </label>
                            <input
                              type="number"
                              style={{
                                width: "100%",
                                padding: "6px 8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: "white",
                                fontSize: "12px",
                                boxSizing: "border-box",
                              }}
                              value={
                                editedScheme.overstayCategory.getPenaltyFee()
                                  ?.gracePeriod || ""
                              }
                              onChange={(e) => {
                                updateScheme((scheme) => {
                                  const fee =
                                    scheme.overstayCategory.getPenaltyFee();
                                  if (fee) {
                                    fee.gracePeriod =
                                      parseFloat(e.target.value) || 0;
                                  }
                                });
                              }}
                              placeholder="0.00"
                              disabled={displayMode}
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <div style={styles.tiersContainer}>
                            {/* Tiers Container */}
                            <div style={styles.tiersContainer}>
                              {/* Header */}
                              <div style={styles.tierHeader}>
                                <div>Tier</div>
                                <div>{"From (min)"}</div>
                                <div>{"To (min)"}</div>
                                <div>Rate ($)</div>
                                <div>Action</div>
                              </div>

                              {/* Tier Rows */}
                              {editedScheme.overstayCategory.rateFee?.getTimeTiers() &&
                                editedScheme.overstayCategory.rateFee
                                  .getTimeTiers()
                                  .map((time_tier, index) => (
                                    <div key={index} style={styles.tierRow}>
                                      <div>{index + 1}</div>

                                      {/* From field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.overstayCategory.rateFee?.getTimeTier(
                                            index
                                          )?.minDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.overstayCategory.rateFee) {
                                            cloned.overstayCategory.rateFee.timeTiers[
                                              index
                                            ].minDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* To field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.overstayCategory.rateFee?.getTimeTier(
                                            index
                                          )?.maxDuration
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.overstayCategory.rateFee) {
                                            cloned.overstayCategory.rateFee.timeTiers[
                                              index
                                            ].maxDuration = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Rate field */}
                                      <input
                                        style={
                                          displayMode
                                            ? styles.tierInputDisabled
                                            : styles.tierInput
                                        }
                                        value={
                                          editedScheme.overstayCategory.rateFee?.getTimeTier(
                                            index
                                          )?.pricePerHour
                                        }
                                        onChange={(e) => {
                                          const cloned = Scheme.fromObject(
                                            editedScheme.toObject()
                                          );
                                          if (cloned.overstayCategory.rateFee) {
                                            cloned.overstayCategory.rateFee.timeTiers[
                                              index
                                            ].pricePerHour = Number(
                                              e.target.value
                                            );
                                          }
                                          setEditedScheme(cloned);
                                        }}
                                        disabled={displayMode}
                                      />

                                      {/* Delete button */}
                                      <div>
                                        <button
                                          type="button"
                                          style={
                                            displayMode
                                              ? styles.deleteButtonDisabled
                                              : styles.deleteButton
                                          }
                                          onClick={() => {
                                            const cloned = Scheme.fromObject(
                                              editedScheme.toObject()
                                            );
                                            cloned.overstayCategory.rateFee?.removeTimeTier(
                                              index
                                            );
                                            setEditedScheme(cloned);
                                          }}
                                          disabled={displayMode}
                                        >
                                          ×
                                        </button>
                                      </div>
                                    </div>
                                  ))}

                              {/* Add New Tier Button */}
                              <button
                                type="button"
                                style={
                                  displayMode
                                    ? styles.addTierButtonDisabled
                                    : styles.addTierButton
                                }
                                onClick={() => {
                                  const cloned = Scheme.fromObject(
                                    editedScheme.toObject()
                                  );
                                  cloned.overstayCategory.rateFee?.addTimeTier(
                                    new TimeTier(0)
                                  );
                                  setEditedScheme(cloned);
                                }}
                                disabled={displayMode}
                              >
                                + Add New Tier
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!displayMode && (
                <div
                  style={{
                    padding: "20px 0",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {scheme && (
                    <button
                      style={styles.deleteSchemeButton}
                      onClick={handleDelete}
                    >
                      {"Delete Scheme"}
                    </button>
                  )}

                  <button style={styles.submitButton} onClick={handleSave}>
                    {scheme ? "Update Scheme" : "Create Scheme"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailForm;
