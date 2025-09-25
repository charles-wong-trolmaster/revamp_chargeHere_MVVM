import React from "react";
import { Location } from "@/interfaces/index";

interface LocationCardProps {
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  items: Location[];
  onItemClick: (location: Location) => void;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  maxHeight?: string;
  loadingText?: string;
  noResultsText?: string;
  loadingMoreText?: string;
  endOfResultsText?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  isFetching,
  isLoading,
  hasNextPage,
  items = [],
  onItemClick,
  onScroll,
  maxHeight = "calc(100vh - 200px)",
  loadingText = "Loading locations...",
  noResultsText = "No locations found",
  loadingMoreText = "Loading more...",
  endOfResultsText = "All locations are shown",
}) => {
  const formatOpeningHours = (location: Location) => {
    if (location.opening_times?.twentyfourseven) {
      return "24/7";
    }

    const regularHours = location.opening_times?.regular_hours ?? [];
    if (regularHours.length === 0) {
      return "No data available";
    }

    const currentDay = new Date().getDay();
    const todaysHours = regularHours.find(
      (hours) => hours.weekday === currentDay
    );

    return todaysHours
      ? `${todaysHours.period_begin} - ${todaysHours.period_end}`
      : "Closed today";
  };

  return (
    <div className="uk-card uk-card-default uk-card-body uk-width-large uk-height-large uk-background-secondary">
      {/* Content Container */}
      <div
        className="uk-height-1-1 uk-overflow-auto"
        style={{
          maxHeight,
          paddingRight: "8px",
        }}
        onScroll={onScroll}
      >
        {/* Loading State */}
        {isLoading ? (
          <div className="uk-text-center uk-padding uk-text-light">
            <div uk-spinner="ratio: 1"></div>
            <p className="uk-margin-small-top">{loadingText}</p>
          </div>
        ) : items.length > 0 ? (
          /* Location Items */
          <div className="uk-grid-small uk-child-width-1-1" uk-grid="">
            {items.map((location) => (
              <div key={location.id}>
                <button
                  onClick={() => onItemClick(location)}
                  className="uk-button uk-button-default uk-width-1-1 uk-text-left uk-padding uk-border-rounded"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="uk-grid-small uk-flex-middle" uk-grid="">
                    <div className="uk-width-expand">
                      {/* Location Name */}
                      <h4 className="uk-margin-remove uk-text-bold uk-text-light">
                        {location.name}
                      </h4>

                      {/* City */}
                      <p className="uk-margin-small uk-text-muted">
                        {location.city}
                      </p>

                      {/* Opening Hours */}
                      {location.opening_times && (
                        <div className="uk-margin-small">
                          <span className="uk-text-bold uk-text-light uk-margin-small-right">
                            Open:
                          </span>
                          <span className="uk-text-light">
                            {formatOpeningHours(location)}
                          </span>
                        </div>
                      )}

                      {/* Bottom Info Row */}
                      <div className="uk-grid-small uk-margin-small" uk-grid="">
                        {/* Stations Count */}
                        <div className="uk-width-1-2@s">
                          <div className="uk-text-small">
                            <span className="uk-text-bold uk-text-light">
                              Stations:{" "}
                            </span>
                            <span className="uk-text-light">
                              {(location.evses ?? []).length > 0
                                ? `${location.evses?.length} stations`
                                : "No stations"}
                            </span>
                          </div>
                        </div>

                        {/* Amenities */}
                        {location.facilities &&
                          location.facilities.length > 0 && (
                            <div className="uk-width-1-2@s">
                              <div className="uk-text-small">
                                <span className="uk-text-bold uk-text-light">
                                  Amenities:{" "}
                                </span>
                                <div className="uk-flex uk-flex-wrap uk-margin-small-top">
                                  {location.facilities
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <span
                                        key={facility}
                                        className="uk-badge uk-margin-small-right uk-margin-small-bottom"
                                        style={{
                                          background:
                                            "rgba(255, 255, 255, 0.2)",
                                          color: "white",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {facility}
                                      </span>
                                    ))}
                                  {location.facilities.length > 3 && (
                                    <span
                                      className="uk-badge uk-margin-small-right"
                                      style={{
                                        background: "rgba(255, 255, 255, 0.3)",
                                        color: "white",
                                        fontSize: "10px",
                                      }}
                                    >
                                      +{location.facilities.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="uk-text-center uk-padding uk-text-light">
            <div
              uk-icon="icon: search; ratio: 2"
              className="uk-margin-bottom"
            ></div>
            <p>{noResultsText}</p>
          </div>
        )}

        {/* Loading More Indicator */}
        {isFetching && items.length > 0 && (
          <div className="uk-text-center uk-padding uk-text-light">
            <div uk-spinner="ratio: 0.8"></div>
            <p className="uk-margin-small-top uk-text-small">
              {loadingMoreText}
            </p>
          </div>
        )}

        {/* End of Results */}
        {!hasNextPage && items.length > 0 && !isLoading && (
          <div className="uk-text-center uk-padding uk-text-muted">
            <hr className="uk-divider-small" />
            <p className="uk-text-small">{endOfResultsText}</p>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .uk-button:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .uk-button:active {
          transform: translateY(0);
        }

        /* Custom scrollbar */
        .uk-overflow-auto::-webkit-scrollbar {
          width: 6px;
        }

        .uk-overflow-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .uk-overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .uk-overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LocationCard;
