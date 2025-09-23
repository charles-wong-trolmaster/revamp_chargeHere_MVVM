import type {
  IEnergyCategory,
  IOverstayCategory,
  IReservationCategory,
  ITimeCategory,
} from "@/entities";
import type {
  EnergyMix,
  Price,
  TariffTypeEnum,
} from "@/interfaces/ocpi-2.2.1-d2";
import type { BaseEntity } from "./base-entity.interface";

export interface ITariff extends BaseEntity {
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
  name: string;
  description?: string;
  categories: {
    energy: IEnergyCategory;
    time: ITimeCategory;
    reservation: IReservationCategory;
    overstay: IOverstayCategory;
  };
}
