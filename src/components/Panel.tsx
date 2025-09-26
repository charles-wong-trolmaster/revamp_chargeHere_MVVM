import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PanelProps {
  isOpen: boolean;
  showHeader?: boolean;
  headerTitle?: string;
  onClose?: () => void;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

const Panel: React.FC<PanelProps> = ({
  isOpen,
  showHeader = true,
  headerTitle = "Panel",
  onClose,
  children,
  width = "350px",
  height = "100%",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -370, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -370, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="uk-position-absolute uk-height-1-1 uk-width-1-1"
          style={{ zIndex: 1000 }}
        >
          <div className="uk-flex uk-flex-row uk-height-1-1 uk-position-absolute">
            <div
              className="uk-card uk-flex uk-flex-column uk-border-rounded uk-box-shadow-large"
              style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
                // Remove any max-height constraints
                maxHeight: typeof height === "number" ? `${height}px` : height,
              }}
            >
              <style jsx>{`
                .uk-card {
                  color: white;
                  background: rgb(14, 1, 1) !important;
                  -webkit-backdrop-filter: blur(9.7px);
                  border: 1px solid rgba(255, 255, 255, 0.3) !important;
                }
              `}</style>

              {/* Header */}
              {showHeader && (
                <div
                  className="uk-flex uk-flex-between uk-flex-middle uk-padding-small"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    flexShrink: 0, // Prevent header from shrinking
                  }}
                >
                  <span
                    className="uk-text-light uk-text-bold"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {headerTitle}
                  </span>
                  {onClose && (
                    <button
                      className="uk-button uk-button-default uk-button-small uk-border-rounded"
                      onClick={onClose}
                      style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                        minWidth: "32px",
                        height: "32px",
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              <div
                className="uk-overflow-hidden" // Changed from uk-overflow-auto
                style={{
                  flex: 1,
                  minHeight: 0,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Panel;
