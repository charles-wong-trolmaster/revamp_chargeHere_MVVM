import React from "react";
import { useForm } from "react-hook-form";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";
interface TariffFormData {
  name: string;
  description: string;
}
interface TariffCreationContentProps {
  drawerId: string;
  onCreateClick?: (data: TariffFormData) => void;
  onCancelClick?: () => void;
}

const Creation = (props: TariffCreationContentProps) => {
  const { onCreateClick, onCancelClick } = props;
  const { openChild } = useDrawer();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TariffFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  openChild("tariffCreation");

  const onSubmit = (data: TariffFormData) => {
    if (onCreateClick) {
      onCreateClick(data);
    }
    // You can also call your API here:
    // createOneTariff(
    //   new Tariff(
    //     "KH", // countryCode
    //     "sgm", // partyId
    //     "T002", // id
    //     "KHR", // currency
    //     data.name,
    //     data.description,
    //     "test-updater", // lastUpdatedBy
    //     "test-creator" // createdBy
    //   ).toObject()
    // )
    //   .unwrap()
    //   .finally(() => {
    //     addTariffPanel.close();
    //   })
  };

  const handleCancel = () => {
    reset();
    if (onCancelClick) {
      onCancelClick();
    }
  };

  return (
    <>
      <DrawerCloseButton />
      <h3>Tariff Creation</h3>

      {/* Content Container */}
      <div className="uk-overflow-auto">
        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="uk-margin">
            <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
              Name:
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={`uk-input uk-form-width-large uk-background-muted uk-light ${
                errors.name ? "uk-form-danger" : ""
              }`}
              placeholder="Enter tariff name"
            />
            {errors.name && (
              <div className="uk-text-danger uk-text-small uk-margin-small-top">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="uk-margin">
            <label className="uk-form-label uk-text-white uk-text-small uk-text-bold">
              Description:
            </label>
            <input
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters",
                },
              })}
              className={`uk-input uk-form-width-large uk-background-muted uk-light ${
                errors.description ? "uk-form-danger" : ""
              }`}
              placeholder="Enter tariff description"
            />
            {errors.description && (
              <div className="uk-text-danger uk-text-small uk-margin-small-top">
                {errors.description.message}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="uk-border-top uk-flex uk-flex-right uk-grid-small uk-margin-medium-top uk-padding-top"
            uk-grid=""
          >
            <div>
              <button
                type="button"
                className="uk-button uk-button-default uk-button-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="uk-button uk-button-primary uk-button-small"
                onClick={handleSubmit(onSubmit)}
              >
                Create
              </button>
            </div>
          </div>
        </form>

        <div className="uk-margin-medium-top">
          <button onClick={() => openChild("addTariffEditScheme")}>
            Edit Scheme Drawer
          </button>
          <button onClick={() => openChild("addTariffAddScheme")}>
            Add Scheme Drawer
          </button>
        </div>
      </div>

      {/* <p>Create and configure new tariff structures.</p>
      <p>Set pricing tiers, time-based rates, and discount policies.</p> */}
    </>
  );
};

export default Creation;
