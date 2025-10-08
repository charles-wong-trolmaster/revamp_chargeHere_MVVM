import React from "react";
import DrawerCloseButton from "../../Common/DrawerCloseButton";
import { useDrawer } from "@/hooks/useDrawer";
import CircularProgress from "@/components/CircularProgress";
import ChargingStatsCard from "@/components/ChargingStatsCard";
import PricingExpander from "@/components/PricingExpander";
import AmChartsLineChart, {
  ChartDataPoint,
} from "@/components/AmChartsLineChart";

interface InfoSection {
  title: string;
  items: string[];
}

interface SessionSettingsContentProps {
  drawerId?: string;
  mode: "Reserving" | "Charging" | "OverStaying";
  data: any;
  onGetDirectionClick: () => void;
  onStartChargingClick: () => void;
  onCancelReservationClick: () => void;
  onStopChargingClick: () => void;
}

const OnGoingResultList = (props: SessionSettingsContentProps) => {
  const {
    mode = "Charging",
    onGetDirectionClick,
    onStartChargingClick,
    onCancelReservationClick,
    onStopChargingClick,
  } = props;
  const { openChild } = useDrawer();

  const importantInformation: InfoSection[] = [
    {
      title: "Arrival & Timing:",
      items: [
        "Please arrive 15 minutes before your reservation time",
        "Reservations will be automatically cancelled if you're more than 15 minutes late",
        "Please remove your vehicle promptly after charging is complete",
      ],
    },
    {
      title: "Charging Fees",
      items: [
        "Standard rate: HK$2.5 per kWh",
        "Fast charging (50kW+): HK$3.2 per kWh",
        "Parking fee: HK$15 per hour (first hour free with charging)",
        "Service fee: HK$5 per session",
      ],
    },
    {
      title: "Penalty & Cancellation",
      items: [
        "Overstay penalty: HK$50 per hour after charging completion",
        "No-show fee: Full reservation amount will be charged",
        "Free cancellation: Up to 2 hours before reservation",
        "Late cancellation (within 2 hours): 50% cancellation fee",
        "Booking modification: HK$10 per change",
      ],
    },
    {
      title: "Payment & Refunds",
      items: [
        "Payment will be processed automatically after charging",
        "Refunds for valid cancellations: 3-5 business days",
        "Disputes must be reported within 24 hours",
      ],
    },
  ];

  const dummyData = {
    chargePointStation: "Slot A01-01",
    address: "32 W 4th St, New York, NY 10012, USA",
    invoiceNumber: "ID#135675323",
    dateAndTime: "5 Feb 25, 9:41 am",
    plugType: "Charge Here",
    duration: "2Hours",
    stationName: "ChargePoint Station Torrance",
    carModel: "Tesla Model X",
    id: "13571287",
  };

  const feeDataDummy = [
    {
      name: "Reservation Fees",

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
            "Range: 0-60 minutes",
            "VAT: 21% included",
          ],
        },
        {
          name: "Blocking Penalty",
          price: "€0.10/min",
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
  ];

  const temperatureData: ChartDataPoint[] = [
    { date: "2024-01-01 00:00:00", value: 22.5 },
    { date: "2024-01-01 01:00:00", value: 21.8 },
    { date: "2024-01-01 02:00:00", value: 21.2 },
    { date: "2024-01-01 03:00:00", value: 20.9 },
    { date: "2024-01-01 04:00:00", value: 20.1 },
    { date: "2024-01-01 05:00:00", value: 19.8 },
    { date: "2024-01-01 06:00:00", value: 20.2 },
    { date: "2024-01-01 07:00:00", value: 21.5 },
    { date: "2024-01-01 08:00:00", value: 23.1 },
    { date: "2024-01-01 09:00:00", value: 25.3 },
    { date: "2024-01-01 10:00:00", value: 27.8 },
    { date: "2024-01-01 11:00:00", value: 29.2 },
    { date: "2024-01-01 12:00:00", value: 31.1 },
    { date: "2024-01-01 13:00:00", value: 32.5 },
    { date: "2024-01-01 14:00:00", value: 33.2 },
    { date: "2024-01-01 15:00:00", value: 32.8 },
    { date: "2024-01-01 16:00:00", value: 31.5 },
    { date: "2024-01-01 17:00:00", value: 29.7 },
    { date: "2024-01-01 18:00:00", value: 27.9 },
    { date: "2024-01-01 19:00:00", value: 26.2 },
    { date: "2024-01-01 20:00:00", value: 24.8 },
    { date: "2024-01-01 21:00:00", value: 23.5 },
    { date: "2024-01-01 22:00:00", value: 22.9 },
    { date: "2024-01-01 23:00:00", value: 22.3 },
  ];

  // Charging stats data
  const chargingStats = {
    remainingTime: "54:55",
    totalCost: "$15.12",
    remainingTimeSubtext: "Remaining time for a full charge",
    totalCostSubtext: "Total cost accrued for this charge",
  };

  const renderDetailsSection = () => (
    <div className="uk-padding-small">
      <div className="uk-flex">
        <div className="uk-width-3-4">
          <div>ChargePoint Station</div>
          <div>{dummyData.address}</div>
        </div>
        <div className="uk-width-1-4 uk-flex uk-flex-right">
          {dummyData.chargePointStation}
        </div>
      </div>

      <div className="uk-flex">
        <div className="uk-width-1-2">Invoice Number</div>
        <div className="uk-width-1-2 uk-flex uk-flex-right">
          {dummyData.invoiceNumber}
        </div>
      </div>

      <div className="uk-flex">
        <div className="uk-width-1-2">Date & Time</div>
        <div className="uk-width-1-2 uk-flex uk-flex-right">
          {dummyData.dateAndTime}
        </div>
      </div>

      <div className="uk-flex">
        <div className="uk-width-1-2">Plug Type</div>
        <div className="uk-width-1-2 uk-flex uk-flex-right">
          {dummyData.plugType}
        </div>
      </div>

      <div className="uk-flex">
        <div className="uk-width-1-2">Duration</div>
        <div className="uk-width-1-2 uk-flex uk-flex-right">
          {dummyData.duration}
        </div>
      </div>
    </div>
  );

  const renderImportantInformation = () => (
    <div>
      <span>Important Information</span>
      {importantInformation.map((section, sectionIndex) => (
        <div key={sectionIndex} className="info-section">
          <span>{section.title}</span>
          <ul>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderProgressAndStatus = () => {
    switch (mode) {
      case "Reserving":
        return (
          <>
            <span className="mb-2">Reserving</span>
            <span>{dummyData.carModel}</span>
            <span>{dummyData.stationName}</span>
            <span>ID#{dummyData.id}</span>
            <CircularProgress mode="time" value={5400} />

            {renderDetailsSection()}
            {renderImportantInformation()}

            <button onClick={() => onGetDirectionClick()}>
              <span>Get Direction</span>
            </button>
            <button onClick={() => onStartChargingClick()}>
              <span>Start Charging</span>
            </button>
            <button onClick={() => onCancelReservationClick()}>
              <span>Cancel Reservation</span>
            </button>
          </>
        );

      case "Charging":
        return (
          <>
            <span className="mb-2">Charging</span>
            <span>{dummyData.carModel}</span>
            <span>{dummyData.stationName}</span>
            <span>ID#{dummyData.id}</span>
            {/* Battery/Power (green) */}
            <CircularProgress mode="power" value={99} secondaryText="125 kW" />

            <span>Your car is being charged</span>

            <div className="uk-flex uk-grid-small uk-margin-medium">
              <div className="uk-width-1-2">
                <ChargingStatsCard
                  type="time"
                  value={chargingStats.remainingTime}
                  subtext={chargingStats.remainingTimeSubtext}
                />
              </div>
              <div className="uk-width-1-2">
                <ChargingStatsCard
                  type="cost"
                  value={chargingStats.totalCost}
                  subtext={chargingStats.totalCostSubtext}
                />
              </div>
            </div>

            <span>
              You can stop charging from app or by disconnecting charge head
              from your vehicle.
            </span>
            <span className="uk-text-meta">Electricity generated by solar</span>
            <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
              <div className="uk-flex uk-flex-middle uk-grid-small" uk-grid>
                <span className="uk-text-bold uk-text-emphasis">140.65KWh</span>
                <span className="uk-text-success uk-text-small">• Live</span>
              </div>
            </div>

            {/* Chart */}
            <AmChartsLineChart
              data={temperatureData}
              enableScrollbar={false}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              timeUnit="hour"
              yAxisUnit="KWh"
              tooltipDateFormat="MMM dd, HH:mm"
            />

            <button onClick={() => onStopChargingClick()}>
              <span>Stop Charging</span>
            </button>
          </>
        );

      case "OverStaying":
        return (
          <>
            <span className="mb-2">Over Staying</span>
            <span>{dummyData.carModel}</span>
            <span>{dummyData.stationName}</span>
            <span>ID#{dummyData.id}</span>
            {/* Overstay timer */}
            <CircularProgress mode="time" value={3600} />

            <div className="uk-flex uk-grid-small uk-margin-medium">
              <div className="uk-width-1-2">
                <ChargingStatsCard
                  type="time"
                  value={chargingStats.remainingTime}
                  subtext={chargingStats.remainingTimeSubtext}
                />
              </div>
              <div className="uk-width-1-2">
                <ChargingStatsCard
                  type="cost"
                  value={chargingStats.totalCost}
                  subtext={chargingStats.totalCostSubtext}
                />
              </div>
            </div>
            <span>
              You can stop charging from app or by disconnecting charge head
              from your vehicle.
            </span>

            <PricingExpander fee={feeDataDummy} showHeader={false} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DrawerCloseButton />
      <h3>On Going</h3>

      <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle  ">
        {renderProgressAndStatus()}
      </div>

      <button onClick={() => openChild("onGoingDetail")}>
        On Going Detail
      </button>
    </>
  );
};

export default OnGoingResultList;
