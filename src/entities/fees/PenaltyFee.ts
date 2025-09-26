// PenaltyFee.ts
import { type IFee, Fee } from './abstract/Fee';

export interface IPenaltyFee extends IFee {
	amount: number;
}

export class PenaltyFee extends Fee {
	#amount: number;

	constructor(amount: number) {
		super();
		this.#amount = amount;
	}

	public toObject(): IPenaltyFee {
		const obj: any = {
			enabled: this.enabled,
			amount: this.#amount
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

		return obj as IPenaltyFee;
	}

	public static fromObject(obj: IPenaltyFee): PenaltyFee {
		const penaltyFee = new PenaltyFee(obj.amount);

		if (obj.vat !== undefined) {
			penaltyFee.vat = obj.vat;
		}

		// Set enabled if provided, default to true
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

	public get amount(): number {
		return this.#amount;
	}

	public set amount(value: number) {
		this.amount = value;
	}
}
