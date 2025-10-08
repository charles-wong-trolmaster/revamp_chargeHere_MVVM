import React, { useCallback, useState } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";

interface TariffContentProps {
  onItemClick?: (tariff_id: string) => void;
  onAddTariff?: () => void;
  tariffDataList?: { id: string; name: string }[];
  onScrollToBottom?: () => void;
}

const ResultList = (props: TariffContentProps) => {
  const { onItemClick, onAddTariff, tariffDataList, onScrollToBottom } = props;
  const { openChild } = useDrawer();
  const [editingTariffId, setEditingTariffId] = useState<string>();

  const handleClickTariff = useCallback(
    (tariff_id: string) => {
      if (onItemClick) {
        onItemClick(tariff_id);
      }
      setEditingTariffId(tariff_id);
      // editTariffPanel.open(tariff_id);
    },
    [onItemClick]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (onScrollToBottom) {
          onScrollToBottom();
        }
      }
    },
    [onScrollToBottom]
  );

  // const tariffDummyDataList = [
  //   { id: "00001", name: "Kenneth's dog" },
  //   { id: "00002", name: "Kenneth's dog" },
  //   { id: "00003", name: "Kenneth's dog" },
  //   { id: "00004", name: "Kenneth's dog" },
  //   { id: "00005", name: "Kenneth's dog" },
  //   { id: "00006", name: "Kenneth's dog" },
  //   { id: "00007", name: "Kenneth's dog" },
  //   { id: "00008", name: "Kenneth's dog" },
  //   { id: "00009", name: "Kenneth's dog" },
  //   { id: "00010", name: "Kenneth's dog" },
  //   { id: "00011", name: "Kenneth's dog" },
  //   { id: "00012", name: "Kenneth's dog" },
  //   { id: "00013", name: "Kenneth's dog" },
  //   { id: "00014", name: "Kenneth's dog" },
  //   { id: "00015", name: "Kenneth's dog" },
  //   { id: "00016", name: "Kenneth's dog" },
  //   { id: "00017", name: "Kenneth's dog" },
  //   { id: "00018", name: "Kenneth's dog" },
  // ];

  return (
    <>
      <div className="uk-overflow-auto uk-height-1-1 " onScroll={handleScroll}>
        <DrawerCloseButton />
        <h3>Tariff</h3>
        <button
          onClick={() => {
            if (onAddTariff) {
              onAddTariff();
            }
          }}
        >
          +
        </button>
        {tariffDataList &&
          tariffDataList.length > 0 &&
          tariffDataList.map((tariff, index) => (
            <button
              key={`${tariff.id}-${index}`}
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
        <button onClick={() => openChild("tariffDetail")}>Tariff Detail</button>
        <button onClick={() => openChild("tariffCreation")}>
          Tariff Creation
        </button>
      </div>
    </>
  );
};

export default ResultList;
