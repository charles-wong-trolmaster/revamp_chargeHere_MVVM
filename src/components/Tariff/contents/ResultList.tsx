import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface TariffContentProps {
  drawerId: string;
}

const ResultList: React.FC<TariffContentProps> = () => {
  const { openChild } = useDrawer();

  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff</h3>
      <p>Manage your tariff settings and pricing structures.</p>
      <button onClick={() => openChild("tariffDetail")}>Tariff Detail</button>
      <button onClick={() => openChild("tariffCreation")}>
        Tariff Creation
      </button>
    </>
  );
};

export default ResultList;
