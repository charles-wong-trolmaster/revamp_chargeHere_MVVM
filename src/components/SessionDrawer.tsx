// components/MultiLevelDrawer/DrawerPanel.tsx
import React from "react";
import { styles } from "@/styles/(layer 1)/locationStyles";

interface DrawerProps {
  title: string;
  items: unknown[];
  onClose: () => void;
}

const SessionDrawer: React.FC<DrawerProps> = ({
  title = "",
  items = [],
  onClose,
}) => {
  return (
    items && (
      <div style={styles.container}>
        <div style={styles.locationsPanel}>
          <div style={styles.locationsHeader}>
            <span style={styles.headerTitle}>{title}</span>

            <button style={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>

          <div style={styles.contentContainer}>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transition:
                  "opacity 0.4s ease, visibility 0.4s ease, left 0.4s ease",
                overflowY: "auto",
              }}
              className="locations-list"
            ></div>
          </div>
        </div>

        {/* <LocationQuickFilterPanel
              filterState={filterState}
              updateFilter={updateFilter}
              userLocation={userLocation}
              onRequestLocation={getUserLocation}
            /> */}

        <style>
          {`
          ${styles.animationStyles}
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    )
  );
};

export default SessionDrawer;
