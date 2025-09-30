import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "../../DrawerStack/DrawerStack";

interface TariffCreationContentProps {
  drawerId: string;
}

const TariffCreationContent: React.FC<TariffCreationContentProps> = ({
  drawerId,
}) => {
  const { openDrawer } = useDrawer();

  const handleCreationDetailClick = () => {
    console.log(
      "🖱️ Tariff Creation Detail button clicked from TariffCreationContent"
    );
    console.log("📍 Current drawerId:", drawerId);
    openDrawer("tariffCreationDetail");
  };

  return (
    <>
      <DrawerCloseButton drawerId={drawerId} />
      <h3>Tariff Creation</h3>
      <p>Create and configure new tariff structures.</p>
      <p>Set pricing tiers, time-based rates, and discount policies.</p>
      <button onClick={handleCreationDetailClick}>
        Tariff Creation Detail
      </button>
    </>
  );
};

export default TariffCreationContent;
