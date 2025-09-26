import { type DayOfWeekEnum } from "../../../interfaces/ocpi-2.2.1-d2";

export interface IFee extends ITemporalRestrictions {
  vat?: number;
  enabled?: boolean;
}

export interface ITemporalRestrictions {
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  day_of_week?: DayOfWeekEnum[];
}

export abstract class Fee {
  #vat?: number;
  #enabled: boolean = true;
  #start_date?: string;
  #end_date?: string;
  #start_time?: string;
  #end_time?: string;
  #day_of_week?: DayOfWeekEnum[];

  constructor() {}

  public withVat(value: number): this {
    this.#vat = value;
    return this;
  }

  public withEnabled(value: boolean): this {
    this.#enabled = value;
    return this;
  }

  public enable(): this {
    this.#enabled = true;
    return this;
  }

  public disable(): this {
    this.#enabled = false;
    return this;
  }

  public withTemporalRestrictions(restrictions: ITemporalRestrictions): this {
    this.#start_date = restrictions.start_date;
    this.#end_date = restrictions.end_date;
    this.#start_time = restrictions.start_time;
    this.#end_time = restrictions.end_time;
    this.#day_of_week = restrictions.day_of_week;
    return this;
  }

  // Convenience methods for setting temporal restrictions
  public withDateRange(startDate?: string, endDate?: string): this {
    this.#start_date = startDate;
    this.#end_date = endDate;
    return this;
  }

  public withTimeRange(startTime?: string, endTime?: string): this {
    this.#start_time = startTime;
    this.#end_time = endTime;
    return this;
  }

  public withDaysOfWeek(daysOfWeek?: DayOfWeekEnum[]): this {
    this.#day_of_week = daysOfWeek;
    return this;
  }

  // Abstract method for subclasses
  abstract toObject(): any;

  // Getters
  public get vat(): number | undefined {
    return this.#vat;
  }
  public get enabled(): boolean {
    return this.#enabled;
  }
  public get start_date(): string | undefined {
    return this.#start_date;
  }
  public get end_date(): string | undefined {
    return this.#end_date;
  }
  public get start_time(): string | undefined {
    return this.#start_time;
  }
  public get end_time(): string | undefined {
    return this.#end_time;
  }
  public get day_of_week(): DayOfWeekEnum[] | undefined {
    return this.#day_of_week;
  }

  // Setters
  public set vat(value: number | undefined) {
    this.#vat = value;
  }
  public set enabled(value: boolean) {
    this.#enabled = value;
  }
  public set start_date(value: string | undefined) {
    this.#start_date = value;
  }
  public set end_date(value: string | undefined) {
    this.#end_date = value;
  }
  public set start_time(value: string | undefined) {
    this.#start_time = value;
  }
  public set end_time(value: string | undefined) {
    this.#end_time = value;
  }
  public set day_of_week(value: DayOfWeekEnum[] | undefined) {
    this.#day_of_week = value;
  }
}
