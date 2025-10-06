import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scheme,
  PenaltyFeeWithGracePeriod,
  TimeRateFeeWithGracePeriod,
  RateType,
  TierMode,
  TimeTier,
} from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import TierTable from "./TierTable";

interface OverstaySectionProps {
  editedScheme: Scheme;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  rateType: RateType;
}

const OverstaySection: React.FC<OverstaySectionProps> = ({
  editedScheme,
  updateScheme,
  displayMode,
}) => {
  return (
    <div style={styles.formGroup}>
      <h4 style={styles.sectionHeader}>Overstay</h4>

      {/* Penalty Fee */}
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
              updateScheme((scheme) => {
                if (!scheme.overstayCategory.penaltyFee) {
                  scheme.overstayCategory.setPenaltyFee(
                    new PenaltyFeeWithGracePeriod(0)
                  );
                } else {
                  if (scheme.overstayCategory.penaltyFee.enabled) {
                    scheme.overstayCategory.penaltyFee?.disable();
                  } else {
                    scheme.overstayCategory.penaltyFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.overstayCategory.penaltyFee
                  ?.enabled
                  ? "#10b981"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                style={{
                  ...styles.toggleCircle,
                  left: editedScheme.overstayCategory.penaltyFee?.enabled
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
                      editedScheme.overstayCategory.getPenaltyFee()?.amount ||
                      ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const penaltyFee =
                          scheme.overstayCategory.getPenaltyFee();
                        scheme.overstayCategory.setPenaltyFee(
                          new PenaltyFeeWithGracePeriod(
                            parseFloat(e.target.value) || 0
                          )
                        );
                        if (
                          penaltyFee &&
                          penaltyFee.vat &&
                          scheme.overstayCategory.penaltyFee
                        ) {
                          scheme.overstayCategory.penaltyFee.vat =
                            penaltyFee.vat;
                        }
                        if (
                          penaltyFee &&
                          penaltyFee.gracePeriod &&
                          scheme.overstayCategory.penaltyFee
                        ) {
                          scheme.overstayCategory.penaltyFee.gracePeriod =
                            penaltyFee.gracePeriod;
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
                      editedScheme.overstayCategory.getPenaltyFee()?.vat || ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.overstayCategory.getPenaltyFee();
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
                        const fee = scheme.overstayCategory.getPenaltyFee();
                        if (fee) {
                          fee.gracePeriod = parseFloat(e.target.value) || 0;
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
                if (!scheme.overstayCategory.rateFee) {
                  scheme.overstayCategory.setRateFee(
                    new TimeRateFeeWithGracePeriod(
                      RateType.DYNAMIC,
                      TierMode.BRACKET
                    )
                  );
                } else {
                  if (scheme.overstayCategory.rateFee.enabled) {
                    scheme.overstayCategory.rateFee?.disable();
                  } else {
                    scheme.overstayCategory.rateFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.overstayCategory.rateFee?.enabled
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
                            editedScheme.overstayCategory.rateFee?.tierMode ===
                            TierMode.BRACKET
                              ? "#10b981"
                              : "rgba(255,255,255,0.1)",
                          color:
                            editedScheme.overstayCategory.rateFee?.tierMode ===
                            TierMode.BRACKET
                              ? "white"
                              : "rgba(255,255,255,0.7)",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          updateScheme((scheme) => {
                            scheme.overstayCategory.rateFee?.setTierMode(
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
                            editedScheme.overstayCategory.rateFee?.tierMode ===
                            TierMode.THRESHOLD
                              ? "#10b981"
                              : "rgba(255,255,255,0.1)",
                          color:
                            editedScheme.overstayCategory.rateFee?.tierMode ===
                            TierMode.THRESHOLD
                              ? "white"
                              : "rgba(255,255,255,0.7)",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          updateScheme((scheme) => {
                            scheme.overstayCategory.rateFee?.setTierMode(
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
                      value={editedScheme.overstayCategory.rateFee?.vat || ""}
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
                      editedScheme.overstayCategory.rateFee?.gracePeriod || ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.overstayCategory.rateFee;
                        if (fee) {
                          fee.gracePeriod = parseFloat(e.target.value) || 0;
                        }
                      });
                    }}
                    placeholder="0.00"
                    disabled={displayMode}
                  />
                </div>
              </div>

              <TierTable
                tiers={
                  editedScheme.overstayCategory.rateFee?.getTimeTiers() || []
                }
                onUpdateTier={(index, field, value) => {
                  updateScheme((scheme) => {
                    if (scheme.overstayCategory.rateFee) {
                      (scheme.overstayCategory.rateFee.timeTiers[index] as any)[
                        field
                      ] = Number(value);
                    }
                  });
                }}
                onDeleteTier={(index) => {
                  updateScheme((scheme) => {
                    scheme.overstayCategory.rateFee?.removeTimeTier(index);
                  });
                }}
                onAddTier={() => {
                  updateScheme((scheme) => {
                    scheme.overstayCategory.rateFee?.addTimeTier(
                      new TimeTier(0)
                    );
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

export default OverstaySection;
