// PenaltyFeeWithGracePeriod.ts
import { PenaltyFee, type IPenaltyFee } from './PenaltyFee.js';

export interface IPenaltyFeeWithGracePeriod extends IPenaltyFee {
	grace_period: number; // Required grace period in minutes
}

export class PenaltyFeeWithGracePeriod extends PenaltyFee {
	#gracePeriod: number; // Required grace period in minutes

	constructor(amount: number) {
		super(amount);
		this.#gracePeriod = 0;
	}

	public withGracePeriod(minutes: number): this {
		this.#gracePeriod = minutes;
		return this;
	}

	public toObject(): IPenaltyFeeWithGracePeriod {
		return {
			...super.toObject(),
			grace_period: this.#gracePeriod
		};
	}

	public static fromObject(obj: IPenaltyFeeWithGracePeriod): PenaltyFeeWithGracePeriod {
		const penaltyFee = new PenaltyFeeWithGracePeriod(obj.amount);

		penaltyFee.withGracePeriod(obj.grace_period);

		if (obj.vat !== undefined) {
			penaltyFee.vat = obj.vat;
		}

		if (obj.enabled !== undefined) {
			penaltyFee.enabled = obj.enabled;
		}

		penaltyFee.withTemporalRestrictions({
			start_date: obj.start_date,
			end_date: obj.end_date,
			start_time: obj.start_time,
			end_time: obj.end_time,
			day_of_week: obj.day_of_week
		});

		return penaltyFee;
	}

	public get gracePeriod(): number {
		return this.#gracePeriod;
	}

	public set gracePeriod(value: number) {
		this.#gracePeriod = value;
	}
}