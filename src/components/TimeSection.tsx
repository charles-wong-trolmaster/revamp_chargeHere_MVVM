import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scheme,
  StartupFee,
  TimeRateFee,
  RateType,
  TierMode,
  TimeTier,
} from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import TierTable from "./TierTable";

interface TimeSectionProps {
  editedScheme: Scheme;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  rateType: RateType;
}

const TimeSection: React.FC<TimeSectionProps> = ({
  editedScheme,
  updateScheme,
  displayMode,
}) => {
  return (
    <div style={styles.formGroup}>
      <h4 style={styles.sectionHeader}>Time</h4>

      {/* Startup Fee */}
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
              updateScheme((scheme) => {
                if (!scheme.timeCategory.startupFee) {
                  scheme.timeCategory.setStartupFee(new StartupFee(0));
                } else {
                  if (scheme.timeCategory.startupFee.enabled) {
                    scheme.timeCategory.startupFee?.disable();
                  } else {
                    scheme.timeCategory.startupFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.timeCategory.startupFee?.enabled
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
                      editedScheme.timeCategory.getStartupFee()?.amount || ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.timeCategory.getStartupFee();
                        if (fee) {
                          fee.amount = parseFloat(e.target.value) || 0;
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
                    value={editedScheme.timeCategory.getStartupFee()?.vat || ""}
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.timeCategory.getStartupFee();
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

      {/* Rate Fee */}
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
              updateScheme((scheme) => {
                if (!scheme.timeCategory.rateFee) {
                  scheme.timeCategory.setRateFee(
                    new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                  );
                } else {
                  if (scheme.timeCategory.rateFee.enabled) {
                    scheme.timeCategory.rateFee?.disable();
                  } else {
                    scheme.timeCategory.rateFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.timeCategory.rateFee?.enabled
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
                          editedScheme.timeCategory.rateFee?.tierMode ===
                          TierMode.BRACKET
                            ? "#10b981"
                            : "rgba(255,255,255,0.1)",
                        color:
                          editedScheme.timeCategory.rateFee?.tierMode ===
                          TierMode.BRACKET
                            ? "white"
                            : "rgba(255,255,255,0.7)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => {
                        updateScheme((scheme) => {
                          scheme.timeCategory.rateFee?.setTierMode(
                            TierMode.BRACKET
                          );
                        });
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
                          editedScheme.timeCategory.rateFee?.tierMode ===
                          TierMode.THRESHOLD
                            ? "#10b981"
                            : "rgba(255,255,255,0.1)",
                        color:
                          editedScheme.timeCategory.rateFee?.tierMode ===
                          TierMode.THRESHOLD
                            ? "white"
                            : "rgba(255,255,255,0.7)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => {
                        updateScheme((scheme) => {
                          scheme.timeCategory.rateFee?.setTierMode(
                            TierMode.THRESHOLD
                          );
                        });
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
                    value={editedScheme.timeCategory.rateFee?.vat || ""}
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

              <TierTable
                tiers={editedScheme.timeCategory.rateFee?.getTimeTiers() || []}
                onUpdateTier={(index, field, value) => {
                  updateScheme((scheme) => {
                    if (scheme.timeCategory.rateFee) {
                      (scheme.timeCategory.rateFee.timeTiers[index] as any)[
                        field
                      ] = Number(value);
                    }
                  });
                }}
                onDeleteTier={(index) => {
                  updateScheme((scheme) => {
                    scheme.timeCategory.rateFee?.removeTimeTier(index);
                  });
                }}
                onAddTier={() => {
                  updateScheme((scheme) => {
                    scheme.timeCategory.rateFee?.addTimeTier(new TimeTier(0));
                  });
                }}
                displayMode={displayMode}
                tierType="time"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimeSection;
