import { FacilityEnum } from "@/interfaces";

interface AmenitiesIconProps {
  facility: FacilityEnum;
  icon?: string;
  name?: string;
}

const AmenitiesIcon = (props: AmenitiesIconProps) => {
  const { facility, icon: customIcon, name: customName } = props;

  const getFacilityData = (facility: FacilityEnum) => {
    switch (facility) {
      case FacilityEnum.HOTEL:
        return { icon: "🏨", name: "Hotel" };
      case FacilityEnum.RESTAURANT:
        return { icon: "🍽️", name: "Restaurant" };
      case FacilityEnum.CAFE:
        return { icon: "☕", name: "Cafe" };
      case FacilityEnum.MALL:
        return { icon: "🏬", name: "Mall" };
      case FacilityEnum.SUPERMARKET:
        return { icon: "🛒", name: "Supermarket" };
      case FacilityEnum.SPORT:
        return { icon: "⚽", name: "Sport" };
      case FacilityEnum.RECREATION_AREA:
        return { icon: "🎯", name: "Recreation Area" };
      case FacilityEnum.NATURE:
        return { icon: "🌳", name: "Nature" };
      case FacilityEnum.MUSEUM:
        return { icon: "🏛️", name: "Museum" };
      case FacilityEnum.BIKE_SHARING:
        return { icon: "🚲", name: "Bike Sharing" };
      case FacilityEnum.BUS_STOP:
        return { icon: "🚌", name: "Bus Stop" };
      case FacilityEnum.TAXI_STAND:
        return { icon: "🚕", name: "Taxi Stand" };
      case FacilityEnum.TRAM_STOP:
        return { icon: "🚊", name: "Tram Stop" };
      case FacilityEnum.METRO_STATION:
        return { icon: "🚇", name: "Metro Station" };
      case FacilityEnum.TRAIN_STATION:
        return { icon: "🚂", name: "Train Station" };
      case FacilityEnum.AIRPORT:
        return { icon: "✈️", name: "Airport" };
      case FacilityEnum.PARKING_LOT:
        return { icon: "🅿️", name: "Parking Lot" };
      case FacilityEnum.CARPOOL_PARKING:
        return { icon: "🚗", name: "Carpool Parking" };
      case FacilityEnum.FUEL_STATION:
        return { icon: "⛽", name: "Fuel Station" };
      case FacilityEnum.WIFI:
        return { icon: "📶", name: "WiFi" };
      default:
        return { icon: "❓", name: "Unknown" };
    }
  };

  const facilityData = getFacilityData(facility);
  const displayIcon = customIcon || facilityData.icon;
  const displayName = customName || facilityData.name;

  return (
    <>
      <div
        className="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-text-center"
        style={{
          width: "70px",
          height: "70px",
          padding: "10px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "5px",
        }}
      >
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {displayIcon}
        </div>

        <span className="uk-text-small uk-text-bold uk-display-block uk-margin-small-top">
          {displayName}
        </span>
      </div>
    </>
  );
};

export default AmenitiesIcon;
