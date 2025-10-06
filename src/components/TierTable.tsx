import React from "react";
import { TimeTier, EnergyTier } from "@/entities";
import { styles } from "@/styles/(layer 1)/SchemeDetailPanel";

interface TierTableProps {
  tiers: (TimeTier | EnergyTier)[];
  onUpdateTier: (index: number, field: string, value: string) => void;
  onDeleteTier: (index: number) => void;
  onAddTier: () => void;
  displayMode: boolean;
  tierType: "time" | "energy";
  energyRateFeeMode?: string;
}

const TierTable: React.FC<TierTableProps> = ({
  tiers,
  onUpdateTier,
  onDeleteTier,
  onAddTier,
  displayMode,
  tierType,
  energyRateFeeMode = "default",
}) => {
  const getHeaders = () => {
    if (tierType === "energy") {
      const headers = ["Tier", "From (kWh)", "To (kWh)"];
      if (energyRateFeeMode !== "default") {
        headers.push(
          `${energyRateFeeMode === "power" ? "Min Power" : "Min Current"}`,
          `${energyRateFeeMode === "power" ? "Max Power" : "Max Current"}`
        );
      }
      headers.push("Rate ($)", "Action");
      return headers;
    }
    return ["Tier", "From (min)", "To (min)", "Rate ($)", "Action"];
  };

  const renderTierInputs = (tier: TimeTier | EnergyTier, index: number) => {
    if (tierType === "energy") {
      const energyTier = tier as EnergyTier;
      return (
        <>
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={energyTier.minKwh}
            onChange={(e) => onUpdateTier(index, "minKwh", e.target.value)}
            disabled={displayMode}
          />
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={energyTier.maxKwh}
            onChange={(e) => onUpdateTier(index, "maxKwh", e.target.value)}
            disabled={displayMode}
          />
          {energyRateFeeMode !== "default" && (
            <>
              <input
                style={
                  displayMode ? styles.tierInputDisabled : styles.tierInput
                }
                value={
                  energyRateFeeMode === "power"
                    ? energyTier.minPower
                    : energyTier.minCurrent
                }
                onChange={(e) =>
                  onUpdateTier(
                    index,
                    energyRateFeeMode === "power" ? "minPower" : "minCurrent",
                    e.target.value
                  )
                }
                disabled={displayMode}
              />
              <input
                style={
                  displayMode ? styles.tierInputDisabled : styles.tierInput
                }
                value={
                  energyRateFeeMode === "power"
                    ? energyTier.maxPower
                    : energyTier.maxCurrent
                }
                onChange={(e) =>
                  onUpdateTier(
                    index,
                    energyRateFeeMode === "power" ? "maxPower" : "maxCurrent",
                    e.target.value
                  )
                }
                disabled={displayMode}
              />
            </>
          )}
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={energyTier.pricePerKwh}
            onChange={(e) => onUpdateTier(index, "pricePerKwh", e.target.value)}
            disabled={displayMode}
          />
        </>
      );
    } else {
      const timeTier = tier as TimeTier;
      return (
        <>
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={timeTier.minDuration}
            onChange={(e) => onUpdateTier(index, "minDuration", e.target.value)}
            disabled={displayMode}
          />
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={timeTier.maxDuration}
            onChange={(e) => onUpdateTier(index, "maxDuration", e.target.value)}
            disabled={displayMode}
          />
          <input
            style={displayMode ? styles.tierInputDisabled : styles.tierInput}
            value={timeTier.pricePerHour}
            onChange={(e) =>
              onUpdateTier(index, "pricePerHour", e.target.value)
            }
            disabled={displayMode}
          />
        </>
      );
    }
  };

  return (
    <div style={styles.formGroup}>
      <div style={styles.tiersContainer}>
        <div style={styles.tiersContainer}>
          {/* Header */}
          <div style={styles.tierHeader}>
            {getHeaders().map((header, index) => (
              <div key={index}>{header}</div>
            ))}
          </div>

          {/* Tier Rows */}
          {tiers.map((tier, index) => (
            <div key={index} style={styles.tierRow}>
              <div>{index + 1}</div>
              {renderTierInputs(tier, index)}
              <div>
                <button
                  type="button"
                  style={
                    displayMode
                      ? styles.deleteButtonDisabled
                      : styles.deleteButton
                  }
                  onClick={() => onDeleteTier(index)}
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
              displayMode ? styles.addTierButtonDisabled : styles.addTierButton
            }
            onClick={onAddTier}
            disabled={displayMode}
          >
            + Add New Tier
          </button>
        </div>
      </div>
    </div>
  );
};

export default TierTable;
