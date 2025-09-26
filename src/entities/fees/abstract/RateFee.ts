// RateFee.ts
import type { Tier } from "../../tiers/abstract/Tier";
import type { IEnergyTier } from "../../tiers/EnergyTier";
import type { ITimeTier } from "../../tiers/TimeTier";
import { type IFee, Fee } from "./Fee";

export interface IRateFee extends IFee {
  rate_type: RateType;
  tier_mode: TierMode;
  tiers: IEnergyTier[] | ITimeTier[];
}

export enum RateType {
  LOCK = "LOCK",
  DYNAMIC = "DYNAMIC",
}

export enum TierMode {
  BRACKET = "BRACKET",
  THRESHOLD = "THRESHOLD",
}

export abstract class RateFee extends Fee {
  #rateType: RateType;
  #tierMode: TierMode = TierMode.BRACKET;
  #tiers: Tier[] = [];

  constructor(rateType: RateType, tierMode: TierMode = TierMode.BRACKET) {
    super();
    this.#rateType = rateType;
    this.#tierMode = tierMode;
  }

  public addTier(tier: Tier): this {
    this.#tiers.push(tier);
    return this;
  }

  public removeTier(index: number): this {
    if (index >= 0 && index < this.#tiers.length) {
      this.#tiers.splice(index, 1);
    }
    return this;
  }

  // Tier Position Management
  public swapTiers(index1: number, index2: number): boolean {
    if (
      index1 < 0 ||
      index1 >= this.#tiers.length ||
      index2 < 0 ||
      index2 >= this.#tiers.length
    ) {
      return false;
    }
    if (index1 === index2) {
      return true;
    }

    [this.#tiers[index1], this.#tiers[index2]] = [
      this.#tiers[index2],
      this.#tiers[index1],
    ];
    return true;
  }

  public moveTier(fromIndex: number, toIndex: number): boolean {
    if (
      fromIndex < 0 ||
      fromIndex >= this.#tiers.length ||
      toIndex < 0 ||
      toIndex >= this.#tiers.length
    ) {
      return false;
    }
    if (fromIndex === toIndex) {
      return true;
    }

    const tier = this.#tiers.splice(fromIndex, 1)[0];
    this.#tiers.splice(toIndex, 0, tier);
    return true;
  }

  public moveTierUp(index: number): boolean {
    if (index <= 0 || index >= this.#tiers.length) {
      return false;
    }
    return this.swapTiers(index, index - 1);
  }

  public moveTierDown(index: number): boolean {
    if (index < 0 || index >= this.#tiers.length - 1) {
      return false;
    }
    return this.swapTiers(index, index + 1);
  }

  public moveTierToTop(index: number): boolean {
    return this.moveTier(index, 0);
  }

  public moveTierToBottom(index: number): boolean {
    return this.moveTier(index, this.#tiers.length - 1);
  }

  public getTiers(): Tier[] {
    return [...this.#tiers];
  }

  public getTierMode(): TierMode {
    return this.#tierMode;
  }

  public setTierMode(mode: TierMode): this {
    this.#tierMode = mode;
    return this;
  }

  // Getters
  public get rateType(): RateType {
    return this.#rateType;
  }

  public get tierMode(): TierMode {
    return this.#tierMode;
  }

  public get tiers(): Tier[] {
    return [...this.#tiers];
  }

  // Setters
  public set rateType(value: RateType) {
    this.#rateType = value;
  }
  public set tierMode(value: TierMode) {
    this.#tierMode = value;
  }
}
