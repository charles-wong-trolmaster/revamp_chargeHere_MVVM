// TimeRateFeeWithGracePeriod.ts
import { TimeTier } from '../tiers/TimeTier.js';
import { RateType, TierMode } from './abstract/RateFee.js';
import { TimeRateFee, type ITimeRateFee } from './TimeRateFee.js';

export interface ITimeRateFeeWithGracePeriod extends ITimeRateFee {
	grace_period: number; // Required grace period in minutes
}

export class TimeRateFeeWithGracePeriod extends TimeRateFee {
	#gracePeriod: number; // Required grace period in minutes

	constructor(rateType: RateType, tierMode: TierMode = TierMode.BRACKET) {
		super(rateType, tierMode);
		this.#gracePeriod = 0;
	}

	public withGracePeriod(minutes: number): this {
		this.#gracePeriod = minutes;
		return this;
	}

	public toObject(): ITimeRateFeeWithGracePeriod {
		return {
			...super.toObject(),
			grace_period: this.#gracePeriod
		};
	}

	public static fromObject(obj: ITimeRateFeeWithGracePeriod): TimeRateFeeWithGracePeriod {
		const rateFee = new TimeRateFeeWithGracePeriod(obj.rate_type, obj.tier_mode);
		rateFee.withGracePeriod(obj.grace_period);

		// Set VAT if provided
		if (obj.vat !== undefined) {
			rateFee.vat = obj.vat;
		}

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

	public get gracePeriod(): number {
		return this.#gracePeriod;
	}

	public set gracePeriod(value: number) {
		this.#gracePeriod = value;
	}
}
