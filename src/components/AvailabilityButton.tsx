interface AvailabilityButtonProps {
  name?: string;
  showFastCharge?: boolean;
  fastChargeCount?: number;
  normalChargeCount?: number;
  onClick?: () => void;
}

const AvailabilityButton = (props: AvailabilityButtonProps) => {
  const { name, showFastCharge, fastChargeCount, normalChargeCount, onClick } =
    props;

  return (
    <>
      <button
        onClick={onClick}
        className="uk-button uk-button-default uk-border-rounded "
        style={{
          padding: "10px",
          width: "100%",
          border: "none",
          backgroundColor: "grey",
          color: "white",
        }}
      >
        <div className="uk-flex uk-flex-between uk-flex-middle">
          <div className="uk-flex uk-flex-between uk-flex-middle ">
            {showFastCharge && <span>"boost"</span>}
            <span>{name}</span>
          </div>
          <div className="uk-flex uk-flex-between uk-flex-middle ">
            {showFastCharge && (
              <div
                className="uk-flex uk-flex-middle uk-flex-center uk-border-circle"
                style={{
                  marginRight: "10px",
                  backgroundColor: "red",
                  width: "30px",
                  height: "30px",
                }}
              >
                <span>{fastChargeCount}</span>
              </div>
            )}
            <div
              className="uk-flex uk-flex-middle uk-flex-center uk-border-circle"
              style={{
                marginRight: "10px",
                backgroundColor: "yellow ",
                width: "30px",
                height: "30px",
              }}
            >
              <span>{normalChargeCount}</span>
            </div>
            <span> "next" </span>
          </div>
        </div>
      </button>
    </>
  );
};

export default AvailabilityButton;
