/**
 * @author Manta LI <manta1220@gmail.com>
 * @version 0.9.0
 *
 * @todo
 * - Implement data types
 */

/**********************  Common **********************/
export type DisplayText = {
  text: string512;
  language: string2;
};

export type Price = {
  excl_vat: number;
  incl_vat?: number;
};

export enum RoleEnum {
  CPO = "CPO",
  EMSP = "EMSP",
  HUB = "HUB",
  NAP = "NAP",
  NSP = "NSP",
  OTHER = "OTHER",
  SCSP = "SCSP",
}

/**********************  Versions **********************/
export type Version = {
  version: VersionNumberEnum;
  url: URL;
};

export type VersionDetails = {
  version: VersionNumberEnum;
  endpoints: NonEmptyArray<Endpoint>;
};

export type Endpoint = {
  identifier: ModuleIDEnum;
  role: InterfaceRoleEnum;
  url: URL;
};

export enum InterfaceRoleEnum {
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export enum ModuleIDEnum {
  CDRS = "cdrs",
  CHARGING_PROFILES = "chargingprofiles",
  COMMANDS = "commands",
  CREDENTIALS = "credentials",
  HUB_CLIENT_INFO = "hubclientinfo",
  LOCATIONS = "locations",
  SESSIONS = "sessions",
  TARIFFS = "tariffs",
  TOKENS = "tokens",
}

export enum VersionNumberEnum {
  v2_2_1 = "2.2.1",
  v2_1_1 = "2.1.1",
  v2_0 = "2.0",
}

/**********************  Credentials **********************/
export type Credentials = {
  token: string64;
  url: URL;
  roles: NonEmptyArray<CredentialsRole>;
};

export type CredentialsRole = {
  role: RoleEnum;
  business_details: BusinessDetails;
  party_id: CiString3;
  country_code: CiString2;
};

/**********************  Locations **********************/
export type Location = {
  country_code: CiString2;
  party_id: CiString3;
  id: CiString36;
  publish: boolean;
  publish_allowed_to?: NullableEmptyArray<PublishTokenType>;
  name?: string255;
  address: string45;
  city: string45;
  postal_code?: string10;
  state?: string20;
  country: string3;
  coordinates: GeoLocation;
  related_locations?: NullableEmptyArray<AdditionalGeoLocation>;
  parking_type?: ParkingTypeEnum;
  evses?: NullableEmptyArray<EVSE>;
  directions?: NullableEmptyArray<DisplayText>;
  operator?: BusinessDetails;
  suboperator?: BusinessDetails;
  owner?: BusinessDetails;
  facilities?: NullableEmptyArray<FacilityEnum>;
  time_zone: string255;
  opening_times?: Hours;
  charging_when_closed?: boolean;
  images?: NullableEmptyArray<Image>;
  energy_mix?: EnergyMix;
  last_updated: DateTime;
};

export type EVSE = {
  uid: CiString36;
  evse_id?: CiString48;
  status: StatusEnum;
  status_schedule?: NullableEmptyArray<StatusSchedule>;
  capabilities?: NullableEmptyArray<CapabilityEnum>;
  connectors: NonEmptyArray<Connector>;
  floor_level?: string4;
  coordinates?: GeoLocation;
  physical_reference?: string16;
  directions?: NullableEmptyArray<DisplayText>;
  parking_restrictions?: NullableEmptyArray<ParkingRestrictionEnum>;
  images?: NullableEmptyArray<Image>;
  last_updated: DateTime;
};

export type Connector = {
  id: CiString36;
  standard: ConnectorTypeEnum;
  format: ConnectorFormatEnum;
  power_type: PowerTypeEnum;
  max_voltage: int;
  max_amperage: int;
  max_electric_power?: int;
  tariff_ids?: NullableEmptyArray<CiString36>;
  terms_and_conditions?: URL;
  last_updated: DateTime;
};

export type AdditionalGeoLocation = {
  latitude: Latitude;
  longitude: Longitude;
  name?: DisplayText;
};

export type BusinessDetails = {
  name: string100;
  website?: URL;
  logo?: Image;
};

export enum CapabilityEnum {
  CHARGING_PROFILE_CAPABLE = "CHARGING_PROFILE_CAPABLE",
  CHARGING_PREFERENCES_CAPABLE = "CHARGING_PREFERENCES_CAPABLE",
  CHIP_CARD_SUPPORT = "CHIP_CARD_SUPPORT",
  CONTACTLESS_CARD_SUPPORT = "CONTACTLESS_CARD_SUPPORT",
  CREDIT_CARD_PAYABLE = "CREDIT_CARD_PAYABLE",
  DEBIT_CARD_PAYABLE = "DEBIT_CARD_PAYABLE",
  PED_TERMINAL = "PED_TERMINAL",
  REMOTE_START_STOP_CAPABLE = "REMOTE_START_STOP_CAPABLE",
  RESERVABLE = "RESERVABLE",
  RFID_READER = "RFID_READER",
  START_SESSION_CONNECTOR_REQUIRED = "START_SESSION_CONNECTOR_REQUIRED",
  TOKEN_GROUP_CAPABLE = "TOKEN_GROUP_CAPABLE",
  UNLOCK_CAPABLE = "UNLOCK_CAPABLE",
}

export enum ConnectorFormatEnum {
  SOCKET = "SOCKET",
  CABLE = "CABLE",
}

export enum ConnectorTypeEnum {
  CHADEMO = "CHADEMO",
  CHAOJI = "CHAOJI",
  DOMESTIC_A = "DOMESTIC_A",
  DOMESTIC_B = "DOMESTIC_B",
  DOMESTIC_C = "DOMESTIC_C",
  DOMESTIC_D = "DOMESTIC_D",
  DOMESTIC_E = "DOMESTIC_E",
  DOMESTIC_F = "DOMESTIC_F",
  DOMESTIC_G = "DOMESTIC_G",
  DOMESTIC_H = "DOMESTIC_H",
  DOMESTIC_I = "DOMESTIC_I",
  DOMESTIC_J = "DOMESTIC_J",
  DOMESTIC_K = "DOMESTIC_K",
  DOMESTIC_L = "DOMESTIC_L",
  DOMESTIC_M = "DOMESTIC_M",
  DOMESTIC_N = "DOMESTIC_N",
  DOMESTIC_O = "DOMESTIC_O",
  GBT_AC = "GBT_AC",
  GBT_DC = "GBT_DC",
  IEC_60309_2_SINGLE_16 = "IEC_60309_2_single_16",
  IEC_60309_2_THREE_16 = "IEC_60309_2_three_16",
  IEC_60309_2_THREE_32 = "IEC_60309_2_three_32",
  IEC_60309_2_THREE_64 = "IEC_60309_2_three_64",
  IEC_62196_T1 = "IEC_62196_T1",
  IEC_62196_T1_COMBO = "IEC_62196_T1_COMBO",
  IEC_62196_T2 = "IEC_62196_T2",
  IEC_62196_T2_COMBO = "IEC_62196_T2_COMBO",
  IEC_62196_T3A = "IEC_62196_T3A",
  IEC_62196_T3C = "IEC_62196_T3C",
  NEMA_5_20 = "NEMA_5_20",
  NEMA_6_30 = "NEMA_6_30",
  NEMA_6_50 = "NEMA_6_50",
  NEMA_10_30 = "NEMA_10_30",
  NEMA_10_50 = "NEMA_10_50",
  NEMA_14_30 = "NEMA_14_30",
  NEMA_14_50 = "NEMA_14_50",
  PANTOGRAPH_BOTTOM_UP = "PANTOGRAPH_BOTTOM_UP",
  PANTOGRAPH_TOP_DOWN = "PANTOGRAPH_TOP_DOWN",
  TESLA_R = "TESLA_R",
  TESLA_S = "TESLA_S",
}

export type EnergyMix = {
  is_green_energy: boolean;
  energy_sources?: NullableEmptyArray<EnergySource>;
  environ_impact?: NullableEmptyArray<EnvironmentalImpact>;
  supplier_name?: string64;
  energy_product_name?: string64;
};

export type EnergySource = {
  source: EnergySourceCategoryEnum;
  percentage: number;
};

export enum EnergySourceCategoryEnum {
  NUCLEAR = "NUCLEAR",
  GENERAL_FOSSIL = "GENERAL_FOSSIL",
  COAL = "COAL",
  GAS = "GAS",
  GENERAL_GREEN = "GENERAL_GREEN",
  SOLAR = "SOLAR",
  WIND = "WIND",
  WATER = "WATER",
}

export type EnvironmentalImpact = {
  category: EnvironmentalImpactCategoryEnum;
  amount: number;
};

export enum EnvironmentalImpactCategoryEnum {
  NUCLEAR_WASTE = "NUCLEAR_WASTE",
  CARBON_DIOXIDE = "CARBON_DIOXIDE",
}

export type ExceptionalPeriod = {
  period_begin: DateTime;
  period_end: DateTime;
};

export enum FacilityEnum {
  HOTEL = "HOTEL",
  RESTAURANT = "RESTAURANT",
  CAFE = "CAFE",
  MALL = "MALL",
  SUPERMARKET = "SUPERMARKET",
  SPORT = "SPORT",
  RECREATION_AREA = "RECREATION_AREA",
  NATURE = "NATURE",
  MUSEUM = "MUSEUM",
  BIKE_SHARING = "BIKE_SHARING",
  BUS_STOP = "BUS_STOP",
  TAXI_STAND = "TAXI_STAND",
  TRAM_STOP = "TRAM_STOP",
  METRO_STATION = "METRO_STATION",
  TRAIN_STATION = "TRAIN_STATION",
  AIRPORT = "AIRPORT",
  PARKING_LOT = "PARKING_LOT",
  CARPOOL_PARKING = "CARPOOL_PARKING",
  FUEL_STATION = "FUEL_STATION",
  WIFI = "WIFI",
}

export type GeoLocation = {
  latitude: Latitude;
  longitude: Longitude;
};

export type Hours = {
  twentyfourseven: boolean;
  regular_hours?: NullableEmptyArray<RegularHours>;
  exceptional_openings?: NullableEmptyArray<ExceptionalPeriod>;
  exceptional_closings?: NullableEmptyArray<ExceptionalPeriod>;
};

export type Image = {
  url: URL;
  thumbnail?: URL;
  category: ImageCategoryEnum;
  type: BrowserRenderableImageType;
  width?: int5;
  height?: int5;
};

export enum ImageCategoryEnum {
  CHARGER = "CHARGER",
  ENTRANCE = "ENTRANCE",
  LOCATION = "LOCATION",
  NETWORK = "NETWORK",
  OPERATOR = "OPERATOR",
  OTHER = "OTHER",
  OWNER = "OWNER",
}

export enum ParkingRestrictionEnum {
  EV_ONLY = "EV_ONLY",
  PLUGGED = "PLUGGED",
  DISABLED = "DISABLED",
  CUSTOMERS = "CUSTOMERS",
  MOTORCYCLES = "MOTORCYCLES",
}

export enum ParkingTypeEnum {
  ALONG_MOTORWAY = "ALONG_MOTORWAY",
  PARKING_GARAGE = "PARKING_GARAGE",
  PARKING_LOT = "PARKING_LOT",
  ON_DRIVEWAY = "ON_DRIVEWAY",
  ON_STREET = "ON_STREET",
  UNDERGROUND_GARAGE = "UNDERGROUND_GARAGE",
}

export enum PowerTypeEnum {
  AC_1_PHASE = "AC_1_PHASE",
  AC_2_PHASE = "AC_2_PHASE",
  AC_2_PHASE_SPLIT = "AC_2_PHASE_SPLIT",
  AC_3_PHASE = "AC_3_PHASE",
  DC = "DC",
}

// Helper types
type BaseToken = {
  group_id?: CiString36;
};

type TokenWithUID = BaseToken & {
  uid: CiString36;
  type: TokenTypeEnum;
  visual_number?: string64;
  issuer?: string64;
};

type TokenWithVisualNumber = BaseToken & {
  uid?: CiString36;
  type?: TokenTypeEnum;
  visual_number: string64;
  issuer: string64;
};

type TokenWithoutUIDOrVisualNumber = BaseToken & {
  uid?: CiString36;
  type?: TokenTypeEnum;
  visual_number?: string64;
  issuer?: string64;
};

export type PublishTokenType =
  | TokenWithUID
  | TokenWithVisualNumber
  | TokenWithoutUIDOrVisualNumber;

export type RegularHours = {
  weekday: int1;
  period_begin: HourMinute;
  period_end: HourMinute;
};

export enum StatusEnum {
  AVAILABLE = "AVAILABLE",
  BLOCKED = "BLOCKED",
  CHARGING = "CHARGING",
  INOPERATIVE = "INOPERATIVE",
  OUTOFORDER = "OUTOFORDER",
  PLANNED = "PLANNED",
  REMOVED = "REMOVED",
  RESERVED = "RESERVED",
  UNKNOWN = "UNKNOWN",
}

export type StatusSchedule = {
  period_begin: DateTime;
  period_end?: DateTime;
  status: StatusEnum;
};

/**********************  Sessions **********************/
export type Session = {
  country_code: CiString2;
  party_id: CiString3;
  id: CiString36;
  start_date_time: DateTime;
  end_date_time?: DateTime;
  kwh: number;
  cdr_token: CdrToken;
  auth_method: AuthMethodEnum;
  authorization_reference?: CiString36;
  location_id: CiString36;
  evse_uid: CiString36;
  connector_id: CiString36;
  meter_id?: string255;
  currency: string3;
  charging_periods?: NullableEmptyArray<ChargingPeriod>;
  total_cost?: Price;
  status: SessionStatusEnum;
  last_updated: DateTime;
};

export type ChargingPreferences = {
  profile_type: ProfileTypeEnum;
  departure_time?: DateTime;
  energy_need?: number;
  discharge_allowed?: boolean;
};

export enum ChargingPreferencesResponseEnum {
  ACCEPTED = "ACCEPTED",
  DEPARTURE_REQUIRED = "DEPARTURE_REQUIRED",
  ENERGY_NEED_REQUIRED = "ENERGY_NEED_REQUIRED",
  NOT_POSSIBLE = "NOT_POSSIBLE",
  PROFILE_TYPE_NOT_SUPPORTED = "PROFILE_TYPE_NOT_SUPPORTED",
}

export enum ProfileTypeEnum {
  CHEAP = "CHEAP",
  FAST = "FAST",
  GREEN = "GREEN",
  REGULAR = "REGULAR",
}

export enum SessionStatusEnum {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  INVALID = "INVALID",
  PENDING = "PENDING",
  RESERVATION = "RESERVATION",
}

/**********************  CDRs **********************/
export type CDR = {
  country_code: CiString2;
  party_id: CiString3;
  id: CiString39;
  start_date_time: DateTime;
  end_date_time: DateTime;
  session_id?: Session["id"];
  cdr_token: CdrToken;
  auth_method: AuthMethodEnum;
  authorization_reference?: CiString36;
  cdr_location: CdrLocation;
  meter_id?: string255;
  currency: string3;
  tariffs?: NullableEmptyArray<Tariff>;
  charging_periods: NonEmptyArray<ChargingPeriod>;
  signed_data?: SignedData;
  total_cost: Price;
  total_fixed_cost?: Price;
  total_energy: number;
  total_energy_cost?: Price;
  total_time: number;
  total_time_cost?: Price;
  total_parking_time?: number;
  total_parking_cost?: Price;
  total_reservation_cost?: Price;
  remark?: string255;
  invoice_reference_id?: CiString39;
  credit?: boolean;
  credit_reference_id?: CiString39;
  home_charging_compensation?: boolean;
  last_updated: DateTime;
};

export enum AuthMethodEnum {
  AUTH_REQUEST = "AUTH_REQUEST",
  COMMAND = "COMMAND",
  WHITELIST = "WHITELIST",
}

export type CdrDimension = {
  type: CdrDimensionTypeEnum;
  volume: number;
};

export enum CdrDimensionTypeEnum {
  // Current-related measurements (in Amperes)
  CURRENT = "CURRENT", // (Session Only) Average charging current during this ChargingPeriod: defined in A (Ampere). When negative, the current is flowing from the EV to the grid.
  MAX_CURRENT = "MAX_CURRENT", // Maximum current reached during charging
  MIN_CURRENT = "MIN_CURRENT", // Minimum current reached during charging

