import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface SessionSettingsContentProps {
  drawerId?: string;
}

const StationLocationEditGalleryContent: React.FC<
  SessionSettingsContentProps
> = ({ drawerId = "stationLocationEditGallery" }) => {
  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Station Location Edit Gallery</h3>
      <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p>
    </>
  );
};

export default StationLocationEditGalleryContent;
