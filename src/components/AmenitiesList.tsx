import { FacilityEnum } from "@/interfaces";
import AmenitiesIcon from "./AmenitiesIcon";

interface AmenitiesListProps {
  facilities?: FacilityEnum[];
}

const AmenitiesList = (props: AmenitiesListProps) => {
  const { facilities } = props;

  return (
    <>
      {facilities && facilities.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as React.CSSProperties["flexWrap"],
              gap: "10px",
            }}
          >
            {facilities.map((facility) => (
              <div key={facility}>
                <AmenitiesIcon facility={facility} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AmenitiesList;
