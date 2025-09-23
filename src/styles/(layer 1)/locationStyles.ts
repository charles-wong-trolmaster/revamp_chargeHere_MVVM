export const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as React.CSSProperties["flexDirection"],
    zIndex: 1000,
  },
  motionContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
  },
  locationsPanel: {
    width: "350px",
    color: "white",
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    overflow: "hidden",
    zIndex: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.53)",
    borderRadius: "8px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(9.7px)",
    WebkitBackdropFilter: "blur(9.7px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  locationsHeader: {
    display: "flex",
    padding: "15px 15px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative" as React.CSSProperties["position"],
  },

  headerTitle: {
    fontSize: "16px",
    fontWeight: 500,
    color: "white",
    maxWidth: "80%",
  },
  plusIcon: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    position: "absolute" as const,
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
  },

  searchContainer: {
    padding: "10px 15px",
  },

  searchInputContainer: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "5px 10px",
    border: "1px solid white",
  },

  searchInput: {
    flexGrow: 1,
    background: "transparent",
    border: "none",
    color: "white",
    padding: "8px",
    outline: "none",
    fontSize: "14px",
  },

  searchIcon: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  clearSearch: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },

  resultLabel: {
    fontWeight: 500,
    fontSize: "14px",
  },

  sortContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#eee",
  },

  sortSelect: {
    backgroundColor: "transparent",
    border: "none",
    color: "#eee",
    cursor: "pointer",
    outline: "none",
    fontSize: "12px",
  },

  tabContainer: {
    // borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },

  tabList: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    margin: 0,
  },

  tabItem: {
    flex: 2,
    textAlign: "center" as const,
  },

  tabLink: (isActive: boolean) => ({
    display: "block",
    padding: "10px",
    color: isActive ? "rgb(0, 255, 170)" : "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    position: isActive ? ("relative" as const) : undefined,
  }),

  tabLinkIndicator: (animationDirection: string) => ({
    content: '""',
    position: "absolute" as const,
    bottom: "-1px",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#10b981",
    animation: animationDirection
      ? `${animationDirection} 0.3s ease-out forwards`
      : undefined,
  }),

  contentContainer: {
    position: "relative" as const,
    flexGrow: 1,
    overflow: "hidden",
    height: "calc(100% - 183px)",
    display: "flex",
  },

  locationItem: {
    display: "flex",
    padding: "10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    // justifyContent: "space-between",
    alignItems: "center",
  },

  locationButton: (isSelected: boolean) => ({
    display: "block",
    width: "100%",
    padding: "0",
    background: isSelected ? "rgba(255, 255, 255, 0.15)" : "transparent",
    border: "none",
    borderLeft: isSelected ? "4px solid #10b981" : "4px solid transparent",
    color: "white",
    textAlign: "left" as const,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ":hover": {
      background: "rgba(255, 255, 255, 0.15)",
    },
  }),

  openingTime: {
    paddingLeft: "15px",
    paddingTop: "5px",
    fontSize: "12px",
    display: "block",
    fontWeight: 100,
  },

  locationImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  noImage: {
    width: "90px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#aaa",
    fontSize: "12px",
    borderRadius: "5px",
  },

  locationName: {
    fontSize: "14px",
    fontWeight: "bold",
  },

  locationFieldContent: {
    fontSize: "12px",
    color: "#CACACA",
  },

  locationFieldTitle: {
    fontSize: "12px",
  },

  noResults: {
    padding: "20px",
    textAlign: "center" as const,
    color: "#aaa",
  },

  allShownText: {
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#aaa",
    padding: "15px 0",
  },

  addLocationButton: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "12px 0",
    width: "100%",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
    marginTop: "auto", // Push to bottom
  },

  // MacOS style modal styles - only animation related properties
  macModal: {
    borderRadius: "8px",
    maxHeight: "85vh",
    width: "1000px",
    display: "flex",
    flexDirection: "column" as const,
    marginLeft: 20,
    transformOrigin: `0px 1000px`,
    position: "relative" as const,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(9.7px)",
    WebkitBackdropFilter: "blur(9.7px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },

  modalTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 500,
    color: "white",
  },

  modalBody: {
    padding: "20px",
    overflowY: "auto" as const,
  },

  modalFooter: {
    padding: "15px 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "auto",
  },

  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },

  formLabel: {
    display: "block",
    marginBottom: "8px",
    fontSize: "12px",
    color: "white",
    fontWeight: 500,
  },

  formInput: {
    width: "97%",
    padding: "10px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
  },

  cancelButton: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "12px",
  },

  submitButton: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
  },

  detailsHeader: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    flex: "0 0 auto", // Don't grow or shrink
  },

  detailsTitle: {
    fontSize: "16px",
    fontWeight: 500,
    color: "white",
  },

  detailsAddress: {
    fontSize: "14px",
    fontWeight: 100,
    color: "white",
  },

  detailsContent: {
    position: "fixed" as React.CSSProperties["position"],
    width: "350px",
    height: "85vh",
    color: "white",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    overflow: "hidden",
    marginLeft: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.53)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(9.7px)",
    WebkitBackdropFilter: "blur(9.7px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    zIndex: 0,
  },

  detailsImageContainer: {
    width: "100%",
    height: "200px",
    backgroundColor: "#3a3a3a",
  },

  detailsImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  detailsNoImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3a3a",
    color: "#aaa",
  },

  detailsInfo: {
    padding: "10px",
  },

  detailsInfoItem: {
    display: "flex",
    marginBottom: "10px",
  },

  detailsLabel: {
    width: "120px",
    color: "#aaa",
    fontSize: "14px",
  },

  detailsValue: {
    fontSize: "14px",
    fontWeight: 500,
  },

  statsContainer: {
    marginBottom: "20px",
  },

  statsTitle: {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "15px",
    color: "white",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },

  statsItem: {
    backgroundColor: "#3a3a3a",
    borderRadius: "6px",
    padding: "15px",
    textAlign: "center" as const,
  },

  statsLabel: {
    fontSize: "12px",
    color: "#aaa",
    marginBottom: "5px",
  },

  statsValue: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "5px",
  },

  statsPercentage: {
    fontSize: "12px",
    color: "#aaa",
  },

  utilization: {
    marginBottom: "20px",
  },

  utilizationTitle: {
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "15px",
  },

  utilizationBar: {
    height: "24px",
    backgroundColor: "#3a3a3a",
    borderRadius: "12px",
    display: "flex",
    overflow: "hidden",
    marginBottom: "10px",
  },

  utilizationSegment: {
    height: "100%",
  },

  utilizationLegend: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  legendColor: {
    width: "12px",
    height: "12px",
    borderRadius: "3px",
  },

  legendLabel: {
    fontSize: "12px",
    color: "#aaa",
  },

  detailsFooter: {
    padding: "15px 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    flex: "0 0 auto",
  },

  detailCloseButton: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },

  viewMapButton: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "12px",
  },

  confirmOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
  },

  confirmDialog: {
    backgroundColor: "#2d2d2d",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
  },

  confirmHeader: {
    padding: "15px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },

  confirmTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 500,
    color: "white",
  },

  confirmBody: {
    padding: "20px",
    color: "white",
    fontSize: "14px",
  },

  confirmFooter: {
    padding: "15px 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  tabButton: {
    background: "transparent",
    border: "none",
    color: "white",
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.2s ease",
    opacity: 0.7,
  },

  activeTabButton: {
    opacity: 1,
    borderBottom: "2px solid #10b981",
  },

  tabContentContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },

  infoSection: {
    marginBottom: "20px ",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    marginBottom: "8px",
    marginTop: "10px",
  },

  sectionContent: {
    fontSize: "13px",
    color: "#9ca3af",
    margin: 0,
  },
  directionsContent: {
    display: "flex",
    flexDirection: "row" as React.CSSProperties["flexDirection"],
    flexWrap: "wrap" as React.CSSProperties["flexWrap"],
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },

  relatedLocationsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  relatedLocationItem: {
    marginBottom: "5px",
  },

  relatedLocationLink: {
    color: "#10b981",
    textDecoration: "none",
    fontSize: "13px",
  },

  facilitiesContainer: {
    display: "flex",
    flexWrap: "wrap" as React.CSSProperties["flexWrap"],
    gap: "10px",
  },

  facilityItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    padding: "10px",
    width: "50px",
  },

  facilityIcon: {
    fontSize: "20px",
    marginBottom: "5px",
  },

  facilityName: {
    fontSize: "12px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
  },

  shareButtons: {
    display: "flex",
    gap: "10px",
  },

  shareButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "4px",
    color: "white",
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
  },

  shareIcon: {
    fontSize: "14px",
  },

  connectorContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  connectorItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    padding: "10px",
  },

  connectorIcon: {
    fontSize: "18px",
  },

  connectorDetails: {
    display: "flex",
    flexDirection: "column",
  },

  connectorType: {
    fontSize: "13px",
    fontWeight: "500",
    color: "white",
  },

  connectorPower: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.7)",
  },

  statusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    padding: "10px",
  },

  statusIndicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },

  statusDetails: {
    display: "flex",
    flexDirection: "column",
  },

  statusLabel: {
    fontSize: "13px",
    fontWeight: "500",
    color: "white",
  },

  statusCount: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.7)",
  },

  sessionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  sessionCard: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "5px",
    padding: "10px",
  },

  sessionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  sessionId: {
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
  },

  sessionStatus: {
    padding: "2px 6px",
    borderRadius: "3px",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "white",
  },

  sessionDetails: {
    display: "flex",
    justifyContent: "space-between",
  },

  sessionDetail: {
    display: "flex",
    flexDirection: "column",
  },

  sessionDetailLabel: {
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "2px",
  },

  sessionDetailValue: {
    fontSize: "12px",
    color: "white",
  },

  noSessionsText: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.6)",
    fontStyle: "italic",
  },

  detailsTabContent: {
    flex: "1 1 auto",
    overflowY: "auto" as const,
    padding: " 0px 10px ",
  },

  detailTabList: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    margin: 0,
    width: "100%",
    flex: "0 0 auto",
    justifyContent: "center",
  },

  detailTabItem: {
    flex: 1,
    textAlign: "center" as const,
  },

  detailTabLink: (isActive: boolean) => ({
    display: "block",
    padding: "10px",
    color: isActive ? "rgb(0, 255, 170)" : "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    position: isActive ? ("relative" as const) : undefined,
  }),

  detailTabLinkIndicator: {
    content: '""',
    position: "absolute" as const,
    bottom: "-1px",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#10b981",
  },

  tabNavigationContainer: {
    display: "flex",
    marginBottom: "15px",
  },

  animationStyles: `
      @keyframes buttonClick {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(0.98); }
      }
      
      .button-animation {
        animation: buttonClick 0.2s forwards;
      }
      /* Mac-style animations */
@keyframes macOpen {
  0% {
    opacity: 0;
    transform: scale(0.7);
    transform-origin: top left;
  }
  30% {
    opacity: 0.7;
    transform: scale(0.9);
    transform-origin: top left;
  }
  70% {
    opacity: 0.9;
    transform: scale(1.05);
    transform-origin: top left;
  }
  100% {
    opacity: 1;
    transform: scale(1);
    transform-origin: top left;
  }
}

@keyframes macClose {
  0% {
    opacity: 1;
    transform: scale(1);
    transform-origin: top left;
  }
  30% {
    opacity: 0.9;
    transform: scale(1.05);
    transform-origin: top left;
  }
  70% {
    opacity: 0.7;
    transform: scale(0.9);
    transform-origin: top left;
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
    transform-origin: top left;
  }
}

.pop-open {
  animation: macOpen 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.pop-close {
  animation: macClose 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
      
      /* Confirmation dialog animation */
      @keyframes dialogFadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      .confirm-dialog {
        animation: dialogFadeIn 0.2s ease forwards;
      }
      
      /* Custom scrollbar styles */
      .locations-list::-webkit-scrollbar, .tab-content::-webkit-scrollbar {
        width: 4px;
      }
      
      .locations-list::-webkit-scrollbar-track, .tab-content::-webkit-scrollbar-track {
        background: rgba(188, 188, 188, 0.1);
        border-radius: 4px;
      }
      
      .locations-list::-webkit-scrollbar-thumb, .tab-content::-webkit-scrollbar-thumb {
        background: rgba(233, 233, 233, 0.5);
        border-radius: 4px;
        width: 8px;
      }
      
      .locations-list::-webkit-scrollbar-thumb:hover, .tab-content::-webkit-scrollbar-thumb:hover {
        background: rgba(233, 233, 233, 0.8);
      }
      
      /* Modal scrollbar styles */
      .modal-body::-webkit-scrollbar {
        width: 8px;
      }
      
      .modal-body::-webkit-scrollbar-track {
        background: #3a3a3a;
        border-radius: 4px;
      }
      
      .modal-body::-webkit-scrollbar-thumb {
        background: #10b981;
        border-radius: 4px;
      }
      
      .modal-body::-webkit-scrollbar-thumb:hover {
        background: #0e9f70;
      }

      .custom-search-input::placeholder {
        color: white; /* White placeholder text */
        opacity: 0.7; /* Optional: make it slightly transparent */
      }
      
      /* Tab indicator animations */
      @keyframes slideLeft {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideRight {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      /* UIkit animation duration optimization */
      .uk-animation-scale-up {
        animation-duration: 0.3s !important;
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        will-change: transform, opacity !important;
      }
        
    `,
};