  // Energy measurements (in kWh)
  ENERGY = "ENERGY", // Total amount of energy (dis-)charged during this ChargingPeriod: defined in kWh. When	negative, more energy was feed into the grid then charged into the EV. Default step_size is	1.
  ENERGY_EXPORT = "ENERGY_EXPORT", // (Session Only) Total amount of energy feed back into the grid: defined in kWh.
  ENERGY_IMPORT = "ENERGY_IMPORT", // (Session Only) Total amount of energy charged, defined in kWh.

  // Power measurements (in kW)
  POWER = "POWER", // (Session Only) Average power during this ChargingPeriod: defined in kW (Kilowatt). When negative, the power is flowing from the EV to the grid.
  MAX_POWER = "MAX_POWER", // Maximum power reached during this ChargingPeriod: defined in kW (Kilowatt).
  MIN_POWER = "MIN_POWER", // Minimum power reached during this ChargingPeriod: defined in kW (Kilowatt), when negative, the power has flowed from the EV to the grid.

  // Time measurements (Tariff in second, Session in hours)
  TIME = "TIME", // Time charging during this ChargingPeriod: defined in hours, default step_size multiplier is 1 second.

  // Other Time measurements (Tariff in second, Session in hours)
  PARKING_TIME = "PARKING_TIME", // Time during this ChargingPeriod not charging: defined in hours, default step_size multiplier is 1 second.
  RESERVATION_TIME = "RESERVATION_TIME", // Time during this ChargingPeriod Charge Point has been reserved and not yet been in use for this customer: defined in hours, default step_size multiplier is 1 second.

