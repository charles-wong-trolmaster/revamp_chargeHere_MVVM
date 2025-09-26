// TimeRateFee.ts
import { TimeTier, type ITimeTier } from '../tiers/TimeTier';
import { RateFee, RateType, TierMode, type IRateFee } from './abstract/RateFee';

export interface ITimeRateFee extends IRateFee {
	tiers: ITimeTier[];
}

export class TimeRateFee extends RateFee {
	constructor(rateType: RateType, tierMode: TierMode = TierMode.BRACKET) {
		super(rateType, tierMode);
	}

	public addTimeTier(tier: TimeTier): this {
		super.addTier(tier); // Only add to base array
		return this;
	}

	public removeTimeTier(index: number): this {
		return super.removeTier(index); // Use base method
	}

	public getTimeTiers(): TimeTier[] {
		return this.tiers as TimeTier[]; // Cast base array
	}

	public getTimeTier(index: number): TimeTier | undefined {
		return this.tiers[index] as TimeTier;
	}

	public updateTimeTier(index: number, tier: TimeTier): boolean {
		if (index >= 0 && index < this.tiers.length) {
			this.tiers[index] = tier;
			return true;
		}
		return false;
	}

	public toObject(): ITimeRateFee {
		const obj: any = {
			enabled: this.enabled,
			rate_type: this.rateType,
			tier_mode: this.tierMode,
			tiers: this.tiers.map((tier) => (tier as TimeTier).toObject()) // Cast and map
		};

		// Only add optional fields if they have values
		if (this.vat !== undefined && this.vat !== null) {
			obj.vat = this.vat;
		}
		if (this.start_date !== undefined && this.start_date !== null) {
			obj.start_date = this.start_date;
		}
		if (this.end_date !== undefined && this.end_date !== null) {
			obj.end_date = this.end_date;
		}
		if (this.start_time !== undefined && this.start_time !== null) {
			obj.start_time = this.start_time;
		}
		if (this.end_time !== undefined && this.end_time !== null) {
			obj.end_time = this.end_time;
		}
		if (this.day_of_week !== undefined && this.day_of_week !== null && this.day_of_week.length > 0) {
			obj.day_of_week = this.day_of_week;
		}

		return obj as ITimeRateFee;
	}

	public static fromObject(obj: ITimeRateFee): TimeRateFee {
		const rateFee = new TimeRateFee(obj.rate_type, obj.tier_mode);

		// Set VAT if provided
		if (obj.vat !== undefined) {
			rateFee.vat = obj.vat;
		}

		// Set enabled if provided, default to true
		if (obj.enabled !== undefined) {
			rateFee.enabled = obj.enabled;
		}

		rateFee.withTemporalRestrictions({
			start_date: obj.start_date,
			end_date: obj.end_date,
			start_time: obj.start_time,
			end_time: obj.end_time,
			day_of_week: obj.day_of_week
		});

		obj.tiers.forEach((tierData) => {
			const tier = TimeTier.fromObject(tierData);
			rateFee.addTimeTier(tier);
		});

		return rateFee;
	}

	public get timeTiers(): TimeTier[] {
		return [...this.tiers] as TimeTier[]; // Cast base array with spread for immutability
	}
}