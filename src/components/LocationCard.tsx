import React from 'react';

interface LocationCardProps {
  name: string;
  address: string;
  isOpen: boolean;
  openHours?: string;
  chargingStations: number;
  amenities: {
    wifi?: boolean;
    restaurant?: boolean;
    restroom?: boolean;
    shopping?: boolean;
  };
}

const LocationCard = (props:LocationCardProps) => {
  const {   name,
  address,
  isOpen,
  openHours,
  chargingStations,
  amenities } = props;

  return (
    <div className="uk-card uk-card-default uk-card-body uk-padding-small" 
         style={{ 
           backgroundColor: '#2c3e50', 
           color: 'white',
           borderRadius: '8px',
           maxWidth: '300px',
          marginBottom:'3px'
         }}>
      
      <div className="uk-margin-small-bottom">
        <h4 className="uk-card-title uk-margin-remove uk-text-bold" 
            style={{ color: 'white', fontSize: '18px' }}>
          {name}
        </h4>
        <p className="uk-text-muted uk-margin-remove uk-text-small">
          {address}
        </p>
      </div>

      <div className="uk-margin-small-bottom">
        <span className={`uk-text-small uk-text-bold ${isOpen ? 'uk-text-success' : 'uk-text-danger'}`}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
        {openHours && (
          <span className="uk-text-muted uk-text-small">
            {' • '}{openHours}
          </span>
        )}
      </div>

      <div className="uk-flex uk-flex-between uk-flex-middle">
        
        <div>
          <div className="uk-text-muted uk-text-small uk-margin-small-bottom">
            Station
          </div>
          <div className="uk-text-small uk-text-bold">
            {chargingStations} Charging Station{chargingStations !== 1 ? 's' : ''}
          </div>
        </div>

        <div>
          <div className="uk-text-muted uk-text-small uk-margin-small-bottom">
            Amenities
          </div>
          <div className="uk-flex uk-flex-middle" style={{ gap: '8px' }}>
            {amenities.wifi && (
            <span>123123</span>
            )}
            {amenities.restaurant && (
              <span uk-icon="icon: bolt; ratio: 0.8" 
                    className="uk-text-muted"></span>
            )}
            {amenities.restroom && (
              <span uk-icon="icon: location; ratio: 0.8" 
                    className="uk-text-muted"></span>
            )}
            {amenities.shopping && (
              <span uk-icon="icon: bag; ratio: 0.8" 
                    className="uk-text-muted"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;


//  const locations = [
//     {
//       name: "VoltHub Sudirman",
//       address: "2118 Thornridge Cir. Syracuse, NY 13202",
//       isOpen: true,
//       openHours: "10:00 - 23:00",
//       chargingStations: 8,
//       amenities: {
//         wifi: true,
//         restaurant: true,
//         restroom: true,
//         shopping: true
//       }
//     },
//     {
//       name: "ElectroCharge Plaza",
//       address: "4517 Washington Ave. Manchester, KY 39495",
//       isOpen: true,
//       openHours: "06:00 - 22:00",
//       chargingStations: 12,
//       amenities: {
//         wifi: true,
//         restaurant: false,
//         restroom: true,
//         shopping: false
//       }
//     },
//     {
//       name: "PowerHub Downtown",
//       address: "3891 Ranchview Dr. Richardson, CA 62639",
//       isOpen: false,
//       openHours: "08:00 - 20:00",
//       chargingStations: 6,
//       amenities: {
//         wifi: false,
//         restaurant: true,
//         restroom: true,
//         shopping: true
//       }
//     },
//       {
//       name: "ElectroCharge Plaza",
//       address: "4517 Washington Ave. Manchester, KY 39495",
//       isOpen: true,
//       openHours: "06:00 - 22:00",
//       chargingStations: 12,
//       amenities: {
//         wifi: true,
//         restaurant: false,
//         restroom: true,
//         shopping: false
//       }
//     },
 
//   ];

    //  {locations.map((location, index) => (
    //       <div key={index}>
    //         <LocationCard
    //           name={location.name}
    //           address={location.address}
    //           isOpen={location.isOpen}
    //           openHours={location.openHours}
    //           chargingStations={location.chargingStations}
    //           amenities={location.amenities}
    //         />
    //       </div>
    //     ))}