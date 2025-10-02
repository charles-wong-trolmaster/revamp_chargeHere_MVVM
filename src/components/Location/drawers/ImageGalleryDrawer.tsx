import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import ImageGallery from "../contents/ImageGallery";
import EditImageGalleryDrawer from "./EditImageGalleryDrawer";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const ImageGalleryDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <ImageGallery drawerId={id} />
      <EditImageGalleryDrawer id="locationEditGallery" />
    </Drawer>
  );
};

export default ImageGalleryDrawer;
