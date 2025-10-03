import React, { useCallback } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import EVSEsStatusBox from "@/components/EVSEsStatusBox";
import { StatusEnum } from "@/interfaces";
import AvailabilityButton from "@/components/AvailabilityButton";
import AmenitiesList from "@/components/AmenitiesList";
import TariffTypesExpander from "@/components/TariffTypesExpander";
import PricingExpandedContent from "@/components/PricingExpander";

interface LocationSettingsContentProps {
  itemDetail: any;
  onClose: () => void;
  onAvailabilityClick?: () => void;
  onEditLocationClick?: () => void;
  onGalleryClick?: () => void;
  onGetDirectionsClick?: () => void;
  onEvseClick?: (evseUid: string, itemDetail: any) => void;
}

const Details = (props: LocationSettingsContentProps) => {
  const {
    itemDetail,
    onClose,
    onAvailabilityClick,
    onEditLocationClick,
    onGalleryClick,
    onEvseClick,
    onGetDirectionsClick,
  } = props;

  const RateTypesDefinition = [
    {
      title: "Locked Pricing",
      badge: {
        text: "Locked",
        variant: "locked",
      },
      description:
        "Rate is fixed at the start of your charging session. Even if tariff changes during charging, you pay the original price throughout the entire session.",
      example:
        "Start charging at €0.30/kWh → Rate changes to €0.45/kWh mid-session → You still pay €0.30/kWh for entire session",
    },
    {
      title: "Dynamic Pricing",
      badge: {
        text: "Dynamic",
        variant: "dynamic",
      },
      description:
        "Rate can change during your session based on time-of-use, demand, or market conditions. This can result in lower or higher costs depending on timing.",
      example:
        "Start charging at €0.30/kWh → Rate changes to €0.45/kWh mid-session → You pay €0.30/kWh for first part, €0.45/kWh for second part",
    },
  ];
  const PricingDummy = [
    {
      name: "Premium Business - Mixed Pricing",
      validStart: "2025-01-01",
      validEnd: "2025-06-30",
      activeHours: "06:00 - 22:00",
      validDays: ["Mon, Tue, Wed, Thu, Fri, Sat, Sun"],
      fee: [
        {
          name: "Reservation Fees",
          originFee: {
            name: "Reservation Service Fee",
            price: "€3.50",
          },
          type: [
            {
              name: "Kept Reservations",
              price: "€0.05/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-15 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Rate Fees",
              price: "€0.10/min",
              badge: {
                text: "Dynamic",
                variant: "dynamic",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "No-Show Rate Fees",
              price: "€0.25/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Penalty",
              price: "€7.50",
              badge: {
                text: "Fixed",
                variant: "fixed",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
          ],
        },
        {
          name: "Energy Pricing",
          originFee: {
            name: "Connection Fee",
            price: "€2.50",
          },
          type: [
            {
              name: "Kept Reservations",
              price: "€0.05/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-15 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Rate Fees",
              price: "€0.10/min",
              badge: {
                text: "Dynamic",
                variant: "dynamic",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "No-Show Rate Fees",
              price: "€0.25/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Penalty",
              price: "€7.50",
              badge: {
                text: "Fixed",
                variant: "fixed",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
          ],
        },
        {
          name: "Overstay Penalties",
          type: [
            {
              name: "First 60 minutes",
              price: "€0.75/min",
              badge: {
                text: "Dynamic",
                variant: "dynamic",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-15 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Blocking Penalty",
              price: "€50.00",
              badge: {
                text: "Fixed",
                variant: "fixed",
              },
              description: [
                "One-time penalty for extended overstay",
                "Applied after 180 minutes",
                "Vehicle may be towed at owner's expense",
                "VAT: 21% included",
              ],
              remark: "Grace Period : 10 minutes free after charging completes",
            },
          ],
        },
        {
          name: "Time-Based Pricing",
          feeBadge: {
            text: "Disabled",
            variant: "disabled",
            description:
              "Disabled : Time-Based Pricing is not available in this scheme.",
          },
        },
      ],
    },

    {
      name: "Standard Economy - Locked Rates",
      validStart: "2025-01-01",
      validEnd: "2025-06-30",
      activeHours: "24/7 - All day, every day",
      validDays: ["Mon, Tue, Wed, Thu, Fri, Sat, Sun"],
      fee: [
        {
          name: "Reservation Fees",
          originFee: {
            name: "Reservation Service Fee",
            price: "€3.50",
          },
          type: [
            {
              name: "Kept Reservations",
              price: "€0.05/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-15 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Rate Fees",
              price: "€0.10/min",
              badge: {
                text: "Dynamic",
                variant: "dynamic",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "No-Show Rate Fees",
              price: "€0.25/min",
              badge: {
                text: "Locked",
                variant: "locked",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
            {
              name: "Cancellation Penalty",
              price: "€7.50",
              badge: {
                text: "Fixed",
                variant: "fixed",
              },
              description: [
                "Step size: 1 minute increments",
                "Range: 0-120 minutes",
                "VAT: 21% included",
              ],
            },
          ],
        },

        {
          name: "Time-Based Pricing",
          feeBadge: {
            text: "Disabled",
            variant: "disabled",
            description:
              "Disabled : Time-Based Pricing is not available in this scheme.",
          },
        },
      ],
    },
  ];

  const handleEvseClick = (evseUid: string, itemDetail: any) => {
    if (onEvseClick) {
      onEvseClick(evseUid, itemDetail);
    }
  };
  const getStatusLabel = useCallback((status: StatusEnum): string => {
    switch (status) {
      case "AVAILABLE":
        return "Available";
      case "CHARGING":
      case "RESERVED":
      case "PLANNED":
        return "Unavailable";
      default:
        return "Error";
    }
  }, []);

  if (!itemDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DrawerCloseButton />
      <h3>Location Detail</h3>
      <div className="uk-overflow-auto">
        <div className="">
          {/* Image Section */}
          <div className="uk-flex uk-flex-center uk-flex-middle uk-overflow-hidden uk-position-relative">
            <div className="uk-width-1-1 uk-height-medium uk-overflow-hidden">
              {itemDetail.images && itemDetail.images.length > 0 ? (
                // <img
                //   src={itemDetail.images[0].url}
                //   alt=""
                //   style={{
                //     width: "100%",
                //     height: "100%",
                //   }}
                // />
                <span>Image??</span>
              ) : (
                <div className="uk-width-1-1 uk-height-medium uk-background-muted uk-flex uk-flex-center uk-flex-middle uk-text-muted">
                  No image available
                </div>
              )}
            </div>
            {itemDetail.images && itemDetail.images.length > 0 ? (
              <div className="uk-position-bottom-right uk-position-z-index uk-margin-small">
                <button
                  className="uk-button uk-button-primary uk-button-small uk-border-rounded"
                  onClick={onGalleryClick}
                >
                  <span>All Photos</span>
                </button>
              </div>
            ) : (
              <div className="uk-position-bottom-right uk-position-z-index uk-margin-small">
                <button
                  className="uk-button uk-button-secondary uk-button-small uk-border-rounded"
                  onClick={() => {
                    // galleryPanel.open();
                  }}
                >
                  {/* <SvgIcon icon={plusOutlineIcon} size="large" />{" "} */}
                </button>
              </div>
            )}
          </div>

          <div className="uk-padding-small">
            {/* Header Section */}
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <span>{itemDetail.name}</span>
              <button onClick={onEditLocationClick}>{"Edit"}</button>
            </div>
            <div>
              <span>{itemDetail.address || "No address available"}</span>
            </div>

            {/* Detail Section */}
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <span>Open ・10:00 - 23:00</span>
              <button
                onClick={() => {
                  // editLocationFormPanel.open();
                }}
              >
                {"call"}
              </button>
            </div>

            <EVSEsStatusBox
              locationDetail={itemDetail}
              onEvseClick={(evseUid) => {
                handleEvseClick(evseUid, itemDetail);
              }}
              getStatusLabel={getStatusLabel}
            />

            {/* Availability Section */}
            <h3 className="uk-text-small uk-text-bold uk-text-light uk-margin-small-bottom uk-margin-top">
              Availability
            </h3>
            <AvailabilityButton
              name={itemDetail.availabilityStatus || "Unknown"}
              showFastCharge={itemDetail.hasFastCharge || false}
              fastChargeCount={itemDetail.fastChargeCount || 0}
              normalChargeCount={itemDetail.normalChargeCount || 0}
              onClick={onAvailabilityClick}
            />

            {/* Amenities Section */}
            <span className="uk-text-small uk-text-bold uk-text-default uk-margin-small-bottom uk-margin-top">
              Facilities
            </span>
            <AmenitiesList facilities={itemDetail.facilities} />

            {/* Tariff Section */}
            <span className="uk-text-small uk-text-bold uk-text-default uk-margin-small-bottom uk-margin-top">
              Tariff
            </span>

            {/* Understanding Rate Types */}
            <div className="uk-padding-small uk-background-muted uk-border-rounded uk-border">
              <p className="uk-border">Understanding Rate Types</p>
              <p className="uk-border">
                How "Locked" and "Dynamic" pricing affects your charging costs
              </p>

              {RateTypesDefinition.map((rateType) => (
                <TariffTypesExpander
                  key={rateType.title}
                  title={rateType.title}
                  badge={rateType.badge}
                  description={rateType.description}
                  example={rateType.example}
                  isExpanded={true}
                  onToggle={() => {
                    console.log("Toggle clicked for", rateType.title);
                  }}
                />
              ))}
              {PricingDummy.length > 0 &&
                PricingDummy.map((pricing, index) => (
                  <PricingExpandedContent
                    key={index}
                    name={pricing.name}
                    validStart={pricing.validStart}
                    validEnd={pricing.validEnd}
                    activeHours={pricing.activeHours}
                    validDays={pricing.validDays}
                    fee={pricing.fee}
                  />
                ))}
            </div>

            {/* Get Directions Button - Added at the bottom */}
            <div className="uk-margin-top uk-margin-bottom">
              <button
                className="uk-button uk-button-primary uk-width-1-1 uk-border-rounded"
                onClick={onGetDirectionsClick}
              >
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
