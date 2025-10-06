import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scheme,
  ServiceFee,
  TimeRateFee,
  PenaltyFee,
  RateType,
  TierMode,
} from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";
import RateFeeSection from "./RateFeeSection";
import PenaltyFeeSection from "./PenaltyFeeSection";

interface ReservationSectionProps {
  editedScheme: Scheme;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  rateType: RateType;
}

const ReservationSection: React.FC<ReservationSectionProps> = ({
  editedScheme,
  updateScheme,
  displayMode,
}) => {
  return (
    <div style={styles.formGroup}>
      <h4 style={styles.sectionHeader}>Reservation</h4>

      {/* Service Fee */}
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
              updateScheme((scheme) => {
                if (!scheme.categories.reservation.serviceFee) {
                  scheme.categories.reservation.setServiceFee(
                    new ServiceFee(0)
                  );
                } else {
                  if (scheme.categories.reservation.serviceFee.enabled) {
                    scheme.categories.reservation.serviceFee?.disable();
                  } else {
                    scheme.categories.reservation.serviceFee?.enable();
                  }
                }
              });
            }}
          >
            <span
              style={{
                ...styles.toggleBackground,
                backgroundColor: editedScheme.categories.reservation.serviceFee
                  ?.enabled
                  ? "#10b981"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <span
                style={{
                  ...styles.toggleCircle,
                  left: editedScheme.categories.reservation.serviceFee?.enabled
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
                        const fee = scheme.reservationCategory.getServiceFee();
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
                      editedScheme.reservationCategory.getServiceFee()?.vat ||
                      ""
                    }
                    onChange={(e) => {
                      updateScheme((scheme) => {
                        const fee = scheme.reservationCategory.getServiceFee();
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

      {/* Rate Fee - Kept */}
      <RateFeeSection
        title="Rate Fee - Kept"
        rateFee={editedScheme.reservationCategory.keptRateFee ?? null}
        onToggle={() => {
          updateScheme((scheme) => {
            if (!scheme.reservationCategory.keptRateFee) {
              scheme.reservationCategory.setKeptRateFee(
                new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
              );
            } else {
              if (scheme.reservationCategory.keptRateFee.enabled) {
                scheme.reservationCategory.keptRateFee?.disable();
              } else {
                scheme.reservationCategory.keptRateFee?.enable();
              }
            }
          });
        }}
        updateScheme={updateScheme}
        displayMode={displayMode}
        type="kept"
        editedScheme={editedScheme}
      />

      {/* Rate Fee - Canceled */}
      <RateFeeSection
        title="Rate Fee - Canceled"
        rateFee={editedScheme.reservationCategory.canceledRateFee ?? null}
        onToggle={() => {
          updateScheme((scheme) => {
            if (!scheme.reservationCategory.canceledRateFee) {
              scheme.reservationCategory.setCanceledRateFee(
                new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
              );
            } else {
              if (scheme.reservationCategory.canceledRateFee.enabled) {
                scheme.reservationCategory.canceledRateFee?.disable();
              } else {
                scheme.reservationCategory.canceledRateFee?.enable();
              }
            }
          });
        }}
        updateScheme={updateScheme}
        displayMode={displayMode}
        type="canceled"
        editedScheme={editedScheme}
      />

      {/* Rate Fee - No Show */}
      <RateFeeSection
        title="Rate Fee - No Show"
        rateFee={editedScheme.reservationCategory.noShowRateFee ?? null}
        onToggle={() => {
          updateScheme((scheme) => {
            if (!scheme.reservationCategory.noShowRateFee) {
              scheme.reservationCategory.setNoShowRateFee(
                new TimeRateFee(RateType.DYNAMIC, TierMode.BRACKET)
              );
            } else {
              if (scheme.reservationCategory.noShowRateFee.enabled) {
                scheme.reservationCategory.noShowRateFee?.disable();
              } else {
                scheme.reservationCategory.noShowRateFee?.enable();
              }
            }
          });
        }}
        updateScheme={updateScheme}
        displayMode={displayMode}
        type="noShow"
        editedScheme={editedScheme}
      />

      {/* Penalty Fee - Canceled */}
      <PenaltyFeeSection
        title="Penalty Fee - Canceled"
        penaltyFee={editedScheme.reservationCategory.canceledPenaltyFee ?? null}
        onToggle={() => {
          updateScheme((scheme) => {
            if (!scheme.reservationCategory.canceledPenaltyFee) {
              scheme.categories.reservation.setCanceledPenaltyFee(
                new PenaltyFee(0)
              );
            } else {
              if (scheme.reservationCategory.canceledPenaltyFee.enabled) {
                scheme.reservationCategory.canceledPenaltyFee?.disable();
              } else {
                scheme.reservationCategory.canceledPenaltyFee?.enable();
              }
            }
          });
        }}
        updateScheme={updateScheme}
        displayMode={displayMode}
        type="canceledPenalty"
      />

      {/* Penalty Fee - No Show */}
      <PenaltyFeeSection
        title="Penalty Fee - No Show"
        penaltyFee={editedScheme.reservationCategory.noShowPenaltyFee ?? null}
        onToggle={() => {
          updateScheme((scheme) => {
            if (!scheme.reservationCategory.noShowPenaltyFee) {
              scheme.categories.reservation.setNoShowPenaltyFee(
                new PenaltyFee(0)
              );
            } else {
              if (scheme.reservationCategory.noShowPenaltyFee.enabled) {
                scheme.reservationCategory.noShowPenaltyFee?.disable();
              } else {
                scheme.reservationCategory.noShowPenaltyFee?.enable();
              }
            }
          });
        }}
        updateScheme={updateScheme}
        displayMode={displayMode}
        type="noShowPenalty"
      />
    </div>
  );
};

export default ReservationSection;
