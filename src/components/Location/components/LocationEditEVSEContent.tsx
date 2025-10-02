import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { CapabilityEnum, EVSE, ParkingRestrictionEnum } from "@/interfaces";
import { useFieldArray, useForm } from "react-hook-form";

interface LocationSettingsContentProps {
  evseFormOnSubmit: (evseData: EVSE) => void;
  evseFormData?: EVSE;
  locationId?: string;
}

const LocationEditEVSEContent: React.FC<LocationSettingsContentProps> = ({
  evseFormOnSubmit,
  evseFormData,
  //   locationId,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    // reset,
    formState: { errors },
  } = useForm<EVSE>({
    defaultValues: {
      physical_reference: "",
      floor_level: "",
      directions: [],
      parking_restrictions: [],
      capabilities: [],
    },
  });

  const {
    fields: directionFields,
    append: addDirection,
    remove: removeDirection,
  } = useFieldArray({
    control,
    name: "directions",
  });

  const watchedParkingRestrictions = watch("parking_restrictions") || [];
  const watchedCapabilities = watch("capabilities") || [];

  const toggleParkingRestriction = (restriction: ParkingRestrictionEnum) => {
    const current = watchedParkingRestrictions;
    const updated = current.includes(restriction)
      ? current.filter((r) => r !== restriction)
      : [...current, restriction];
    setValue("parking_restrictions", updated);
  };

  const toggleCapability = (capability: CapabilityEnum) => {
    const current = watchedCapabilities;
    const updated = current.includes(capability)
      ? current.filter((c) => c !== capability)
      : [...current, capability];
    setValue("capabilities", updated);
  };

  const parkingRestrictions: ParkingRestrictionEnum[] = [
    ParkingRestrictionEnum.EV_ONLY,
    ParkingRestrictionEnum.PLUGGED,
    ParkingRestrictionEnum.DISABLED,
    ParkingRestrictionEnum.CUSTOMERS,
    ParkingRestrictionEnum.MOTORCYCLES,
  ];

  const capabilities: CapabilityEnum[] = [
    CapabilityEnum.CREDIT_CARD_PAYABLE,
    CapabilityEnum.DEBIT_CARD_PAYABLE,
    CapabilityEnum.CHIP_CARD_SUPPORT,
    CapabilityEnum.CONTACTLESS_CARD_SUPPORT,
    CapabilityEnum.RESERVABLE,
    CapabilityEnum.PED_TERMINAL,
    CapabilityEnum.REMOTE_START_STOP_CAPABLE,
    CapabilityEnum.TOKEN_GROUP_CAPABLE,
  ];

  const onSubmit = (data: EVSE) => {
    evseFormOnSubmit(data);
  };

  const handleAddDirection = () => {
    addDirection({ language: "en", text: "" });
  };

  const handleRemoveDirection = (index: number) => {
    removeDirection(index);
  };

  // Don't render if no form data
  if (!evseFormData) {
    return null;
  }

  return (
    <>
      <DrawerCloseButton />
      <h3>Location Edit EVSE</h3>
      <div
        className="uk-position-fixed uk-position-top uk-width-1-1 uk-height-1-1 uk-flex uk-flex-center uk-flex-middle"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }}
      >
        <div
          className="uk-card uk-card-default uk-card-body uk-width-large uk-height-4-5 uk-flex uk-flex-column"
          style={{ maxHeight: "85vh" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="uk-flex uk-flex-column uk-height-1-1"
          >
            {/* Header */}
            <div className="uk-card-header uk-padding-small">
              <h3 className="uk-card-title uk-margin-remove">Edit EVSE</h3>
            </div>

            {/* Form Content */}
            <div className="uk-card-body uk-flex-1 uk-overflow-auto">
              {/* Physical Reference */}
              <div className="uk-margin">
                <label className="uk-form-label">Physical Reference</label>
                <div className="uk-form-controls">
                  <input
                    {...register("physical_reference", {
                      required: "Physical reference is required",
                      maxLength: {
                        value: 50,
                        message:
                          "Physical reference must be less than 50 characters",
                      },
                    })}
                    type="text"
                    className="uk-input"
                  />
                  {errors.physical_reference && (
                    <div className="uk-text-danger uk-text-small uk-margin-small-top">
                      {errors.physical_reference.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Floor Level */}
              <div className="uk-margin">
                <label className="uk-form-label">Floor Level</label>
                <div className="uk-form-controls">
                  <input
                    {...register("floor_level", {
                      maxLength: {
                        value: 20,
                        message: "Floor level must be less than 20 characters",
                      },
                    })}
                    type="text"
                    className="uk-input"
                  />
                  {errors.floor_level && (
                    <div className="uk-text-danger uk-text-small uk-margin-small-top">
                      {errors.floor_level.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Directions */}
              <div className="uk-margin">
                <label className="uk-form-label">Directions</label>
                <div className="uk-form-controls">
                  {directionFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="uk-grid-small uk-flex-middle uk-margin-small"
                      data-uk-grid
                    >
                      <div className="uk-width-auto">
                        <span className="uk-badge uk-badge-default">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="uk-width-expand">
                        <input
                          {...register(`directions.${index}.text`, {
                            required: "Direction text is required",
                            maxLength: {
                              value: 512,
                              message:
                                "Direction must be less than 512 characters",
                            },
                          })}
                          type="text"
                          placeholder="Direction text"
                          className="uk-input"
                          maxLength={512}
                        />
                        <input
                          {...register(`directions.${index}.language`)}
                          type="hidden"
                          value="en"
                        />
                      </div>
                      <div className="uk-width-auto">
                        <button
                          type="button"
                          onClick={() => handleRemoveDirection(index)}
                          className="uk-button uk-button-danger uk-button-small"
                        >
                          <span data-uk-icon="icon: close"></span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Show direction errors */}
                  {directionFields.map((field, index) => {
                    const error = errors.directions?.[index]?.text;
                    return error ? (
                      <div
                        key={`error-${index}`}
                        className="uk-text-danger uk-text-small uk-margin-small-top"
                      >
                        Direction {index + 1}: {error.message}
                      </div>
                    ) : null;
                  })}

                  <button
                    type="button"
                    onClick={handleAddDirection}
                    className="uk-button uk-button-primary uk-button-small uk-margin-small-top"
                  >
                    <span
                      data-uk-icon="icon: plus"
                      className="uk-margin-small-right"
                    ></span>
                    Add Direction
                  </button>
                </div>
              </div>

              {/* Parking Restrictions */}
              <div className="uk-margin">
                <label className="uk-form-label">Parking Restrictions</label>
                <div className="uk-form-controls">
                  <div
                    className="uk-flex uk-flex-wrap uk-grid-small"
                    data-uk-grid
                  >
                    {parkingRestrictions.map((restriction) => (
                      <div key={restriction} className="uk-width-auto">
                        <button
                          type="button"
                          onClick={() => toggleParkingRestriction(restriction)}
                          className={`uk-button uk-button-small ${
                            watchedParkingRestrictions.includes(restriction)
                              ? "uk-button-primary"
                              : "uk-button-default"
                          }`}
                        >
                          {restriction}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="uk-margin">
                <label className="uk-form-label">Capabilities</label>
                <div className="uk-form-controls">
                  <div
                    className="uk-flex uk-flex-wrap uk-grid-small"
                    data-uk-grid
                  >
                    {capabilities.map((capability) => (
                      <div key={capability} className="uk-width-auto">
                        <button
                          type="button"
                          onClick={() => toggleCapability(capability)}
                          className={`uk-button uk-button-small ${
                            watchedCapabilities.includes(capability)
                              ? "uk-button-primary"
                              : "uk-button-default"
                          }`}
                        >
                          {capability}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="uk-card-footer uk-padding">
              <div className="uk-flex uk-flex-between">
                <button
                  type="button"
                  className="uk-button uk-button-default"
                  onClick={() => {}}
                >
                  Cancel
                </button>
                <button type="submit" className="uk-button uk-button-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LocationEditEVSEContent;
