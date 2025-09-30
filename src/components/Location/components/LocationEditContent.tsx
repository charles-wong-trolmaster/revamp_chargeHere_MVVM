import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface LocationSettingsContentProps {
  drawerId?: string;
}

const LocationEditContent: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationEdit",
}) => {
  const { openDrawer } = useDrawer();

  const handleTariffClick = () => {
    console.log("🖱️ Tariff button clicked from LocationEditContent");
    console.log("📍 Current drawerId:", drawerId);
    openDrawer("locationTariff");
  };

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Location Edit</h3>
      <p>Configure your location preferences here.</p>
      <p>Set default locations, time zones, and regional settings.</p>
      <button onClick={handleTariffClick}>Tariff</button>
    </>
  );
};

export default LocationEditContent;
