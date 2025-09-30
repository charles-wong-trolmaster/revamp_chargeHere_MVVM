import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import GeoCodeAddressInput from "./GeoCodeAddressInput";
import Panel from "./Panel";
import { FacilityEnum } from "@/interfaces";
import AmenitiesIcon from "./AmenitiesIcon";
import Tabs, { Tab } from "./Tabs";

interface CreateLocationFormProps {
  title?: string;
  onClose?: () => void;
}

interface RegularHour {
  weekday: number;
  period_begin: string;
  period_end: string;
}

interface OpeningTimes {
  twentyfourseven: boolean;
  regular_hours: RegularHour[];
}

interface FormData {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  opening_times: OpeningTimes;
  facilities: string[];
}

const CreateLocationForm = (props: CreateLocationFormProps) => {
  const { title, onClose } = props;
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
      opening_times: {
        twentyfourseven: false,
        regular_hours: [],
      },
      facilities: [],
    },
  });

  const watchedOpeningTimes = watch("opening_times");
  const watchedFacilities = watch("facilities");
  const watchedAddress = watch([
    "address",
    "city",
    "postalCode",
    "state",
    "country",
    "latitude",
    "longitude",
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
    setValue("postalCode", newAddressData.postalCode);
    setValue("state", newAddressData.state);
    setValue("country", newAddressData.country);
    setValue("latitude", newAddressData.latitude);
    setValue("longitude", newAddressData.longitude);
  };

  const handleToggleChange = (checked: boolean) => {
    setValue("opening_times", {
      twentyfourseven: checked,
      regular_hours: checked ? [] : getValues("opening_times.regular_hours"),
    });
  };

  const handleFacilityToggle = (facility: string) => {
    const currentFacilities = getValues("facilities");
    const isSelected = currentFacilities.includes(facility);

    if (isSelected) {
      setValue(
        "facilities",
        currentFacilities.filter((f) => f !== facility)
      );
    } else {
      setValue("facilities", [...currentFacilities, facility]);
    }
  };

  const addRegularHour = () => {
    const currentHours = getValues("opening_times.regular_hours");
    setValue("opening_times.regular_hours", [
      ...currentHours,
      {
        weekday: 1,
        period_begin: "09:00",
        period_end: "17:00",
      },
    ]);
  };

  const removeRegularHour = (index: number) => {
    const currentHours = getValues("opening_times.regular_hours");
    const newHours = [...currentHours];
    newHours.splice(index, 1);
    setValue("opening_times.regular_hours", newHours);
  };

  const updateRegularHour = (
    index: number,
    field: keyof RegularHour,
    value: string | number
  ) => {
    const currentHours = getValues("opening_times.regular_hours");
    const newHours = [...currentHours];
    newHours[index] = {
      ...newHours[index],
      [field]: value,
    };
    setValue("opening_times.regular_hours", newHours);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const tabsData: Tab[] = [
    {
      label: "Tab 1",
      content: <div>Content for Tab 1</div>,
    },
    {
      label: "Tab 2",
      content: <div>Content for Tab 2</div>,
    },
  ];
  const renderContent = () => {
    return (
      <>
        <div className="uk-height-1-1  uk-overflow-auto">
          <div className="uk-padding-small uk-flex uk-flex-column uk-flex-center">
            {/* Name Field */}
            <div className="uk-margin">
              <label className="uk-form-label uk-text-bold uk-text-large uk-light">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required", maxLength: 255 }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Title of the location"
                    className="uk-input"
                    maxLength={255}
                  />
                )}
              />
            </div>

            {/* Tab Field*/}
            <div className="">
              <Tabs tabs={tabsData} />
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
                  <Controller
                    name="opening_times.twentyfourseven"
                    control={control}
                    render={({ field }) => (
                      <label className="uk-switch">
                        <input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            field.onChange(checked);
                            handleToggleChange(checked);
                          }}
                        />
                        <div className="uk-switch-slider"></div>
                      </label>
                    )}
                  />
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
                          <Controller
                            name={`opening_times.regular_hours.${index}.weekday`}
                            control={control}
                            render={({ field }) => (
                              <select
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  field.onChange(value);
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
                            )}
                          />
                        </div>

                        <div className="uk-width-1-4">
                          <Controller
                            name={`opening_times.regular_hours.${index}.period_begin`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Start (HH:MM)"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  updateRegularHour(
                                    index,
                                    "period_begin",
                                    e.target.value
                                  );
                                }}
                                className="uk-input"
                                maxLength={5}
                              />
                            )}
                          />
                        </div>

                        <div className="uk-width-1-4">
                          <Controller
                            name={`opening_times.regular_hours.${index}.period_end`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="End (HH:MM)"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  updateRegularHour(
                                    index,
                                    "period_end",
                                    e.target.value
                                  );
                                }}
                                className="uk-input"
                                maxLength={5}
                              />
                            )}
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
              <Controller
                name="facilities"
                control={control}
                render={({ field }) => (
                  <div
                    className="uk-child-width-1-4@s uk-child-width-1-2@xs uk-grid-small uk-margin-top"
                    uk-grid=""
                  >
                    {Object.values(FacilityEnum).map((facility) => {
                      const isSelected = watchedFacilities.includes(facility);
                      return (
                        <div key={facility}>
                          <button
                            type="button"
                            onClick={() => handleFacilityToggle(facility)}
                            className={`uk-button uk-width-1-1 uk-text-center uk-padding-small ${
                              isSelected
                                ? "uk-button-primary"
                                : "uk-button-default"
                            }`}
                            style={{ minHeight: "80px" }}
                          >
                            <AmenitiesIcon facility={facility} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Submit Button - Fixed Position */}
          <div className="uk-position-bottom uk-position-z-index uk-padding">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
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

  return (
    <Panel
      isOpen={true}
      showHeader={false}
      headerTitle={title}
      onClose={onClose}
      width="700px"
      height="80vh"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="uk-height-1-1 uk-position-relative"
      >
        {renderContent()}
      </form>
    </Panel>
  );
};

export default CreateLocationForm;
