import { Connector, EVSE, StatusEnum } from "@/interfaces";
import React from "react";

// Using your provided EVSE type

interface LocationDetail {
  evses: EVSE[];
}

interface EVSEsStatusBoxProps {
  locationDetail: LocationDetail;
  onEvseClick: (evseUid: string) => void;
  getStatusLabel: (status: StatusEnum) => string;
}

const getStatusColor = (status: StatusEnum): string => {
  switch (status) {
    case "AVAILABLE":
      return "#00B871";
    case "CHARGING":
    case "RESERVED":
    case "PLANNED":
      return "#ff9500";
    default:
      return "#ff4444";
  }
};

const EVSEsStatusBox: React.FC<EVSEsStatusBoxProps> = ({
  locationDetail,
  onEvseClick,
  getStatusLabel,
}) => {
  const availableEvses = locationDetail.evses.filter(
    (evse: EVSE) => evse.status === "AVAILABLE"
  );

  if (availableEvses.length === 0) {
    return (
      <div className="uk-card uk-card-default uk-card-body uk-text-center uk-margin-top">
        <span className="uk-text-muted">No available EVSEs</span>
      </div>
    );
  }

  return (
    <div className="uk-margin-top">
      {availableEvses.map((evse: EVSE, index: number) => (
        <button
          key={`physical-reference-${index}`}
          className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-margin-small-bottom uk-button uk-button-default uk-text-left"
          style={{
            border: "2px dotted #000",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => onEvseClick(evse.uid)}
        >
          {/* EVSE Header */}
          <div className="uk-flex uk-flex-between uk-margin-small-bottom">
            <span className="uk-text-bold uk-text-small">
              {evse.physical_reference}
            </span>
            <span
              className="uk-label uk-text-uppercase"
              style={{
                backgroundColor: getStatusColor(evse.status),
                fontSize: "10px",
              }}
            >
              {getStatusLabel(evse.status)}
            </span>
          </div>

          {/* Floor Level */}
          {evse.floor_level && (
            <div className="uk-margin-small-bottom">
              <div className="uk-text-muted uk-text-small">Floor Level</div>
              <div className="uk-text-small">{evse.floor_level}</div>
            </div>
          )}

          {/* Directions */}
          {evse.directions &&
            evse.directions.length > 0 &&
            evse.directions.some(
              (direction: any) => direction.text && direction.text.length > 0
            ) && (
              <div className="uk-margin-small-bottom">
                <div className="uk-text-muted uk-text-small">Directions</div>
                {evse.directions.map((direction: any, dirIndex: number) => (
                  <div
                    key={`evse-${evse.uid}-direction-${dirIndex}`}
                    className="uk-text-small"
                  >
                    {direction.text}
                  </div>
                ))}
              </div>
            )}

          {/* Connectors */}
          {evse.connectors && evse.connectors.length > 0 && (
            <div className="uk-margin-small-bottom">
              <div className="uk-text-muted uk-text-small">Connector</div>
              <div className="uk-flex uk-flex-wrap" style={{ gap: "5px" }}>
                {evse.connectors.map(
                  (connector: Connector, connIndex: number) => (
                    <div
                      key={`evse-${evse.uid}-connector-${connIndex}`}
                      className="uk-label"
                      style={{
                        backgroundColor: "#00B871",
                        fontSize: "8px",
                        padding: "4px 8px",
                      }}
                    >
                      <div>STANDARD: {connector.standard}</div>
                      <div>
                        MAX ELECTRIC POWER: {connector.max_electric_power}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Parking Restrictions */}
          {evse.parking_restrictions &&
            evse.parking_restrictions.length > 0 && (
              <div className="uk-margin-small-bottom">
                <div className="uk-text-muted uk-text-small">
                  Parking Restrictions
                </div>
                <div className="uk-flex uk-flex-wrap" style={{ gap: "5px" }}>
                  {evse.parking_restrictions.map(
                    (restriction: string, restrictIndex: number) => (
                      <div
                        key={`evse-${evse.uid}-parking_restrictions-${restrictIndex}`}
                        className="uk-label"
                        style={{
                          backgroundColor: "#00B871",
                          fontSize: "8px",
                          padding: "4px 8px",
                        }}
                      >
                        {restriction}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Capabilities */}
          {evse.capabilities && evse.capabilities.length > 0 && (
            <div className="uk-margin-small-bottom">
              <div className="uk-text-muted uk-text-small">Capabilities</div>
              <div className="uk-flex uk-flex-wrap" style={{ gap: "5px" }}>
                {evse.capabilities.map(
                  (capability: string, capIndex: number) => (
                    <div
                      key={`evse-${evse.uid}-capabilities-${capIndex}`}
                      className="uk-label"
                      style={{
                        backgroundColor: "#00B871",
                        fontSize: "8px",
                        padding: "4px 8px",
                      }}
                    >
                      {capability}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default EVSEsStatusBox;
