// components/MultiLevelDrawer/DrawerPanel.tsx
import React from "react";
import { styles } from "@/styles/(layer 1)/locationStyles";

interface DrawerProps {
  title: string;
  onClose: () => void;
  onItemClick: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ title, onClose, onItemClick }) => {
  return (
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
          >
            <div className="tab-content">
              <button onClick={onItemClick} style={styles.locationButton(true)}>
                <div style={styles.locationItem}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <span style={styles.locationName}>{"Location 1"}</span>
                    <span style={styles.locationFieldContent}>{"City"}</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default Drawer;
