import React, { useCallback } from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { styles } from "@/styles/(layer 1)/locationStyles";
import EVSEsStatusBox from "@/components/EVSEsStatusBox";
import { StatusEnum } from "@/interfaces";
import AvailabilityButton from "@/components/AvailabilityButton";
import AmenitiesList from "@/components/AmenitiesList";

interface LocationSettingsContentProps {
  drawerId?: string;
  title: string;
  itemDetail: any;
  onClose: () => void;
  onItemClick?: () => void;
  onAvailabilityClick?: () => void;
  onEditLocationClick?: () => void;
  onGalleryClick?: () => void;
  onGetDirectionsClick?: () => void;
}

const Details = (props: LocationSettingsContentProps) => {
  const {
    drawerId = "locationDetail",
    title,
    itemDetail,
    onClose,
    // onItemClick,
    onAvailabilityClick,
    onEditLocationClick,
    onGalleryClick,
    // onGetDirectionsClick,
  } = props;

  const handleEvseClick = (evseUid: string) => {
    console.log("EVSE clicked:", evseUid);
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
      <div style={styles.contentContainer}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transition:
              "opacity 0.4s ease, visibility 0.4s ease, left 0.4s ease",
            overflowY: "auto",
          }}
          className="locations-list"
        >
          <div className="tab-content">
            {/* Image Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
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
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "grey",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                    }}
                  >
                    No image available
                  </div>
                )}
              </div>
              {itemDetail.images && itemDetail.images.length > 0 ? (
                <div
                  style={{
                    position: "absolute" as const,
                    bottom: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#0554f3ff",
                      color: "white",
                      padding: "6px",
                      fontSize: "12px",
                      borderRadius: "7px",
                      border: "none",
                      cursor: "pointer",
                      width: "auto",
                      height: "30px",
                    }}
                    onClick={onGalleryClick}
                  >
                    <span>All Photos</span>
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute" as const,
                    bottom: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "rgb(0, 184, 113)",
                      color: "white",
                      padding: "6px",
                      fontSize: "12px",
                      borderRadius: "7px",
                      border: "none",
                      cursor: "pointer",
                      width: "auto",
                      height: "30px",
                    }}
                    onClick={() => {
                      // galleryPanel.open();
                    }}
                  >
                    {/* <SvgIcon icon={plusOutlineIcon} size="large" />{" "} */}
                  </button>
                </div>
              )}
            </div>

            <div className="uk-padding-small ">
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
                  handleEvseClick(evseUid);
                }}
                getStatusLabel={getStatusLabel}
              />

              {/* Availability Section */}
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "8px",
                  marginTop: "10px",
                }}
              >
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
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "8px",
                  marginTop: "10px",
                }}
              >
                Facilities
              </h3>
              <AmenitiesList facilities={itemDetail.facilities} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
