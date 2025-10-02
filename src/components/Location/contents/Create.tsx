import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useForm } from "react-hook-form";
import { FacilityEnum, Location, RegularHours } from "@/interfaces";
import GeoCodeAddressInput from "@/components/GeoCodeAddressInput";
import AmenitiesIcon from "@/components/AmenitiesIcon";

interface LocationSettingsContentProps {
  drawerId?: string;
  title?: string;
  onClose?: () => void;
  onSubmit?: (data: Location) => void;
}

const Create: React.FC<LocationSettingsContentProps> = ({
  drawerId = "locationCreation",
  title,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Location>({
    defaultValues: {
      country_code: "",
      party_id: "",
      publish: false,
      name: "",
      address: "",
      city: "",
      postal_code: "",
      state: "",
      country: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
      facilities: [],
      time_zone: "",
      opening_times: {
        twentyfourseven: false,
        regular_hours: [],
      },
    },
  });

  const watchedOpeningTimes = watch("opening_times");
  const watchedFacilities = watch("facilities");
  const watchedAddress = watch([
    "address",
    "city",
    "postal_code",
    "state",
    "country",
    "coordinates.latitude",
    "coordinates.longitude",
  ]);

  const handleAddressChange = (newAddressData: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
  }) => {
    setValue("address", newAddressData.address);
    setValue("city", newAddressData.city);
    setValue("postal_code", newAddressData.postalCode);
    setValue("state", newAddressData.state);
    setValue("country", newAddressData.country);
    setValue("coordinates.latitude", newAddressData.latitude);
    setValue("coordinates.longitude", newAddressData.longitude);
  };

  const handleToggleChange = (checked: boolean) => {
    setValue("opening_times", {
      twentyfourseven: checked,
      regular_hours: checked ? [] : getValues("opening_times.regular_hours"),
    });
  };

  const handleFacilityToggle = (facility: FacilityEnum) => {
    const currentFacilities = getValues("facilities");
    const isSelected = currentFacilities?.includes(facility);

    if (isSelected) {
      setValue(
        "facilities",
        currentFacilities?.filter((f) => f !== facility)
      );
    } else {
      setValue("facilities", [...(currentFacilities || []), facility]);
    }
  };

  const addRegularHour = () => {
    const currentHours = getValues("opening_times.regular_hours");
    setValue("opening_times.regular_hours", [
      ...(currentHours || []),
      {
        weekday: 1,
        period_begin: "09:00",
        period_end: "17:00",
      },
    ]);
  };

  const removeRegularHour = (index: number) => {
    const currentHours = getValues("opening_times.regular_hours");
    const newHours = [...(currentHours || [])];
    newHours.splice(index, 1);
    setValue("opening_times.regular_hours", newHours);
  };

  const updateRegularHour = (
    index: number,
    field: keyof RegularHours,
    value: string | number
  ) => {
    const currentHours = getValues("opening_times.regular_hours");
    const newHours = [...(currentHours || [])];
    newHours[index] = {
      ...newHours[index],
      [field]: value,
    };
    setValue("opening_times.regular_hours", newHours);
  };

  const onFormSubmit = (data: Location) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("Form submitted:", data);
  };

  return (
    <>
      <DrawerCloseButton />
      <h3>Location Creation</h3>
      <div className="uk-height-1-1  uk-overflow-auto">
        <div className="uk-padding-small uk-flex uk-flex-column uk-flex-center">
          {/* Name Field */}
          <div className="uk-margin">
            <label className="uk-form-label uk-text-bold uk-text-large uk-light">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                maxLength: 255,
              })}
              type="text"
              placeholder="Title of the location"
              className="uk-input"
              maxLength={255}
            />
          </div>

          {/* Address Field */}
          <div className="uk-margin">
            <label className="uk-form-label uk-text-bold uk-text-large uk-light">
              Address
            </label>
            <GeoCodeAddressInput
              address={watchedAddress[0]}
              city={watchedAddress[1]}
              postalCode={watchedAddress[2]}
              state={watchedAddress[3]}
              country={watchedAddress[4]}
              latitude={watchedAddress[5]}
              longitude={watchedAddress[6]}
              onAddressChange={handleAddressChange}
              required={true}
            />
          </div>

          {/* Opening Times */}
          <div className="uk-margin-large">
            <label className="uk-form-label uk-text-bold uk-text-large uk-light">
              24/7 Opening
            </label>
            <div className="uk-flex uk-flex-middle uk-grid-small" uk-grid="">
              <div>
                <label className="uk-switch">
                  <input
                    {...register("opening_times.twentyfourseven")}
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      handleToggleChange(checked);
                    }}
                  />
                  <div className="uk-switch-slider"></div>
                </label>
              </div>
              <div>
                <span className="uk-text-small uk-light">
                  {watchedOpeningTimes?.twentyfourseven
                    ? "Open 24/7"
                    : "Custom Hours"}
                </span>
              </div>
            </div>
          </div>

          {/* Regular Hours */}
          {watchedOpeningTimes && !watchedOpeningTimes.twentyfourseven && (
            <div>
              <label className="uk-form-label uk-text-bold uk-text-large uk-light">
                Regular Hours
              </label>
              <div className="uk-margin">
                {watchedOpeningTimes.regular_hours &&
                  watchedOpeningTimes.regular_hours.map((hour, index) => (
                    <div
                      key={index}
                      className="uk-flex uk-flex-middle uk-grid-small uk-margin-small"
                      uk-grid=""
                    >
                      <div className="uk-width-1-4">
                        <select
                          {...register(
                            `opening_times.regular_hours.${index}.weekday` as const
                          )}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            updateRegularHour(index, "weekday", value);
                          }}
                          className="uk-select"
                        >
                          <option value="">Weekday</option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                          <option value="7">Sunday</option>
                        </select>
                      </div>

                      <div className="uk-width-1-4">
                        <input
                          {...register(
                            `opening_times.regular_hours.${index}.period_begin` as const
                          )}
                          type="text"
                          placeholder="Start (HH:MM)"
                          onChange={(e) => {
                            updateRegularHour(
                              index,
                              "period_begin",
                              e.target.value
                            );
                          }}
                          className="uk-input"
                          maxLength={5}
                        />
                      </div>

                      <div className="uk-width-1-4">
                        <input
                          {...register(
                            `opening_times.regular_hours.${index}.period_end` as const
                          )}
                          type="text"
                          placeholder="End (HH:MM)"
                          onChange={(e) => {
                            updateRegularHour(
                              index,
                              "period_end",
                              e.target.value
                            );
                          }}
                          className="uk-input"
                          maxLength={5}
                        />
                      </div>

                      <div className="uk-width-auto">
                        <button
                          type="button"
                          onClick={() => removeRegularHour(index)}
                          className="uk-button uk-button-danger uk-button-small"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                type="button"
                onClick={addRegularHour}
                className="uk-button uk-button-primary uk-button-small"
              >
                + Add Regular Hours
              </button>
            </div>
          )}

          {/* Facilities */}
          <div className="uk-margin-large">
            <label className="uk-form-label uk-text-bold uk-text-large uk-light">
              Facilities
            </label>
            <div
              className="uk-child-width-1-4@s uk-child-width-1-2@xs uk-grid-small uk-margin-top"
              uk-grid=""
            >
              {Object.values(FacilityEnum).map((facility) => {
                const isSelected = watchedFacilities?.includes(facility);
                return (
                  <div key={facility}>
                    <button
                      type="button"
                      onClick={() => handleFacilityToggle(facility)}
                      className={`uk-button uk-width-1-1 uk-text-center uk-padding-small ${
                        isSelected ? "uk-button-primary" : "uk-button-default"
                      }`}
                      style={{ minHeight: "80px" }}
                    >
                      <AmenitiesIcon facility={facility} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button - Fixed Position */}
        <div className="uk-position-bottom uk-position-z-index uk-padding">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(onFormSubmit)}
            className={`uk-button uk-button-primary uk-width-1-1 ${
              isSubmitting ? "uk-disabled" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Location"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
