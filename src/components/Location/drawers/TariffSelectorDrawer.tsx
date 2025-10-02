import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import TariffSelector from "../contents/TariffSelector";

interface LocationDrawerProps {
  id: string;
}

const TariffSelectorDrawer: React.FC<LocationDrawerProps> = ({ id }) => {
  return (
    <Drawer id={id}>
      <TariffSelector drawerId={id} />
    </Drawer>
  );
};

export default TariffSelectorDrawer;
