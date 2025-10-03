import React, { useMemo, useState } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";
import { ITariff, Scheme, Tariff } from "@/entities";
import {
  useDeleteOneTariffMutation,
  useReplaceOneTariffMutation,
} from "@/redux/rtk-query/endpoints/admin/tariffs";

interface SessionSettingsContentProps {
  drawerId?: string;
  initialData?: ITariff;
}

const Details = (props: SessionSettingsContentProps) => {
  const { drawerId, initialData } = props;
  const { openChild } = useDrawer();
  const [editingScheme, setEditingScheme] = useState<Scheme>();
  const [editingSchemeIndex, setEditingSchemeIndex] = useState<number>();
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

  const [replaceTariff] = useReplaceOneTariffMutation();
  const [deleteTariff] = useDeleteOneTariffMutation();

  const handleDeleteScheme = async () => {
    if (editingScheme && editingSchemeIndex !== undefined) {
      tariffData?.removeScheme(editingSchemeIndex);
    }
    console.log(tariffData);
    replaceTariff({ id: tariffId, payload: tariffData?.toObject() })
      .unwrap()
      .then(() => console.log("success"))
      .finally(() => schemeListPanel.close());
  };

  const handleUpdateTariff = async () => {
    replaceTariff({ id: tariffId, payload: editingTariff?.toObject() })
      .unwrap()
      .then(() => console.log("success"))
      .finally(() => editTariffPanel.close());
  };

  const handleDeleteTariff = async () => {
    deleteTariff({ id: tariffId })
      .unwrap()
      .then(() => console.log("success"))
      .finally(() => editTariffPanel.close());
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
      <div className="uk-position-relative uk-flex-1 uk-overflow-hidden uk-flex">
        <div className="uk-position-absolute uk-width-1-1 uk-height-1-1 uk-overflow-auto locations-list">
          {/* Form Content */}
          <div className="uk-padding tariff-list">
            <div className="uk-margin">
              <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
                Name:
              </label>
              <input
                value={editingTariff.name || ""}
                className="uk-input uk-form-width-large uk-background-muted uk-light"
                onChange={(e) => {
                  const cloned = Tariff.fromObject(editingTariff.toObject());
                  cloned.name = e.value;
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
                  cloned.description = e.value;
                  setEditingTariff(cloned);
                }}
              />
            </div>
          </div>

          {/* Scheme List Header */}
          <div className="uk-flex uk-padding uk-position-relative uk-border-bottom">
            <span className="uk-text-emphasis uk-margin-remove uk-text-bold">
              Scheme List
            </span>
            <button
              className="uk-button uk-button-link uk-text-white uk-flex uk-flex-center uk-flex-middle"
              onClick={() => {
                setEditingScheme(undefined);
                setEditingSchemeIndex(undefined);
                // schemeListPanel.open();
              }}
            >
              {/* <SvgIcon icon={plusOutlineIcon} size="large" /> */}
            </button>
          </div>

          {/* Scheme List Content */}
          <div className="tab-content">
            {tariffData.getSchemeCount() > 0 ? (
              tariffData.getSchemes().map((scheme: Scheme, index: number) => (
                <button
                  key={`scheme-${index}`}
                  onClick={() => {
                    setEditingScheme(scheme);
                    setEditingSchemeIndex(index);
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
              <div className="uk-padding uk-text-center uk-text-muted">
                No scheme found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="uk-padding uk-border-top uk-flex uk-flex-right uk-grid-small"
        uk-grid=""
      >
        <div>
          <button
            className="uk-button uk-button-danger uk-button-small"
            // onClick={() => handleDeleteTariff()}
          >
            Delete
          </button>
        </div>
        <div>
          <button
            className="uk-button uk-button-default uk-button-small"
            // onClick={() => editTariffPanel.close()}
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            className="uk-button uk-button-primary uk-button-small"
            // onClick={() => handleUpdateTariff()}
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
