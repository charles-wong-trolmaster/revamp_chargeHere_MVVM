import { MapState } from "@/redux/features/map/mapSlice";
import React from "react";

interface MapProps extends MapState {
  onSelect: (item: number) => void;
}

const Map = (props: MapProps) => {
  const { bound, items, selectedIndex, onSelect } = props;

  return (
    <div
      id="map-container"
      className="uk-position-absolute uk-width-1-1 uk-height-1-1"
      style={{
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: "#e8f4f8", // Fallback color while map loads
      }}
    >
      {/* Map will be initialized here */}
      <div className="uk-flex uk-flex-center uk-flex-middle uk-height-1-1 uk-text-muted">
        <span>Map Loading...</span>
      </div>
    </div>
  );
};

export default Map;
