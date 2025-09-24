// components/MultiLevelDrawer/DrawerPanel.tsx
import React from "react";
import { styles } from "@/styles/(layer 1)/locationStyles";
import { Location } from "@/interfaces/index";

interface DrawerProps {
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  items: Location[];
  title: string;
  onClose: () => void;
  onItemClick: (location: Location) => void;
  handleScroll: () => void;
  onScrollToBottom: () => void;
}

const LocationDrawer: React.FC<DrawerProps> = ({
  isFetching,
  isLoading,
  hasNextPage,
  items = [],
  title,
  onClose,
  onItemClick,
  handleScroll,
}) => {
  console.log(items);
  return (
    items && (
      <div style={styles.container}>
        <div style={styles.locationsPanel}>
          <div style={styles.locationsHeader}>
            <span style={styles.headerTitle}>Result ({items.length})</span>

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
              onScroll={handleScroll}
            >
              <div className="tab-content">
                {isLoading ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "white",
                    }}
                  >
                    Loading locations...
                  </div>
                ) : items.length > 0 ? (
                  items.map((location) => {
                    // Remove the console.log or move it here if needed for debugging
                    // console.log(location);

                    return (
                      <button
                        key={location.id}
                        onClick={() => onItemClick(location)}
                        style={styles.locationButton(true)}
                      >
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
                            <span style={styles.locationName}>
                              {location.name}
                            </span>
                            <span style={styles.locationFieldContent}>
                              {location.city}
                            </span>
                            {location.opening_times && (
                              <div className="uk-flex">
                                <div style={styles.locationFieldTitle}>
                                  Open:
                                </div>
                                <div
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                >
                                  {location.opening_times?.twentyfourseven ? (
                                    <span>24/7</span>
                                  ) : (
                                      location.opening_times?.regular_hours ??
                                      []
                                    ).length > 0 ? (
                                    (() => {
                                      const currentDay = new Date().getDay();
                                      const regularHours =
                                        location.opening_times?.regular_hours ??
                                        [];
                                      const todaysHours = regularHours.find(
                                        (hours) => hours.weekday === currentDay
                                      );

                                      if (todaysHours) {
                                        return (
                                          <span>
                                            {todaysHours.period_begin} -{" "}
                                            {todaysHours.period_end}
                                          </span>
                                        );
                                      } else {
                                        return <span>Closed today</span>;
                                      }
                                    })()
                                  ) : (
                                    <span>No data from backend</span>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="uk-flex">
                              <div
                                style={{
                                  alignItems: "center",
                                  gap: "5px",
                                  marginBottom: "8px",
                                  width: "50%",
                                }}
                              >
                                <div style={styles.locationFieldTitle}>
                                  Stations
                                </div>
                                <div style={styles.locationFieldContent}>
                                  {(location.evses ?? []).length > 0 ? (
                                    <span>
                                      {location.evses?.length} stations
                                    </span>
                                  ) : (
                                    <span>No Evse</span>
                                  )}
                                </div>
                              </div>
                              {location.facilities &&
                                location.facilities.length > 0 && (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      gap: "5px",
                                      marginBottom: "8px",
                                      width: "50%",
                                    }}
                                  >
                                    <div style={styles.locationFieldTitle}>
                                      Amenities
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        color: "white",
                                      }}
                                    >
                                      <div className="uk-flex uk-flex-wrap">
                                        {location.facilities.map((facility) => (
                                          <div
                                            style={{
                                              padding: "5px",
                                            }}
                                            key={facility}
                                          >
                                            {/* <FacilityDisplay
                                                    facility={facility}
                                                  /> */}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div style={styles.noResults}>No locations found</div>
                )}

                {isFetching && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "3px solid rgba(255, 255, 255, 0.2)",
                        borderTop: "3px solid rgba(255, 255, 255, 0.6)",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                  </div>
                )}

                {!hasNextPage && items.length > 0 && !isLoading && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "14px",
                    }}
                  >
                    All locations are shown.
                  </div>
                )}
              </div>
            </div>
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

export default LocationDrawer;
