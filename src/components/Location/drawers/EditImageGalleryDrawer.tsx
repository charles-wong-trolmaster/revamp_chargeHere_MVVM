import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import EditImageGallery from "../contents/EditImageGallery";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditImageGalleryDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditImageGallery drawerId={id} />
    </Drawer>
  );
};

export default EditImageGalleryDrawer;
