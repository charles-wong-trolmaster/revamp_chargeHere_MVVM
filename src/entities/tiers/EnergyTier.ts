import { type int } from "../../interfaces/ocpi-2.2.1-d2";
import { Tier, type ITier } from "./abstract/Tier";

export interface IEnergyTier extends ITier {
  price_per_kwh: number;
  step_size_kwh: int;
  min_kwh?: number;
  max_kwh?: number;
}

export class EnergyTier extends Tier {
  #pricePerKwh: number = 0;
  #stepSizeKwh: int = 1;
  #minKwh?: number;
  #maxKwh?: number;

  constructor(pricePerKwh: number, stepSizeKwh: int = 1) {
    super();
    this.#pricePerKwh = pricePerKwh;
    this.#stepSizeKwh = stepSizeKwh;
  }

  public withPricePerKwh(value: number): this {
    this.#pricePerKwh = value;
    return this;
  }

  public withStepSizeKwh(value: int): this {
    this.#stepSizeKwh = value;
    return this;
  }

  public withEnergyRange(min?: number, max?: number): this {
    this.#minKwh = min;
    this.#maxKwh = max;
    return this;
  }

  public get pricePerKwh(): number {
    return this.#pricePerKwh;
  }

  public set pricePerKwh(value: number) {
    this.#pricePerKwh = value;
  }

  public get stepSizeKwh(): int {
    return this.#stepSizeKwh;
  }

  public set stepSizeKwh(value: int) {
    this.#stepSizeKwh = value;
  }

  public get minKwh(): number | undefined {
    return this.#minKwh;
  }

  public set minKwh(value: number | undefined) {
    this.#minKwh = value;
  }

  public get maxKwh(): number | undefined {
    return this.#maxKwh;
  }

  public set maxKwh(value: number | undefined) {
    this.#maxKwh = value;
  }

  public toObject(): IEnergyTier {
    const obj: any = {
      price_per_kwh: this.#pricePerKwh,
      step_size_kwh: this.#stepSizeKwh,
    };

    // Only add optional fields if they have values
    if (this.#minKwh !== undefined && this.#minKwh !== null) {
      obj.min_kwh = this.#minKwh;
    }
    if (this.#maxKwh !== undefined && this.#maxKwh !== null) {
      obj.max_kwh = this.#maxKwh;
    }
    if (this.minPower !== undefined && this.minPower !== null) {
      obj.min_power = this.minPower;
    }
    if (this.maxPower !== undefined && this.maxPower !== null) {
      obj.max_power = this.maxPower;
    }
    if (this.minCurrent !== undefined && this.minCurrent !== null) {
      obj.min_current = this.minCurrent;
    }
    if (this.maxCurrent !== undefined && this.maxCurrent !== null) {
      obj.max_current = this.maxCurrent;
    }

    return obj as IEnergyTier;
  }

  public static fromObject(obj: IEnergyTier): EnergyTier {
    const tier = new EnergyTier(obj.price_per_kwh, obj.step_size_kwh);

    tier.withEnergyRange(obj.min_kwh, obj.max_kwh);
    tier.withPowerRange(obj.min_power, obj.max_power);
    tier.withCurrentRange(obj.min_current, obj.max_current);

    return tier;
  }
}
