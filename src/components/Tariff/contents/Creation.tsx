import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface TariffCreationContentProps {
  drawerId: string;
}

const Creation: React.FC<TariffCreationContentProps> = () => {
  const { openChild } = useDrawer();

  openChild("tariffCreation");

  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Creation</h3>
      <p>Create and configure new tariff structures.</p>
      <p>Set pricing tiers, time-based rates, and discount policies.</p>
      <button onClick={() => openChild("addTariffEditScheme")}>
        Edit Scheme Drawer
      </button>
      <button onClick={() => openChild("addTariffAddScheme")}>
        Add Scheme Drawer
      </button>
    </>
  );
};

export default Creation;
