import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface TariffContentProps {
  drawerId: string;
}

const TariffContent: React.FC<TariffContentProps> = ({ drawerId }) => {
  const { openChild } = useDrawer();

  const handleDetailClick = () => {
    console.log("🖱️ Tariff Detail button clicked from TariffContent");
    console.log("📍 Current drawerId:", drawerId);
    openChild("tariffDetail");
  };

  const handleCreationClick = () => {
    console.log("🖱️ Tariff Creation button clicked from TariffContent");
    console.log("📍 Current drawerId:", drawerId);
    openChild("tariffCreation");
  };

  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff</h3>
      <p>Manage your tariff settings and pricing structures.</p>
      <button onClick={handleDetailClick}>Tariff Detail</button>
      <button onClick={handleCreationClick}>Tariff Creation</button>
    </>
  );
};

export default TariffContent;
