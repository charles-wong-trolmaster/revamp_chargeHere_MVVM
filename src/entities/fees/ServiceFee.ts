// ServiceFee.ts
import { type IFee, Fee } from './abstract/Fee';

export interface IServiceFee extends IFee {
	amount: number;
}

export class ServiceFee extends Fee {
	#amount: number;

	constructor(amount: number) {
		super();
		this.#amount = amount;
	}

	public toObject(): IServiceFee {
		const obj: any = {
			enabled: this.enabled,
			amount: this.amount
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

		return obj as IServiceFee;
	}

	public static fromObject(obj: IServiceFee): ServiceFee {
		const serviceFee = new ServiceFee(obj.amount);

		// Set VAT if provided
		if (obj.vat !== undefined) {
			serviceFee.vat = obj.vat;
		}

		// Set enabled if provided, default to true
		if (obj.enabled !== undefined) {
			serviceFee.enabled = obj.enabled;
		}

		serviceFee.withTemporalRestrictions({
			start_date: obj.start_date,
			end_date: obj.end_date,
			start_time: obj.start_time,
			end_time: obj.end_time,
			day_of_week: obj.day_of_week
		});

		return serviceFee;
	}

	public get amount(): number {
		return this.#amount;
	}

	public set amount(value: number) {
		this.#amount = value;
	}
}