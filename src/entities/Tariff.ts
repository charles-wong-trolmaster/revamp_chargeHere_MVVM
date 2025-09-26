import {
  ReservationRestrictionTypeEnum,
  TariffDimensionTypeEnum,
  TariffTypeEnum,
  type EnergyMix,
  type NonEmptyArray,
  type Tariff as OcpiTariff,
  type Price,
  type PriceComponent,
  type TariffElement,
  type TariffRestrictions,
} from "../interfaces/ocpi-2.2.1-d2";
import { EnergyCategory } from "./categories/EnergyCategory";
import { OverstayCategory } from "./categories/OverstayCategory";
import { ReservationCategory } from "./categories/ReservationCategory";
import { TimeCategory } from "./categories/TimeCategory";
import type { Fee } from "./fees/abstract/Fee";
import { RateType, TierMode } from "./fees/abstract/RateFee";
import type { EnergyRateFee } from "./fees/EnergyRateFee";
import type { PenaltyFee } from "./fees/PenaltyFee";
import type { PenaltyFeeWithGracePeriod } from "./fees/PenaltyFeeWithGracePeriod";
import type { ServiceFee } from "./fees/ServiceFee";
import type { StartupFee } from "./fees/StartupFee";
import type { TimeRateFee } from "./fees/TimeRateFee";
import type { TimeRateFeeWithGracePeriod } from "./fees/TimeRateFeeWithGracePeriod";
import type { IScheme } from "./Scheme";
import { Scheme } from "./Scheme";
import type { EnergyTier } from "./tiers/EnergyTier";
import type { TimeTier } from "./tiers/TimeTier";

export interface ITariff {
  country_code: string;
  party_id: string;
  id: string;
  currency: string;
  type?: TariffTypeEnum;
  min_price?: Price;
  max_price?: Price;
  start_date_time?: Date;
  end_date_time?: Date;
  energy_mix?: EnergyMix;
  schemes: IScheme[];
  name: string;
  description: string;
  last_updated_by: string;
  last_updated: Date | string;
  created_by: string;
  created_at: Date;
}

export class Tariff {
  #countryCode: string;
  #partyId: string;
  #id: string;
  #currency: string;

  #name: string;
  #description: string;

  #type?: TariffTypeEnum;
  #minPrice?: Price;
  #maxPrice?: Price;
  #startDateTime?: Date;
  #endDateTime?: Date;
  #energyMix?: EnergyMix;

  // Audit fields
  #lastUpdated: Date;
  #lastUpdatedBy: string;
  #createdAt: Date;
  #createdBy: string;

  #schemes: Scheme[];

  constructor(
    countryCode: string,
    partyId: string,
    id: string,
    currency: string,
    name: string,
    description: string,
    lastUpdatedBy: string,
    createdBy: string
  ) {
    this.#countryCode = countryCode;
    this.#partyId = partyId;
    this.#id = id;
    this.#currency = currency;
    this.#name = name;
    this.#description = description;
    this.#lastUpdatedBy = lastUpdatedBy;
    this.#createdBy = createdBy;

    // Set audit timestamps
    const now = new Date();
    this.#createdAt = now;
    this.#lastUpdated = now;

    // Initialize empty schemes array
    this.#schemes = [];
  }

  // Scheme Management Methods
  public addScheme(scheme: Scheme): this {
    this.#schemes.push(scheme);
    this.updateLastUpdated();
    return this;
  }

  public removeScheme(index: number): this {
    if (index >= 0 && index < this.#schemes.length) {
      this.#schemes.splice(index, 1);
      this.updateLastUpdated();
    }
    return this;
  }

  public getScheme(index: number): Scheme | undefined {
    return this.#schemes[index];
  }

