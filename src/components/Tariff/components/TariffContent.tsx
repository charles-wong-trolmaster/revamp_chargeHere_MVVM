import React from "react";
import { useDrawer } from "../../DrawerStack/DrawerStack";
import DrawerCloseButton from "../../Common/DrawerCloseButton";

interface TariffContentProps {
  drawerId: string;
}

const TariffContent: React.FC<TariffContentProps> = ({ drawerId }) => {
  const { openDrawer } = useDrawer();

  const handleDetailClick = () => {
    console.log("🖱️ Tariff Detail button clicked from TariffContent");
    console.log("📍 Current drawerId:", drawerId);
    openDrawer("tariffDetail");
  };

  const handleCreationClick = () => {
    console.log("🖱️ Tariff Creation button clicked from TariffContent");
    console.log("📍 Current drawerId:", drawerId);
    openDrawer("tariffCreation");
  };

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Tariff</h3>
      <p>Manage your tariff settings and pricing structures.</p>
      <button onClick={handleDetailClick}>Tariff Detail</button>
      <button onClick={handleCreationClick}>Tariff Creation</button>
    </>
  );
};

export default TariffContent;
