// TimeTier.ts
import { type int } from "../../interfaces/ocpi-2.2.1-d2";
import { Tier, type ITier } from "./abstract/Tier";

export interface ITimeTier extends ITier {
  price_per_hour: number; // Changed from pricePerSecond
  step_size_minutes: int; // snake_case
  min_duration?: int; // snake_case
  max_duration?: int; // snake_case
}

export class TimeTier extends Tier {
  #pricePerHour: number = 0; // Changed from _pricePerSecond
  #stepSizeMinutes: int = 1;
  #minDuration?: int;
  #maxDuration?: int;

  constructor(pricePerHour: number, stepSizeMinutes: int = 1) {
    // Changed parameter
    super();
    this.#pricePerHour = pricePerHour; // Changed from _pricePerSecond
    this.#stepSizeMinutes = stepSizeMinutes;
  }

  public withPricePerHour(value: number): this {
    // Changed from withPricePerSecond
    this.#pricePerHour = value;
    return this;
  }

  public withStepSizeMinutes(value: int): this {
    this.#stepSizeMinutes = value;
    return this;
  }

  public withDurationRange(min?: int, max?: int): this {
    this.#minDuration = min;
    this.#maxDuration = max;
    return this;
  }

  public get pricePerHour(): number {
    // Changed from pricePerSecond
    return this.#pricePerHour;
  }

  public set pricePerHour(value: number) {
    // Changed from pricePerSecond
    this.#pricePerHour = value;
  }

  public get stepSizeMinutes(): int {
    return this.#stepSizeMinutes;
  }

  public set stepSizeMinutes(value: int) {
    this.#stepSizeMinutes = value;
  }

  public get minDuration(): int | undefined {
    return this.#minDuration;
  }

  public set minDuration(value: int | undefined) {
    this.#minDuration = value;
  }

  public get maxDuration(): int | undefined {
    return this.#maxDuration;
  }

  public set maxDuration(value: int | undefined) {
    this.#maxDuration = value;
  }

  public toObject(): ITimeTier {
    const obj: any = {
      price_per_hour: this.#pricePerHour,
      step_size_minutes: this.#stepSizeMinutes,
    };

    // Only add optional fields if they have values
    if (this.#minDuration !== undefined && this.#minDuration !== null) {
      obj.min_duration = this.#minDuration;
    }
    if (this.#maxDuration !== undefined && this.#maxDuration !== null) {
      obj.max_duration = this.#maxDuration;
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

    return obj as ITimeTier;
  }

  public static fromObject(obj: ITimeTier): TimeTier {
    const tier = new TimeTier(obj.price_per_hour, obj.step_size_minutes);

    tier.withDurationRange(obj.min_duration, obj.max_duration);
    tier.withPowerRange(obj.min_power, obj.max_power);
    tier.withCurrentRange(obj.min_current, obj.max_current);

    return tier;
  }
}
