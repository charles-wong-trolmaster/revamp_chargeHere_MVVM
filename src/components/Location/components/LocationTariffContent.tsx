import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationTariffContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationTariff",
}) => {
  return (
    <>
      <DrawerCloseButton />
      <h3>Location Tariff</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
    </>
  );
};

export default LocationTariffContent;
