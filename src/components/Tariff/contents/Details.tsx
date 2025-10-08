import React, { useMemo, useState } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";
import { ITariff, Scheme, Tariff } from "@/entities";

interface SessionSettingsContentProps {
  drawerId?: string;
  tariffId?: string;
  initialData?: ITariff;
  onCancelClick?: () => void;
  onUpdateTariffClick?: (editingTariff: Tariff) => void;
  onDeleteTariffClick?: () => void;
  onSchemeListAddClick?: () => void;
  onSchemeItemClick?: (scheme: Scheme, index: number) => void;
}

const Details = (props: SessionSettingsContentProps) => {
  const {
    drawerId,
    initialData,
    tariffId,
    onCancelClick,
    onUpdateTariffClick,
    onDeleteTariffClick,
    onSchemeListAddClick,
    onSchemeItemClick,
  } = props;
  const { openChild } = useDrawer();
  // const [editingScheme, setEditingScheme] = useState<Scheme>();
  // const [editingSchemeIndex, setEditingSchemeIndex] = useState<number>();
  const [editingTariff, setEditingTariff] = useState<Tariff>(
    new Tariff(
      "kh",
      "sgm",
      "test_id",
      "KHR",
      "",
      "",
      Date.now().toLocaleString(),
      Date.now().toLocaleString()
    )
  );
  console.log("qqq editingTariff", editingTariff);

  // const [replaceTariff] = useReplaceOneTariffMutation();
  // const [deleteTariff] = useDeleteOneTariffMutation();

  // const handleSaveScheme = async (scheme: Scheme) => {
  //   if (editingScheme && editingSchemeIndex !== undefined) {
  //     tariffData?.removeScheme(editingSchemeIndex);
  //   }
  //   tariffData?.addScheme(scheme);
  //   replaceTariff({ id: tariffId, payload: tariffData?.toObject() })
  //     .unwrap()
  //     .then(() => console.log("success"))
  //     .finally(
  //       () => {}
  //       // schemeListPanel.close()
  //     );
  // };

  // const handleDeleteScheme = async () => {
  //   if (editingScheme && editingSchemeIndex !== undefined) {
  //     tariffData?.removeScheme(editingSchemeIndex);
  //   }
  //   console.log(tariffData);
  //   replaceTariff({ id: tariffId, payload: tariffData?.toObject() })
  //     .unwrap()
  //     .then(() => console.log("success"))
  //     .finally(() => schemeListPanel.close());
  // };

  const handleUpdateTariff = async (editingTariff: Tariff) => {
    console.log("qqq update editingTariff", editingTariff);

    if (onUpdateTariffClick) {
      onUpdateTariffClick(editingTariff);
    }
    // replaceTariff({ id: tariffId, payload: editingTariff?.toObject() })
    //   .unwrap()
    //   .then(() => console.log("success"))
    //   .finally(
    //     () => {}
    //     // editTariffPanel.close()
    //   );
  };

  const handleDeleteTariff = async () => {
    if (onDeleteTariffClick) {
      onDeleteTariffClick();
    }
    // deleteTariff({ id: tariffId })
    //   .unwrap()
    //   .then(() => console.log("success"))
    //   .finally(
    //     () => {}
    //     // editTariffPanel.close()
    //   );
  };

  const tariffData = useMemo(
    () => initialData && Tariff.fromObject(initialData),
    [initialData]
  );
  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Detail</h3>

      {/* Content Container */}
      <div className="uk-overflow-auto">
        {/* Form Content */}
        <div className="">
          <div className="">
            <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
              Name:
            </label>
            <input
              value={editingTariff.name || ""}
              className="uk-input uk-form-width-large uk-background-muted uk-light"
              onChange={(e) => {
                const cloned = Tariff.fromObject(editingTariff.toObject());
                cloned.name = e.target.value;
                setEditingTariff(cloned);
              }}
            />
          </div>
          <div className="uk-margin">
            <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
              Description:
            </label>
            <input
              value={editingTariff.description || ""}
              className="uk-input uk-form-width-large uk-background-muted uk-light"
              onChange={(e) => {
                const cloned = Tariff.fromObject(editingTariff.toObject());
                cloned.description = e.target.value;
                setEditingTariff(cloned);
              }}
            />
          </div>
        </div>

        {/* Scheme List Header */}
        <div className="uk-padding-small  uk-width-1-2">
          <span className="uk-text-emphasis uk-margin-remove uk-text-bold uk-width-1-2">
            Scheme List
          </span>
          <button
            className="uk-button uk-button-link uk-text-white uk-margin-small uk-width-1-2"
            onClick={() => {
              if (onSchemeListAddClick) {
                onSchemeListAddClick();
              }
              // setEditingScheme(undefined);
              // setEditingSchemeIndex(undefined);
              // console.log("qqq Add");
              // schemeListPanel.open();
            }}
          >
            +{/* <SvgIcon icon={plusOutlineIcon} size="large" /> */}
          </button>
        </div>

        {/* Scheme List Content */}
        <div className="">
          {tariffData && tariffData.getSchemeCount() > 0 ? (
            tariffData.getSchemes().map((scheme: Scheme, index: number) => (
              <button
                key={`scheme-${index}`}
                onClick={() => {
                  if (onSchemeItemClick) {
                    onSchemeItemClick(scheme, index);
                  }
                  // setEditingScheme(scheme);
                  // setEditingSchemeIndex(index);
                  // schemeListPanel.open();
                }}
                className="uk-button uk-button-link uk-width-1-1 uk-text-left uk-text-white uk-padding uk-border-bottom"
              >
                <div className="uk-flex uk-flex-middle">
                  <div className="uk-flex uk-flex-column uk-margin-left">
                    <span className="uk-text-small">{scheme.name}</span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className=" uk-text-center uk-text-muted">No scheme found</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="uk-padding-small
         uk-border-top uk-flex uk-flex-right uk-grid-small"
        uk-grid=""
      >
        <div>
          <button
            className="uk-button uk-button-danger uk-button-small"
            onClick={() => handleDeleteTariff()}
          >
            Delete
          </button>
        </div>
        <div>
          <button
            className="uk-button uk-button-default uk-button-small"
            onClick={
              () => {
                if (onCancelClick) {
                  onCancelClick();
                }
              }
              // editTariffPanel.close()
            }
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            className="uk-button uk-button-primary uk-button-small"
            onClick={() => handleUpdateTariff(editingTariff)}
          >
            Update
          </button>
        </div>
      </div>

      {/* <p>Configure your session preferences and timeouts.</p>
      <p>Set session duration, auto-logout, and security preferences.</p> */}
      <button onClick={() => openChild("editTariffEditScheme")}>
        Edit Scheme Drawer
      </button>
      <button onClick={() => openChild("editTariffAddScheme")}>
        Add Scheme Drawer
      </button>
    </>
  );
};

export default Details;
