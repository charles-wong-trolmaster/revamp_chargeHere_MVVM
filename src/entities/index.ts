// index.ts

// Enums from RateFee.ts
export { RateType, TierMode } from "./fees/abstract/RateFee";
// DayOfWeekEnum comes from external package
export { DayOfWeekEnum } from "../interfaces/ocpi-2.2.1-d2";

// Base classes and interfaces
export { Category } from "./categories/abstract/Category";
export { Tier, type ITier } from "./tiers/abstract/Tier";

// Tier classes and interfaces
export { EnergyTier, type IEnergyTier } from "./tiers/EnergyTier";
export { TimeTier, type ITimeTier } from "./tiers/TimeTier";

// Fee classes and interfaces
export {
  Fee,
  type IFee,
  type ITemporalRestrictions,
} from "./fees/abstract/Fee";
export { RateFee, type IRateFee } from "./fees/abstract/RateFee";
export { EnergyRateFee, type IEnergyRateFee } from "./fees/EnergyRateFee";
export { PenaltyFee, type IPenaltyFee } from "./fees/PenaltyFee";
export {
  PenaltyFeeWithGracePeriod,
  type IPenaltyFeeWithGracePeriod,
} from "./fees/PenaltyFeeWithGracePeriod";
export { ServiceFee, type IServiceFee } from "./fees/ServiceFee";
export { StartupFee, type IStartupFee } from "./fees/StartupFee";
export { TimeRateFee, type ITimeRateFee } from "./fees/TimeRateFee";
export {
  TimeRateFeeWithGracePeriod,
  type ITimeRateFeeWithGracePeriod,
} from "./fees/TimeRateFeeWithGracePeriod";

// Category classes and interfaces
export {
  EnergyCategory,
  type IEnergyCategory,
} from "./categories/EnergyCategory";
export {
  OverstayCategory,
  type IOverstayCategory,
} from "./categories/OverstayCategory";
export {
  ReservationCategory,
  type IReservationCategory,
} from "./categories/ReservationCategory";
export { TimeCategory, type ITimeCategory } from "./categories/TimeCategory";

// Scheme class and interface
export { Scheme, type IScheme } from "./Scheme";

// Tariff class and interface
export { Tariff, type ITariff } from "./Tariff";
