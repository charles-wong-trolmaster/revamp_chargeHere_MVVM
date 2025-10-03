import React, { useCallback, useState } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface TariffContentProps {
  drawerId: string;
}

const ResultList: React.FC<TariffContentProps> = () => {
  const { openChild } = useDrawer();
  const [editingTariffId, setEditingTariffId] = useState<string>();
  const handleClickTariff = useCallback((tariff_id: string) => {
    setEditingTariffId(tariff_id);
    // editTariffPanel.open(tariff_id);
  }, []);

  const tariffDataList = [
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
    { id: "00001", name: "Kenneth's dog" },
  ];
  const loadingTariff = false;
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff</h3>
      {/* <div className=" uk-flex uk-flex-row uk-position-absolute"> */}
      <div className="uk-text-white uk-flex uk-flex-column  ">
        {/* Content Container */}
        <div
          className="uk-position-absolute  uk-overflow-auto"
          // onScroll={handleScroll}
        >
          {tariffDataList.length > 0 &&
            tariffDataList.map((tariff) => (
              <button
                key={tariff.id}
                onClick={() => handleClickTariff(tariff.id)}
                className={`uk-text-left ${
                  editingTariffId === tariff.id ? "selected" : ""
                } uk-width-1-1`}
              >
                <div className="uk-flex uk-padding-small uk-flex-middle">
                  <div className="uk-flex uk-flex-column uk-margin-left">
                    <span className="">{tariff.name}</span>
                  </div>
                </div>
              </button>
            ))}
          <button onClick={() => openChild("tariffDetail")}>
            Tariff Detail
          </button>
          <button onClick={() => openChild("tariffCreation")}>
            Tariff Creation
          </button>
        </div>
      </div>
      {/* <p>Manage your tariff settings and pricing structures.</p> */}

      {/* </div> */}
    </>
  );
};

export default ResultList;
