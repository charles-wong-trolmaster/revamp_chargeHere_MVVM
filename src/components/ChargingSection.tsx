import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scheme,
  StartupFee,
  EnergyRateFee,
  RateType,
  TierMode,
  EnergyTier,
} from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import TierTable from "./TierTable";

interface ChargingSectionProps {
  editedScheme: Scheme;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  rateType: RateType;
  resetTrigger?: number; // Add reset trigger prop
}

const ChargingSection: React.FC<ChargingSectionProps> = ({
  editedScheme,
  updateScheme,
  displayMode,
  rateType,
  resetTrigger,
}) => {
  const [energyRateFeeMode, setEnergyRateFeeMode] = useState<string>("default");
  useEffect(() => {
    setEnergyRateFeeMode("default");
  }, [resetTrigger]);

  return (
    <div style={styles.formGroup}>
      <h4 style={styles.sectionHeader}>Charging</h4>

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
                if (!scheme.categories.energy.startupFee) {
                  scheme.categories.energy.setStartupFee(new StartupFee(0));
                } else {
                  if (scheme.categories.energy.startupFee.enabled) {
                    scheme.categories.energy.startupFee?.disable();
                  } else {
                    scheme.categories.energy.startupFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.categories.energy.startupFee
                  ?.enabled
                  ? "#10b981"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                style={{
                  ...styles.toggleCircle,
                  left: editedScheme.categories.energy.startupFee?.enabled
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
                      editedScheme.energyCategory.getStartupFee()?.amount || ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.energyCategory.getStartupFee();
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
                    value={
                      editedScheme.energyCategory.getStartupFee()?.vat || ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.energyCategory.getStartupFee();
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
                if (!scheme.categories.energy.rateFee) {
                  scheme.categories.energy.setRateFee(
                    new EnergyRateFee(RateType.DYNAMIC, TierMode.BRACKET)
                  );
                } else {
                  if (scheme.categories.energy.rateFee.enabled) {
                    scheme.categories.energy.rateFee?.disable();
                  } else {
                    scheme.categories.energy.rateFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.categories.energy.rateFee?.enabled
                  ? "#10b981"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                style={{
                  ...styles.toggleCircle,
                  left: editedScheme.categories.energy.rateFee?.enabled
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
                          editedScheme.energyCategory.rateFee?.tierMode ===
                          TierMode.BRACKET
                            ? "#10b981"
                            : "rgba(255,255,255,0.1)",
                        color:
                          editedScheme.energyCategory.rateFee?.tierMode ===
                          TierMode.BRACKET
                            ? "white"
                            : "rgba(255,255,255,0.7)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => {
                        updateScheme((scheme) => {
                          scheme.energyCategory.rateFee?.setTierMode(
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
                          editedScheme.energyCategory.rateFee?.tierMode ===
                          TierMode.THRESHOLD
                            ? "#10b981"
                            : "rgba(255,255,255,0.1)",
                        color:
                          editedScheme.energyCategory.rateFee?.tierMode ===
                          TierMode.THRESHOLD
                            ? "white"
                            : "rgba(255,255,255,0.7)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() => {
                        updateScheme((scheme) => {
                          scheme.energyCategory.rateFee?.setTierMode(
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
                    value={editedScheme.energyCategory.rateFee?.vat || ""}
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

                  <TierTable
                    tiers={
                      editedScheme.categories.energy.rateFee?.getEnergyTiers() ||
                      []
                    }
                    onUpdateTier={(index, field, value) => {
                      updateScheme((scheme) => {
                        if (scheme.categories.energy.rateFee) {
                          (
                            scheme.categories.energy.rateFee.energyTiers[
                              index
                            ] as any
                          )[field] = Number(value);
                        }
                      });
                    }}
                    onDeleteTier={(index) => {
                      updateScheme((scheme) => {
                        scheme.categories.energy.rateFee?.removeEnergyTier(
                          index
                        );
                      });
                    }}
                    onAddTier={() => {
                      updateScheme((scheme) => {
                        scheme.categories.energy.rateFee?.addEnergyTier(
                          new EnergyTier(0)
                        );
                      });
                    }}
                    displayMode={displayMode}
                    tierType="energy"
                    energyRateFeeMode={energyRateFeeMode}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChargingSection;
