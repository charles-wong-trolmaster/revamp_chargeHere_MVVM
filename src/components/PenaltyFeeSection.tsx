import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenaltyFee, Scheme } from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";

interface PenaltyFeeSectionProps {
  title: string;
  penaltyFee: PenaltyFee | null;
  onToggle: () => void;
  updateScheme: (updater: (scheme: Scheme) => void) => void;
  displayMode: boolean;
  type: "canceledPenalty" | "noShowPenalty";
}

const PenaltyFeeSection: React.FC<PenaltyFeeSectionProps> = ({
  title,
  penaltyFee,
  onToggle,
  updateScheme,
  displayMode,
  type,
}) => {
  const getPenaltyFee = (scheme: Scheme) => {
    if (type === "canceledPenalty") {
      return scheme.reservationCategory.getCanceledPenaltyFee();
    }
    return scheme.reservationCategory.getNoShowPenaltyFee();
  };

  const setPenaltyFee = (scheme: Scheme, fee: PenaltyFee) => {
    if (type === "canceledPenalty") {
      scheme.reservationCategory.setCanceledPenaltyFee(fee);
    } else {
      scheme.reservationCategory.setNoShowPenaltyFee(fee);
    }
  };

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
              backgroundColor: penaltyFee?.enabled
                ? "#10b981"
                : "rgba(255, 255, 255, 0.2)",
            }}
          >
            <span
              style={{
                ...styles.toggleCircle,
                left: penaltyFee?.enabled ? "29px" : "3px",
              }}
            />
          </span>
        </div>
      </div>
      <AnimatePresence>
        {penaltyFee?.enabled && (
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
                  value={penaltyFee?.amount || ""}
                  onChange={(e) => {
                    updateScheme((scheme) => {
                      const currentFee = getPenaltyFee(scheme);
                      const newFee = new PenaltyFee(
                        parseFloat(e.target.value) || 0
                      );
                      if (currentFee && currentFee.vat) {
                        newFee.vat = currentFee.vat;
                      }
                      setPenaltyFee(scheme, newFee);
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
                  value={penaltyFee?.vat || ""}
                  onChange={(e) => {
                    updateScheme((scheme) => {
                      const fee = getPenaltyFee(scheme);
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
  );
};

export default PenaltyFeeSection;
