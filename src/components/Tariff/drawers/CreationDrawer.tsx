import React from "react";
import AddTariffAddSchemeDrawer from "./AddTariffAddSchemeDrawer";
import AddTariffEditSchemeDrawer from "./AddTariffEditSchemeDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import Creation from "../contents/Creation";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const CreationDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Creation drawerId={id} />
      <AddTariffEditSchemeDrawer id="addTariffEditScheme" />
      <AddTariffAddSchemeDrawer id="addTariffAddScheme" />
    </Drawer>
  );
};

export default CreationDrawer;
