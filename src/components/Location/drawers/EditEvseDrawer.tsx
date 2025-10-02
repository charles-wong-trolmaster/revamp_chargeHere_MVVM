import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import EditEvse from "../contents/EditEvse";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const EditEvseDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <EditEvse evseFormOnSubmit={() => console.log("submit evse form")} />
    </Drawer>
  );
};

export default EditEvseDrawer;
