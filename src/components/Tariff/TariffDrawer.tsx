import React from "react";
import Drawer from "../DrawerStack/Drawer";
import TariffContent from "./components/TariffContent";
import TariffDetailDrawer from "./TariffDetailDrawer";
import TariffCreationDrawer from "./TariffCreationDrawer";
interface SessionSecurityDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const TariffDrawer: React.FC<SessionSecurityDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <TariffContent drawerId={id} />
      <TariffDetailDrawer id={"tariffDetail"} />
      <TariffCreationDrawer id={"tariffCreation"} />
    </Drawer>
  );
};

export default TariffDrawer;