  public getSchemes(): Scheme[] {
    return [...this.#schemes];
  }

  public getSchemeCount(): number {
    return this.#schemes.length;
  }

  // Scheme Position Management
  public swapSchemes(index1: number, index2: number): boolean {
    if (
      index1 < 0 ||
      index1 >= this.#schemes.length ||
      index2 < 0 ||
      index2 >= this.#schemes.length
    ) {
      return false;
    }
    if (index1 === index2) {
      return true;
    }

    [this.#schemes[index1], this.#schemes[index2]] = [
      this.#schemes[index2],
      this.#schemes[index1],
    ];
    this.updateLastUpdated();
    return true;
  }

  public moveScheme(fromIndex: number, toIndex: number): boolean {
    if (
      fromIndex < 0 ||
      fromIndex >= this.#schemes.length ||
      toIndex < 0 ||
      toIndex >= this.#schemes.length
    ) {
      return false;
    }
    if (fromIndex === toIndex) {
      return true;
    }

    const scheme = this.#schemes.splice(fromIndex, 1)[0];
    this.#schemes.splice(toIndex, 0, scheme);
    this.updateLastUpdated();
    return true;
  }

  public moveSchemeUp(index: number): boolean {
    if (index <= 0 || index >= this.#schemes.length) {
      return false;
    }
    return this.swapSchemes(index, index - 1);
  }

  public moveSchemeDown(index: number): boolean {
    if (index < 0 || index >= this.#schemes.length - 1) {
      return false;
    }
    return this.swapSchemes(index, index + 1);
  }

  public moveSchemeToTop(index: number): boolean {
    return this.moveScheme(index, 0);
  }

  public moveSchemeToBottom(index: number): boolean {
    return this.moveScheme(index, this.#schemes.length - 1);
  }

  // Backward Compatibility - Access first scheme's categories
  public get energyCategory(): EnergyCategory {
    return this.#schemes[0]?.categories.energy || new EnergyCategory();
  }

  public get timeCategory(): TimeCategory {
    return this.#schemes[0]?.categories.time || new TimeCategory();
  }

  public get reservationCategory(): ReservationCategory {
    return (
      this.#schemes[0]?.categories.reservation || new ReservationCategory()
    );
  }

  public get overstayCategory(): OverstayCategory {
    return this.#schemes[0]?.categories.overstay || new OverstayCategory();
  }

  // Legacy categories property for backward compatibility
  public get categories(): {
    energy: EnergyCategory;
    time: TimeCategory;
    reservation: ReservationCategory;
    overstay: OverstayCategory;
  } {
    const firstScheme = this.#schemes[0];
    if (firstScheme) {
      return firstScheme.categories;
    }

    // Return empty categories if no schemes exist
    return {
      energy: new EnergyCategory(),
      time: new TimeCategory(),
      reservation: new ReservationCategory(),
      overstay: new OverstayCategory(),
    };
  }

  // Getters for basic properties
  public get countryCode(): string {
    return this.#countryCode;
  }

  public get partyId(): string {
    return this.#partyId;
  }

  public get id(): string {
    return this.#id;
  }

  public get currency(): string {
    return this.#currency;
  }

  public get name(): string {
    return this.#name;
  }

  public get description(): string {
    return this.#description;
  }

  public get schemes(): Scheme[] {
    return [...this.#schemes];
  }

  // Getters for OCPI fields
  public get type(): TariffTypeEnum | undefined {
    return this.#type;
  }

  public get minPrice(): Price | undefined {
    return this.#minPrice;
  }

  public get maxPrice(): Price | undefined {
    return this.#maxPrice;
  }

  public get startDateTime(): Date | undefined {
    return this.#startDateTime;
  }

  public get endDateTime(): Date | undefined {
    return this.#endDateTime;
  }

  public get energyMix(): EnergyMix | undefined {
    return this.#energyMix;
  }

  // Getters for audit fields
  public get lastUpdated(): Date {
    return this.#lastUpdated;
  }

  public get lastUpdatedBy(): string {
    return this.#lastUpdatedBy;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get createdBy(): string {
    return this.#createdBy;
  }

  // Setters for basic properties (country_code and party_id are immutable after creation)
  public set name(value: string) {
    this.#name = value;
    this.updateLastUpdated();
  }
  public set description(value: string) {
    this.#description = value;
    this.updateLastUpdated();
  }

  public set currency(value: string) {
    this.#currency = value;
    this.updateLastUpdated();
  }

  // Setters for OCPI fields
  public set type(value: TariffTypeEnum | undefined) {
    this.#type = value;
    this.updateLastUpdated();
  }

  public set minPrice(value: Price | undefined) {
    this.#minPrice = value;
    this.updateLastUpdated();
  }

  public set maxPrice(value: Price | undefined) {
    this.#maxPrice = value;
    this.updateLastUpdated();
  }

  public set startDateTime(value: Date | undefined) {
    this.#startDateTime = value;
    this.updateLastUpdated();
  }

  public set endDateTime(value: Date | undefined) {
    this.#endDateTime = value;
    this.updateLastUpdated();
  }

  public set energyMix(value: EnergyMix | undefined) {
    this.#energyMix = value;
    this.updateLastUpdated();
  }

  // Setter for audit fields
  public set lastUpdatedBy(value: string) {
    this.#lastUpdatedBy = value;
    this.updateLastUpdated();
  }

  public set createdBy(value: string) {
    this.#createdBy = value;
    this.updateLastUpdated();
  }

  // Private method to update last_updated timestamp and last_updated_by
  private updateLastUpdated(updatedBy?: string): void {
    this.#lastUpdated = new Date();
    if (updatedBy !== undefined) {
      this.#lastUpdatedBy = updatedBy;
    }
  }

  // Public method to manually update last_updated (useful when modifying schemes)
  public markAsUpdated(updatedBy?: string): Tariff {
    this.updateLastUpdated(updatedBy);
    return this;
  }

  // Fluent builder methods for OCPI metadata
  public withType(type: TariffTypeEnum): Tariff {
    this.#type = type;
    this.updateLastUpdated();
    return this;
  }

  public withPriceRange(minPrice?: Price, maxPrice?: Price): Tariff {
    this.#minPrice = minPrice;
    this.#maxPrice = maxPrice;
    this.updateLastUpdated();
    return this;
  }

  public withDateTimeRange(startDateTime?: Date, endDateTime?: Date): Tariff {
    this.#startDateTime = startDateTime;
    this.#endDateTime = endDateTime;
    this.updateLastUpdated();
    return this;
  }

  public withEnergyMix(energyMix: EnergyMix): Tariff {
    this.#energyMix = energyMix;
    this.updateLastUpdated();
    return this;
  }

  // Serialization methods
  public toObject(): ITariff {
    const obj: ITariff = {
      country_code: this.#countryCode,
      party_id: this.#partyId,
      id: this.#id,
      currency: this.#currency,
      name: this.#name,
      description: this.#description,
      last_updated: this.#lastUpdated,
      last_updated_by: this.#lastUpdatedBy,
      created_at: this.#createdAt,
      created_by: this.#createdBy,
      schemes: this.#schemes.map((scheme) => scheme.toObject()),
    };

    // Add optional OCPI fields only if they exist and are not null/undefined
    if (this.#type !== undefined && this.#type !== null) {
      obj.type = this.#type;
    }
    if (this.#minPrice !== undefined && this.#minPrice !== null) {
      obj.min_price = this.#minPrice;
    }
    if (this.#maxPrice !== undefined && this.#maxPrice !== null) {
      obj.max_price = this.#maxPrice;
    }
    if (this.#startDateTime !== undefined && this.#startDateTime !== null) {
      obj.start_date_time = this.#startDateTime;
    }
    if (this.#endDateTime !== undefined && this.#endDateTime !== null) {
      obj.end_date_time = this.#endDateTime;
    }
    if (this.#energyMix !== undefined && this.#energyMix !== null) {
      obj.energy_mix = this.#energyMix;
    }

    return obj;
  }

  public static fromObject(obj: ITariff): Tariff {
    const tariff = new Tariff(
      obj.country_code,
      obj.party_id,
      obj.id,
      obj.currency,
      obj.name,
      obj.description,
      obj.last_updated_by,
      obj.created_by
    );

    // Set audit fields from the object
    tariff.#lastUpdated = new Date(obj.last_updated);
    tariff.#lastUpdatedBy = obj.last_updated_by;
    tariff.#createdAt = obj.created_at;

    // Set optional OCPI fields
    if (obj.type !== undefined) tariff.#type = obj.type;
    if (obj.min_price !== undefined) tariff.#minPrice = obj.min_price;
    if (obj.max_price !== undefined) tariff.#maxPrice = obj.max_price;
    if (obj.start_date_time !== undefined)
      tariff.#startDateTime = obj.start_date_time;
    if (obj.end_date_time !== undefined)
      tariff.#endDateTime = obj.end_date_time;
    if (obj.energy_mix !== undefined) tariff.#energyMix = obj.energy_mix;

    // Recreate schemes from their serialized objects
    obj.schemes.forEach((schemeData) => {
      const scheme = Scheme.fromObject(schemeData);
      tariff.addScheme(scheme);
    });

    return tariff;
  }

  // OCPI conversion method - Now aggregates all schemes
  public toOcpi(): OcpiTariff {
    const elements: TariffElement[] = [];

    // Convert all schemes to OCPI elements
    this.#schemes.forEach((scheme) => {
      // Convert Energy Category
      elements.push(...this.convertEnergyCategory(scheme.categories.energy));

      // Convert Time Category
      elements.push(...this.convertTimeCategory(scheme.categories.time));

      // Convert Overstay Category
      elements.push(
        ...this.convertOverstayCategory(scheme.categories.overstay)
      );

      // Convert Reservation Category
      elements.push(
        ...this.convertReservationCategory(scheme.categories.reservation)
      );
    });

    // Ensure we have at least one element for NonEmptyArray
    if (elements.length === 0) {
      throw new Error("Tariff must have at least one tariff element");
    }

    const ocpiTariff: OcpiTariff = {
      country_code: this.#countryCode,
      party_id: this.#partyId,
      id: this.#id,
      currency: this.#currency,
      elements: elements as NonEmptyArray<TariffElement>,
      last_updated: this.#lastUpdated,
    };

    // Add optional OCPI fields if they exist in the tariff
    if (this.#type !== undefined) ocpiTariff.type = this.#type;
    if (this.#minPrice !== undefined) ocpiTariff.min_price = this.#minPrice;
    if (this.#maxPrice !== undefined) ocpiTariff.max_price = this.#maxPrice;
    if (this.#startDateTime !== undefined)
      ocpiTariff.start_date_time = this.#startDateTime;
    if (this.#endDateTime !== undefined)
      ocpiTariff.end_date_time = this.#endDateTime;
    if (this.#energyMix !== undefined) ocpiTariff.energy_mix = this.#energyMix;

    return ocpiTariff;
  }

  // All the private conversion methods remain EXACTLY the same
  // [Include all the existing conversion methods unchanged]

  private convertEnergyCategory(category: EnergyCategory): TariffElement[] {
    const elements: TariffElement[] = [];

    // Convert startup fees with energy category marker - only active fees
    category.getActiveStartupFees().forEach((startupFee) => {
      elements.push(
        this.convertStartupFeeToTariffElement(startupFee, "energy")
      );
    });

    // Convert rate fees - only active fees
    category.getActiveRateFees().forEach((rateFee) => {
      elements.push(...this.convertEnergyRateFeeToTariffElements(rateFee));
    });

    return elements;
  }

  private convertTimeCategory(category: TimeCategory): TariffElement[] {
    const elements: TariffElement[] = [];

    // Convert startup fees with time category marker - only active fees
    category.getActiveStartupFees().forEach((startupFee) => {
      elements.push(this.convertStartupFeeToTariffElement(startupFee, "time"));
    });

    // Convert rate fees - only active fees
    category.getActiveRateFees().forEach((rateFee) => {
      elements.push(...this.convertTimeRateFeeToTariffElements(rateFee));
    });

    return elements;
  }

  private convertOverstayCategory(category: OverstayCategory): TariffElement[] {
    const elements: TariffElement[] = [];

    // Convert penalty fees with overstay category marker - only active fees
    category.getActivePenaltyFees().forEach((penaltyFee) => {
      elements.push(
        this.convertPenaltyFeeWithGracePeriodToTariffElement(
          penaltyFee,
          TariffDimensionTypeEnum.FLAT,
          undefined, // no reservation restriction
          false, // not canceled
          true // isOverstay = true
        )
      );
    });

    // Convert rate fees - only active fees
    category.getActiveRateFees().forEach((rateFee) => {
      elements.push(
        ...this.convertTimeRateFeeWithGracePeriodToTariffElements(rateFee, true)
      ); // isOverstay = true
    });

    return elements;
  }

  private convertPenaltyFeeWithGracePeriodToTariffElement(
    penaltyFee: PenaltyFeeWithGracePeriod,
    dimensionType: TariffDimensionTypeEnum = TariffDimensionTypeEnum.FLAT,
    reservationRestriction?: ReservationRestrictionTypeEnum,
    isCanceled: boolean = false,
    isOverstay: boolean = false
  ): TariffElement {
    const priceComponents: PriceComponent[] = [
      {
        type: dimensionType,
        price: penaltyFee.amount,
        step_size: 1,
        ...(penaltyFee.vat !== undefined && { vat: penaltyFee.vat }),
      },
    ];

    // Add overstay category marker for overstay penalties
    if (isOverstay) {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -6, // Overstay category marker
        vat: 0,
      });
    }

    // Add grace period marker (always present for PenaltyFeeWithGracePeriod)
    priceComponents.push({
      type: TariffDimensionTypeEnum.FLAT,
      price: 0,
      step_size: -3, // Grace period marker
      vat: penaltyFee.gracePeriod * 60, // Convert minutes to seconds for OCPI
    });

    // Add canceled marker if needed
    if (isCanceled) {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -1, // Canceled marker
        vat: 0,
      });
    }

    const restrictions = this.buildTemporalRestrictions(penaltyFee);
    if (reservationRestriction) {
      restrictions.reservation = reservationRestriction;
    }

    const element: TariffElement = {
      price_components: priceComponents as NonEmptyArray<PriceComponent>,
    };

    if (Object.keys(restrictions).length > 0) {
      element.restrictions = restrictions;
    }

    return element;
  }

  private convertTimeRateFeeWithGracePeriodToTariffElements(
    rateFee: TimeRateFeeWithGracePeriod,
    isOverstay: boolean = false,
    reservationRestriction?: ReservationRestrictionTypeEnum,
    isCanceled: boolean = false
  ): TariffElement[] {
    const elements: TariffElement[] = [];
    const isLocked = rateFee.rateType === RateType.LOCK;
    const isThreshold = rateFee.tierMode === TierMode.THRESHOLD;
    const dimensionType = isOverstay
      ? TariffDimensionTypeEnum.PARKING_TIME
      : TariffDimensionTypeEnum.TIME;

    rateFee.timeTiers.forEach((tier) => {
      const priceComponents: PriceComponent[] = [
        {
          type: dimensionType,
          price: tier.pricePerHour,
          step_size: tier.stepSizeMinutes * 60, // Convert minutes to seconds for OCPI
          ...(rateFee.vat !== undefined && { vat: rateFee.vat }),
        },
      ];

      // Add grace period marker (always present for TimeRateFeeWithGracePeriod)
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -3, // Grace period marker
        vat: rateFee.gracePeriod * 60, // Convert minutes to seconds for OCPI
      });

      // Add locked rate marker ONLY if LOCKED
      if (isLocked) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: 0, // Locked rate marker
        });
      }

      // Add threshold marker ONLY if THRESHOLD
      if (isThreshold) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -2, // Threshold marker
        });
      }

      // Add canceled marker ONLY for canceled scenarios
      if (isCanceled) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -1, // Canceled marker
        });
      }

      const restrictions: TariffRestrictions = {
        ...this.buildTemporalRestrictions(rateFee),
        ...this.buildTimeTierRestrictions(tier),
      };

      if (reservationRestriction) {
        restrictions.reservation = reservationRestriction;
      }

      const element: TariffElement = {
        price_components: priceComponents as NonEmptyArray<PriceComponent>,
      };

      if (Object.keys(restrictions).length > 0) {
        element.restrictions = restrictions;
      }

      elements.push(element);
    });

    return elements;
  }

  private convertReservationCategory(
    category: ReservationCategory
  ): TariffElement[] {
    const elements: TariffElement[] = [];

    // Convert service fees (FLAT components with RESERVATION restriction) - only active fees
    category.getActiveServiceFees().forEach((serviceFee) => {
      elements.push(this.convertServiceFeeToTariffElement(serviceFee));
    });

    // Convert kept rate fees - only active fees
    category.getActiveKeptRateFees().forEach((rateFee) => {
      elements.push(
        ...this.convertTimeRateFeeToTariffElements(
          rateFee,
          false,
          ReservationRestrictionTypeEnum.RESERVATION
        )
      );
    });

    // Convert canceled rate fees - only active fees (with canceled marker)
    category.getActiveCanceledRateFees().forEach((rateFee) => {
      elements.push(
        ...this.convertTimeRateFeeToTariffElements(
          rateFee,
          false,
          ReservationRestrictionTypeEnum.RESERVATION,
          true
        )
      );
    });

    // Convert no-show rate fees - only active fees (no marker needed, restriction is sufficient)
    category.getActiveNoShowRateFees().forEach((rateFee) => {
      elements.push(
        ...this.convertTimeRateFeeToTariffElements(
          rateFee,
          false,
          ReservationRestrictionTypeEnum.RESERVATION_EXPIRES
        )
      );
    });

    // Convert canceled penalty fees - only active fees (with canceled marker)
    category.getActiveCanceledPenaltyFees().forEach((penaltyFee) => {
      elements.push(
        this.convertPenaltyFeeToTariffElement(
          penaltyFee,
          TariffDimensionTypeEnum.FLAT,
          ReservationRestrictionTypeEnum.RESERVATION,
          true
        )
      );
    });

    // Convert no-show penalty fees - only active fees (no marker needed, restriction is sufficient)
    category.getActiveNoShowPenaltyFees().forEach((penaltyFee) => {
      elements.push(
        this.convertPenaltyFeeToTariffElement(
          penaltyFee,
          TariffDimensionTypeEnum.FLAT,
          ReservationRestrictionTypeEnum.RESERVATION_EXPIRES
        )
      );
    });

    return elements;
  }

  private convertStartupFeeToTariffElement(
    startupFee: StartupFee,
    category?: "energy" | "time"
  ): TariffElement {
    const priceComponents: PriceComponent[] = [
      {
        type: TariffDimensionTypeEnum.FLAT,
        price: startupFee.amount,
        step_size: 1,
        ...(startupFee.vat !== undefined && { vat: startupFee.vat }),
      },
    ];

    // Add category markers to distinguish between energy and time startup fees
    if (category === "energy") {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -4, // Energy category marker
        vat: 0,
      });
    } else if (category === "time") {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -5, // Time category marker
        vat: 0,
      });
    }

    const restrictions = this.buildTemporalRestrictions(startupFee);
    const hasRestrictions = Object.keys(restrictions).length > 0;

    const element: TariffElement = {
      price_components: priceComponents as NonEmptyArray<PriceComponent>,
    };

    if (hasRestrictions) {
      element.restrictions = restrictions;
    }

    return element;
  }

  private convertServiceFeeToTariffElement(
    serviceFee: ServiceFee
  ): TariffElement {
    const priceComponents: PriceComponent[] = [
      {
        type: TariffDimensionTypeEnum.FLAT,
        price: serviceFee.amount,
        step_size: 1,
        ...(serviceFee.vat !== undefined && { vat: serviceFee.vat }),
      },
    ];

    const restrictions: TariffRestrictions = {
      ...this.buildTemporalRestrictions(serviceFee),
      reservation: ReservationRestrictionTypeEnum.RESERVATION,
    };

    const element: TariffElement = {
      price_components: priceComponents as NonEmptyArray<PriceComponent>,
    };

    if (Object.keys(restrictions).length > 0) {
      element.restrictions = restrictions;
    }

    return element;
  }

  private convertPenaltyFeeToTariffElement(
    penaltyFee: PenaltyFee,
    dimensionType: TariffDimensionTypeEnum = TariffDimensionTypeEnum.FLAT,
    reservationRestriction?: ReservationRestrictionTypeEnum,
    isCanceled: boolean = false,
    gracePeriodMinutes?: number
  ): TariffElement {
    const priceComponents: PriceComponent[] = [
      {
        type: dimensionType,
        price: penaltyFee.amount,
        step_size: 1,
        ...(penaltyFee.vat !== undefined && { vat: penaltyFee.vat }),
      },
    ];

    // Add canceled marker if needed
    if (isCanceled) {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -1, // Canceled marker
      });
    }

    // Add grace period marker if provided
    if (gracePeriodMinutes !== undefined && gracePeriodMinutes > 0) {
      priceComponents.push({
        type: TariffDimensionTypeEnum.FLAT,
        price: 0,
        step_size: -3, // Grace period marker
        vat: gracePeriodMinutes * 60, // Convert minutes to seconds for OCPI
      });
    }

    const restrictions = this.buildTemporalRestrictions(penaltyFee);
    if (reservationRestriction) {
      restrictions.reservation = reservationRestriction;
    }

    const element: TariffElement = {
      price_components: priceComponents as NonEmptyArray<PriceComponent>,
    };

    if (Object.keys(restrictions).length > 0) {
      element.restrictions = restrictions;
    }

    return element;
  }

  private convertEnergyRateFeeToTariffElements(
    rateFee: EnergyRateFee
  ): TariffElement[] {
    const elements: TariffElement[] = [];
    const isLocked = rateFee.rateType === RateType.LOCK;
    const isThreshold = rateFee.tierMode === TierMode.THRESHOLD;

    rateFee.energyTiers.forEach((tier) => {
      const priceComponents: PriceComponent[] = [
        {
          type: TariffDimensionTypeEnum.ENERGY,
          price: tier.pricePerKwh,
          step_size: tier.stepSizeKwh * 1000, // Convert kWh to Wh for OCPI
          ...(rateFee.vat !== undefined && { vat: rateFee.vat }),
        },
      ];

      // Add locked rate marker ONLY if LOCKED
      if (isLocked) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: 0, // Locked rate marker
        });
      }

      // Add threshold marker ONLY if THRESHOLD
      if (isThreshold) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -2, // Threshold marker
        });
      }

      const restrictions: TariffRestrictions = {
        ...this.buildTemporalRestrictions(rateFee),
        ...this.buildEnergyTierRestrictions(tier),
      };

      const element: TariffElement = {
        price_components: priceComponents as NonEmptyArray<PriceComponent>,
      };

      if (Object.keys(restrictions).length > 0) {
        element.restrictions = restrictions;
      }

      elements.push(element);
    });

    return elements;
  }

  private convertTimeRateFeeToTariffElements(
    rateFee: TimeRateFee,
    isOverstay: boolean = false,
    reservationRestriction?: ReservationRestrictionTypeEnum,
    isCanceled: boolean = false,
    gracePeriodMinutes?: number
  ): TariffElement[] {
    const elements: TariffElement[] = [];
    const isLocked = rateFee.rateType === RateType.LOCK;
    const isThreshold = rateFee.tierMode === TierMode.THRESHOLD;
    const dimensionType = isOverstay
      ? TariffDimensionTypeEnum.PARKING_TIME
      : TariffDimensionTypeEnum.TIME;

    rateFee.timeTiers.forEach((tier) => {
      const priceComponents: PriceComponent[] = [
        {
          type: dimensionType,
          price: tier.pricePerHour,
          step_size: tier.stepSizeMinutes * 60, // Convert minutes to seconds for OCPI
          ...(rateFee.vat !== undefined && { vat: rateFee.vat }),
        },
      ];

      // Add locked rate marker ONLY if LOCKED
      if (isLocked) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: 0, // Locked rate marker
        });
      }

      // Add threshold marker ONLY if THRESHOLD
      if (isThreshold) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -2, // Threshold marker
        });
      }

      // Add canceled marker ONLY for canceled scenarios
      if (isCanceled) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -1, // Canceled marker
        });
      }

      // Add grace period marker if provided
      if (gracePeriodMinutes !== undefined && gracePeriodMinutes > 0) {
        priceComponents.push({
          type: TariffDimensionTypeEnum.FLAT,
          price: 0,
          step_size: -3, // Grace period marker
          vat: gracePeriodMinutes * 60, // Convert minutes to seconds for OCPI
        });
      }

      const restrictions: TariffRestrictions = {
        ...this.buildTemporalRestrictions(rateFee),
        ...this.buildTimeTierRestrictions(tier),
      };

      if (reservationRestriction) {
        restrictions.reservation = reservationRestriction;
      }

      const element: TariffElement = {
        price_components: priceComponents as NonEmptyArray<PriceComponent>,
      };

      if (Object.keys(restrictions).length > 0) {
        element.restrictions = restrictions;
      }

      elements.push(element);
    });

    return elements;
  }

  private buildTemporalRestrictions(fee: Fee): TariffRestrictions {
    const restrictions: TariffRestrictions = {};

    if (fee.start_date) restrictions.start_date = fee.start_date;
    if (fee.end_date) restrictions.end_date = fee.end_date;
    if (fee.start_time) restrictions.start_time = fee.start_time;
    if (fee.end_time) restrictions.end_time = fee.end_time;

    if (
      fee.day_of_week &&
      Array.isArray(fee.day_of_week) &&
      fee.day_of_week.length > 0
    ) {
      restrictions.day_of_week = fee.day_of_week;
    }

    return restrictions;
  }

  private buildEnergyTierRestrictions(tier: EnergyTier): TariffRestrictions {
    const restrictions: TariffRestrictions = {};

    if (tier.minKwh !== undefined) restrictions.min_kwh = tier.minKwh;
    if (tier.maxKwh !== undefined) restrictions.max_kwh = tier.maxKwh;
    if (tier.minPower !== undefined) restrictions.min_power = tier.minPower;
    if (tier.maxPower !== undefined) restrictions.max_power = tier.maxPower;
    if (tier.minCurrent !== undefined)
      restrictions.min_current = tier.minCurrent;
    if (tier.maxCurrent !== undefined)
      restrictions.max_current = tier.maxCurrent;

    return restrictions;
  }

  private buildTimeTierRestrictions(tier: TimeTier): TariffRestrictions {
    const restrictions: TariffRestrictions = {};

    if (tier.minDuration !== undefined)
      restrictions.min_duration = tier.minDuration;
    if (tier.maxDuration !== undefined)
      restrictions.max_duration = tier.maxDuration;
    if (tier.minPower !== undefined) restrictions.min_power = tier.minPower;
    if (tier.maxPower !== undefined) restrictions.max_power = tier.maxPower;
    if (tier.minCurrent !== undefined)
      restrictions.min_current = tier.minCurrent;
    if (tier.maxCurrent !== undefined)
      restrictions.max_current = tier.maxCurrent;

    return restrictions;
  }
}
