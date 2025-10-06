import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimeRateFee, TierMode, TimeTier, Scheme } from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import TierTable from "./TierTable";

interface RateFeeSectionProps {
  title: string;
  rateFee: TimeRateFee | null;
  onToggle: () => void;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  type: "kept" | "canceled" | "noShow";
  editedScheme: Scheme;
}

const RateFeeSection: React.FC<RateFeeSectionProps> = ({
  title,
  rateFee,
  onToggle,
  updateScheme,
  displayMode,
  type,
}) => {
  return (
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
          <span style={styles.locationName}>{title}</span>
        </div>

        <div style={styles.toggleContainer} onClick={onToggle}>
          <span
            style={{
              ...styles.toggleBackground,
              backgroundColor: rateFee?.enabled
                ? "#10b981"
                : "rgba(255, 255, 255, 0.2)",
            }}
          >
            <span
              style={{
                ...styles.toggleCircle,
                left: rateFee?.enabled ? "29px" : "3px",
              }}
            />
          </span>
        </div>
      </div>
      <AnimatePresence>
        {rateFee?.enabled && (
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
                        rateFee?.tierMode === TierMode.BRACKET
                          ? "#10b981"
                          : "rgba(255,255,255,0.1)",
                      color:
                        rateFee?.tierMode === TierMode.BRACKET
                          ? "white"
                          : "rgba(255,255,255,0.7)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      updateScheme((scheme) => {
                        const fee =
                          scheme.reservationCategory[`${type}RateFee`];
                        if (fee) {
                          fee.setTierMode(TierMode.BRACKET);
                        }
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
                        rateFee?.tierMode === TierMode.THRESHOLD
                          ? "#10b981"
                          : "rgba(255,255,255,0.1)",
                      color:
                        rateFee?.tierMode === TierMode.THRESHOLD
                          ? "white"
                          : "rgba(255,255,255,0.7)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      updateScheme((scheme) => {
                        const fee =
                          scheme.reservationCategory[`${type}RateFee`];
                        if (fee) {
                          fee.setTierMode(TierMode.THRESHOLD);
                        }
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
                  value={rateFee?.vat || ""}
                  onChange={(e) => {
                    updateScheme((scheme) => {
                      const fee = scheme.reservationCategory[`${type}RateFee`];
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
              tiers={rateFee?.getTimeTiers() || []}
              onUpdateTier={(index, field, value) => {
                updateScheme((scheme) => {
                  const fee = scheme.reservationCategory[`${type}RateFee`];
                  if (fee && fee.timeTiers[index]) {
                    (fee.timeTiers[index] as any)[field] = Number(value);
                  }
                });
              }}
              onDeleteTier={(index) => {
                updateScheme((scheme) => {
                  const fee = scheme.reservationCategory[`${type}RateFee`];
                  if (fee) {
                    fee.removeTimeTier(index);
                  }
                });
              }}
              onAddTier={() => {
                updateScheme((scheme) => {
                  const fee = scheme.reservationCategory[`${type}RateFee`];
                  if (fee) {
                    fee.addTimeTier(new TimeTier(0));
                  }
                });
              }}
              displayMode={displayMode}
              tierType="time"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RateFeeSection;