  // Battery measurements
  STATE_OF_CHARGE = "STATE_OF_CHARGE", // (Session Only) State of charge of EV battery in percentage
}

export type CdrLocation = {
  id: CiString36;
  name?: string255;
  address: string45;
  city: string45;
  postal_code?: string10;
  state?: string20;
  country: string3;
  coordinates: GeoLocation;
  evse_uid: CiString36;
  evse_id: CiString48;
  connector_id: CiString36;
  connector_standard: ConnectorTypeEnum;
  connector_format: ConnectorFormatEnum;
  connector_power_type: PowerTypeEnum;
};

export type CdrToken = {
  country_code: CiString2;
  party_id: CiString3;
  uid: CiString36;
  type: TokenTypeEnum;
  contract_id: CiString36;
};

export type ChargingPeriod = {
  start_date_time: DateTime;
  dimensions: NonEmptyArray<CdrDimension>;
  tariff_id?: CiString36;
};

export type SignedData = {
  encoding_method: CiString36;
  encoding_method_version?: int;
  public_key?: string512;
  signed_values: NonEmptyArray<SignedValue>;
  url?: URL512;
};

export type SignedValue = {
  nature: CiString32;
  plain_data: string512;
  signed_data: string5000;
};

/**********************  Tariffs **********************/
export type Tariff = {
  country_code: CiString2;
  party_id: CiString3;
  id: CiString36;
  currency: string3;
  type?: TariffTypeEnum;
  tariff_alt_text?: NullableEmptyArray<DisplayText>;
  tariff_alt_url?: URL;
  min_price?: Price;
  max_price?: Price;
  elements: NonEmptyArray<TariffElement>;
  start_date_time?: DateTime;
  end_date_time?: DateTime;
  energy_mix?: EnergyMix;
  last_updated: DateTime;
};

export enum DayOfWeekEnum {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export type PriceComponent = {
  type: TariffDimensionTypeEnum;
  price: number;
  vat?: number;
  step_size: int;
};

export type TariffElement = {
  price_components: NonEmptyArray<PriceComponent>;
  restrictions?: TariffRestrictions;
};

export enum TariffDimensionTypeEnum {
  ENERGY = "ENERGY",
  FLAT = "FLAT",
  PARKING_TIME = "PARKING_TIME",
  TIME = "TIME",
}

export type TariffRestrictions = {
  start_time?: string5;
  end_time?: string5;
  start_date?: string10;
  end_date?: string10;
  min_kwh?: number;
  max_kwh?: number;
  min_current?: number;
  max_current?: number;
  min_power?: number;
  max_power?: number;
  min_duration?: int;
  max_duration?: int;
  day_of_week?: NullableEmptyArray<DayOfWeekEnum>;
  reservation?: ReservationRestrictionTypeEnum;
};

export enum ReservationRestrictionTypeEnum {
  RESERVATION = "RESERVATION",
  RESERVATION_EXPIRES = "RESERVATION_EXPIRES",
}

export enum TariffTypeEnum {
  AD_HOC_PAYMENT = "AD_HOC_PAYMENT",
  PROFILE_CHEAP = "PROFILE_CHEAP",
  PROFILE_FAST = "PROFILE_FAST",
  PROFILE_GREEN = "PROFILE_GREEN",
  REGULAR = "REGULAR",
}

/**********************  Tokens **********************/
export type AuthorizationInfo = {
  allowed: AllowedTypeEnum;
  token: Token;
  location?: LocationReferences;
  authorization_reference?: CiString36;
  info?: DisplayText;
};

export type Token = {
  country_code: CiString2;
  party_id: CiString3;
  uid: CiString36;
  type: TokenTypeEnum;
  contract_id: CiString36;
  visual_number?: string64;
  issuer: string64;
  group_id?: CiString36;
  valid: boolean;
  whitelist: WhitelistTypeEnum;
  language?: string2;
  default_profile_type?: ProfileTypeEnum;
  energy_contract?: EnergyContract;
  last_updated: DateTime;
};

export enum AllowedTypeEnum {
  ALLOWED = "ALLOWED",
  BLOCKED = "BLOCKED",
  EXPIRED = "EXPIRED",
  NO_CREDIT = "NO_CREDIT",
  NOT_ALLOWED = "NOT_ALLOWED",
}

export type EnergyContract = {
  supplier_name: string64;
  contract_id?: string64;
};

export type LocationReferences = {
  location_id: CiString36;
  evse_uids?: NullableEmptyArray<CiString36>;
};

export enum TokenTypeEnum {
  AD_HOC_USER = "AD_HOC_USER",
  APP_USER = "APP_USER",
  OTHER = "OTHER",
  RFID = "RFID",
}

export enum WhitelistTypeEnum {
  ALWAYS = "ALWAYS",
  ALLOWED = "ALLOWED",
  ALLOWED_OFFLINE = "ALLOWED_OFFLINE",
  NEVER = "NEVER",
}

/**********************  Commands **********************/
export type CancelReservation = {
  response_url: URL;
  reservation_id: CiString36;
};

export type CommandResponse = {
  result: CommandResponseTypeEnum;
  timeout?: int; //TODO: Not Optional!!!
  message?: NullableEmptyArray<DisplayText>;
};

export type CommandResult = {
  result: CommandResultTypeEnum;
  message?: NullableEmptyArray<DisplayText>;
};

export type ReserveNow = {
  response_url: URL;
  token: Token;
  expiry_date: DateTime;
  reservation_id: CiString36;
  location_id: CiString36;
  evse_uid?: CiString36;
  authorization_reference?: CiString36;
};

export type StartSession = {
  response_url: URL;
  token: Token;
  location_id: CiString36;
  evse_uid?: CiString36;
  connector_id?: CiString36;
  authorization_reference?: CiString36;
};

export type StopSession = {
  response_url: URL;
  session_id: CiString36;
};

export type UnlockConnector = {
  response_url: URL;
  location_id: CiString36;
  evse_uid: CiString36;
  connector_id: CiString36;
};

export enum CommandResponseTypeEnum {
  NOT_SUPPORTED = "NOT_SUPPORTED",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  UNKNOWN_SESSION = "UNKNOWN_SESSION",
}

export enum CommandResultTypeEnum {
  ACCEPTED = "ACCEPTED",
  CANCELED_RESERVATION = "CANCELED_RESERVATION",
  EVSE_OCCUPIED = "EVSE_OCCUPIED",
  EVSE_INOPERATIVE = "EVSE_INOPERATIVE",
  FAILED = "FAILED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  REJECTED = "REJECTED",
  TIMEOUT = "TIMEOUT",
  UNKNOWN_RESERVATION = "UNKNOWN_RESERVATION",
}

export enum CommandTypeEnum {
  CANCEL_RESERVATION = "CANCEL_RESERVATION",
  RESERVE_NOW = "RESERVE_NOW",
  START_SESSION = "START_SESSION",
  STOP_SESSION = "STOP_SESSION",
  UNLOCK_CONNECTOR = "UNLOCK_CONNECTOR",
}

/**********************  ChargingProfiles **********************/
export type ChargingProfileResponse = {
  result: ChargingProfileResponseTypeEnum;
  timeout: int;
};

export type ActiveChargingProfileResult = {
  result: ChargingProfileResultTypeEnum;
  profile?: ActiveChargingProfile;
};

export type ChargingProfileResult = {
  result: ChargingProfileResultTypeEnum;
};

export type ClearProfileResult = {
  result: ChargingProfileResultTypeEnum;
};

export type SetChargingProfile = {
  charging_profile: ChargingProfile;
  response_url: URL;
};

export type ActiveChargingProfile = {
  start_date_time: DateTime;
  charging_profile: ChargingProfile;
};

export enum ChargingRateUnitEnum {
  W = "W",
  A = "A",
}

export type ChargingProfile = {
  start_date_time?: DateTime;
  duration?: int;
  charging_rate_unit: ChargingRateUnitEnum;
  min_charging_rate?: number;
  charging_profile_period?: NullableEmptyArray<ChargingProfilePeriod>;
};

export type ChargingProfilePeriod = {
  start_period: int;
  limit: number;
};

export enum ChargingProfileResponseTypeEnum {
  ACCEPTED = "ACCEPTED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  REJECTED = "REJECTED",
  TOO_OFTEN = "TOO_OFTEN",
  UNKNOWN_SESSION = "UNKNOWN_SESSION",
}

export enum ChargingProfileResultTypeEnum {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  UNKNOWN = "UNKNOWN",
}

/**********************  HubClientInfo **********************/
export type ClientInfo = {
  party_id: CiString3;
  country_code: CiString2;
  role: RoleEnum;
  status: ConnectionStatusEnum;
  last_updated: DateTime;
};

export enum ConnectionStatusEnum {
  CONNECTED = "CONNECTED",
  OFFLINE = "OFFLINE",
  PLANNED = "PLANNED",
  SUSPENDED = "SUSPENDED",
}

/**********************  Types **********************/
export type NonEmptyArray<T> = [T, ...T[]];

export type NullableEmptyArray<T> = T[] | null;

export type BrowserRenderableImageType =
  | "png"
  | "jpeg"
  | "jpg"
  | "gif"
  | "svg"
  | "webp"
  | "avif"
  | "bmp"
  | "ico"
  | "tiff"
  | "apng";

export type Latitude = string10; //TODO: Regex: -?[0-9]{1,3}\.[0-9]{5,7}

export type Longitude = string11; //TODO: Regex: -?[0-9]{1,3}\.[0-9]{5,7}

export type HourMinute = string5; //TODO: Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]

export type DateTime = string | Date;

export type URL = string255;

export type URL512 = string512;

export type int = number;

export type int1 = number;

export type int5 = number;

export type string2 = string;

export type string3 = string;

export type string4 = string;

export type string5 = string;

export type string10 = string;

export type string11 = string;

export type string16 = string;

export type string20 = string;

export type string45 = string;

export type string64 = string;

export type string100 = string;

export type string255 = string;

export type string512 = string;

export type string5000 = string;

export type CiString2 = string;

export type CiString3 = string;

export type CiString24 = string;

export type CiString32 = string;

export type CiString36 = string;

export type CiString39 = string;

export type CiString48 = string;

/**********************  Transport and Format **********************/
export type OcpiResponseMessage<T> = {
  status_code: number;
  status_message?: string;
  data?: T;
  timestamp: string;
};

export type Pagination = {
  date_from?: string;
  date_to?: string;
  offset?: number;
  limit?: number;
};

export type RoutingHeaders = {
  ocpi_from_country_code: string;
  ocpi_from_party_id: string;
  ocpi_to_country_code: string;
  ocpi_to_party_id: string;
};
