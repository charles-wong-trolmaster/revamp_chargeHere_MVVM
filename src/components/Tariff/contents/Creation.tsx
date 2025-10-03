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

      {/* Content Container */}
      <div className=" uk-overflow-auto locations-list">
        {/* Form Content */}
        <div className=" ">
          <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
            Name:
          </label>
          <input
            // value={formData.name}
            onChange={
              (e) => {}
              // setFormData({
              //   ...formData,
              //   name: e.value,
              // })
            }
            className="uk-input uk-form-width-large uk-background-muted uk-light"
          />

          <div className="uk-margin">
            <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
              Description:
            </label>
            <input
              // value={formData.description}
              onChange={
                (e) => {}
                // setFormData({
                //   ...formData,
                //   description: e.value,
                // })
              }
              className="uk-input uk-form-width-large uk-background-muted uk-light"
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className=" uk-border-top uk-flex uk-flex-right uk-grid-small"
          uk-grid=""
        >
          <div>
            <button
              className="uk-button uk-button-default uk-button-small"
              // onClick={() => addTariffPanel.close()}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="uk-button uk-button-primary uk-button-small"
              onClick={
                () => {}
                // createOneTariff(
                //   new Tariff(
                //     "KH", // countryCode
                //     "sgm", // partyId
                //     "T002", // id
                //     "KHR", // currency
                //     formData.name,
                //     formData.description,
                //     "test-updater", // lastUpdatedBy
                //     "test-creator" // createdBy
                //   ).toObject()
                // )
                //   .unwrap()
                //   .finally(() => {
                //     addTariffPanel.close();
                //   })
              }
            >
              Create
            </button>
          </div>
        </div>
        <button onClick={() => openChild("addTariffEditScheme")}>
          Edit Scheme Drawer
        </button>
        <button onClick={() => openChild("addTariffAddScheme")}>
          Add Scheme Drawer
        </button>
      </div>

      {/* <p>Create and configure new tariff structures.</p>
      <p>Set pricing tiers, time-based rates, and discount policies.</p> */}
    </>
  );
};

export default Creation;
