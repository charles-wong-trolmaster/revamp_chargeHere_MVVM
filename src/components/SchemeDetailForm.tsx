import { useEffect, useState } from "react";
import { DayOfWeekEnum, RateType, Scheme } from "@/entities";
import TimePicker from "./TimePicker";
import DayPicker from "./DayPicker";
import DayOfWeekSelector from "./DayOfWeekSelector";
import ReservationSection from "./ReservationSection";
import ChargingSection from "./ChargingSection";
import TimeSection from "./TimeSection";
import OverstaySection from "./OverstaySection";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";

interface SchemeDetailFormProps {
  displayMode?: boolean;
  scheme?: Scheme;
  onSave?: (scheme: Scheme) => void;
  onDelete?: () => void;
  onClose?: () => void;
  onReset?: () => void;
}

const SchemeDetailForm: React.FC<SchemeDetailFormProps> = ({
  displayMode = false,
  scheme,
  onSave,
  onDelete,
  onClose,
  onReset,
}) => {
  const [editedScheme, setEditedScheme] = useState<Scheme>(new Scheme(""));
  const [rateType, setRateType] = useState<RateType>(RateType.DYNAMIC);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [feeDate, setFeeDate] = useState<{ fromDate: string; toDate: string }>({
    fromDate: "2025-01-01",
    toDate: "2025-01-01",
  });
  const [feeTime, setFeeTime] = useState<{ fromTime: string; toTime: string }>({
    fromTime: "00:00",
    toTime: "00:00",
  });
  const [selectedDays, setSelectedDays] = useState<DayOfWeekEnum[]>([]);

  const resetForm = () => {
    setEditedScheme(new Scheme(""));
    setRateType(RateType.DYNAMIC);
    setFeeDate({
      fromDate: "2025-01-01",
      toDate: "2025-01-01",
    });
    setFeeTime({ fromTime: "00:00", toTime: "00:00" });
    setSelectedDays([]);
    setResetTrigger((prev) => prev + 1); // Trigger child component resets
  };

  const updateScheme = (updater: (scheme: Scheme) => void) => {
    if (editedScheme) {
      const cloned = Scheme.fromObject(editedScheme.toObject());
      updater(cloned);
      setEditedScheme(cloned);
    }
  };

  const handleSave = () => {
    // Apply rate type to all fees
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

    // Apply temporal restrictions to all fees
    const temporalRestrictions = {
      start_date: feeDate.fromDate,
      end_date: feeDate.toDate,
      start_time: feeTime.fromTime,
      end_time: feeTime.toTime,
      day_of_week: selectedDays,
    };

    // Apply to all fees that exist
    [
      editedScheme.reservationCategory.serviceFee,
      editedScheme.reservationCategory.keptRateFee,
      editedScheme.reservationCategory.canceledRateFee,
      editedScheme.reservationCategory.noShowRateFee,
      editedScheme.reservationCategory.canceledPenaltyFee,
      editedScheme.reservationCategory.noShowPenaltyFee,
      editedScheme.energyCategory.startupFee,
      editedScheme.energyCategory.rateFee,
      editedScheme.timeCategory.startupFee,
      editedScheme.timeCategory.rateFee,
      editedScheme.overstayCategory.penaltyFee,
      editedScheme.overstayCategory.rateFee,
    ].forEach((fee) => {
      if (fee) {
        fee.withTemporalRestrictions(temporalRestrictions);
      }
    });

    if (onSave) {
      onSave(editedScheme);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const handleClose = () => {
    resetForm();
    if (onClose) {
      resetForm();
      onClose();
    }
  };

  useEffect(() => {
    if (scheme) {
      const firstRateFee =
        scheme.reservationCategory.keptRateFee ||
        scheme.reservationCategory.canceledRateFee ||
        scheme.reservationCategory.noShowRateFee ||
        scheme.energyCategory.rateFee ||
        scheme.timeCategory.rateFee ||
        scheme.overstayCategory.rateFee;

      if (firstRateFee) {
        setRateType(firstRateFee.rateType);
      }

      // Set temporal restrictions from first available fee
      const firstFee =
        scheme.reservationCategory.serviceFee ||
        scheme.reservationCategory.keptRateFee ||
        firstRateFee;

      if (firstFee) {
        if (firstFee.start_date) {
          setFeeDate((prev) => ({ ...prev, fromDate: firstFee.start_date! }));
        }
        if (firstFee.end_date) {
          setFeeDate((prev) => ({ ...prev, toDate: firstFee.end_date! }));
        }
        if (firstFee.start_time) {
          setFeeTime((prev) => ({ ...prev, fromTime: firstFee.start_time! }));
        }
        if (firstFee.end_time) {
          setFeeTime((prev) => ({ ...prev, toTime: firstFee.end_time! }));
        }
        if (firstFee.day_of_week) {
          setSelectedDays(firstFee.day_of_week);
        }
      }

      setEditedScheme(scheme);
    } else {
      resetForm();
    }
  }, [scheme]);

  return (
    <div style={styles.container}>
      <div style={styles.locationsPanel}>
        <div style={styles.contentContainer}>
          {/* Header with Close Button */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px 0 20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "white",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              {scheme ? "Edit Scheme" : "Create New Scheme"}
            </h3>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                fontSize: "24px",
                cursor: "pointer",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Close"
            >
              ×
            </button>
          </div> */}

          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "0",
              right: "0",
              bottom: "0",
              overflowY: "auto",
              padding: "0 20px",
            }}
          >
            <div style={styles.modalContent}>
              {/* Basic Form Fields */}
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
                  placeholder="Enter scheme name"
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
                  placeholder="Enter scheme description"
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
                    onClick={() => setRateType(RateType.DYNAMIC)}
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
                    onClick={() => setRateType(RateType.LOCK)}
                    disabled={displayMode}
                  >
                    LOCK
                  </button>
                </div>
              </div>

              {/* Temporal Restriction Section */}
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
                  onChange={setSelectedDays}
                />
              </div>

              {/* Component Sections */}
              <ReservationSection
                editedScheme={editedScheme}
                updateScheme={updateScheme}
                displayMode={displayMode}
                rateType={rateType}
              />

              <ChargingSection
                editedScheme={editedScheme}
                updateScheme={updateScheme}
                displayMode={displayMode}
                rateType={rateType}
                resetTrigger={resetTrigger}
              />

              <TimeSection
                editedScheme={editedScheme}
                updateScheme={updateScheme}
                displayMode={displayMode}
                rateType={rateType}
              />

              <OverstaySection
                editedScheme={editedScheme}
                updateScheme={updateScheme}
                displayMode={displayMode}
                rateType={rateType}
              />

              {!displayMode && (
                <div
                  style={{
                    padding: "20px 0",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Reset Button */}
                  <button
                    style={{
                      ...styles.submitButton,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                    onClick={handleReset}
                  >
                    Reset Form
                  </button>

                  {/* Cancel Button */}
                  <button
                    style={{
                      ...styles.submitButton,
                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>

                  {/* Delete Button */}
                  {scheme && (
                    <button
                      style={{
                        ...styles.deleteSchemeButton,
                        flex: "0 0 auto",
                      }}
                      onClick={handleDelete}
                    >
                      Delete Scheme
                    </button>
                  )}

                  {/* Save Button */}
                  <button
                    style={{
                      ...styles.submitButton,
                      marginLeft: "auto",
                    }}
                    onClick={handleSave}
                  >
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
