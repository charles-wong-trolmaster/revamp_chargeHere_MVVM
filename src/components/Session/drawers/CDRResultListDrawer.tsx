import React from "react";
import CDRDetailDrawer from "./CDRDetailsDrawer";
import Drawer from "@/components/DrawerStack/Drawer";
import CDRResultList from "../contents/CDRResultList";

interface SessionDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const CDRResultListDrawer: React.FC<SessionDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <CDRResultList drawerId={id} />
      <CDRDetailDrawer id="CDRDetail" />
    </Drawer>
  );
};

export default CDRResultListDrawer;
