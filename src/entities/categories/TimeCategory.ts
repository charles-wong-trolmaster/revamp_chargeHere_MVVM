// TimeCategory.ts
import { StartupFee, type IStartupFee } from '../fees/StartupFee';
import { TimeRateFee, type ITimeRateFee } from '../fees/TimeRateFee';
import { Category } from './abstract/Category';

export interface ITimeCategory {
	rate_fee?: ITimeRateFee;
	startup_fee?: IStartupFee;
}

export class TimeCategory extends Category {
	#timeRateFee?: TimeRateFee;
	#startupFee?: StartupFee;

	constructor() {
		super();
	}

	// Set/Get methods for single instances
	public setRateFee(rateFee?: TimeRateFee): this {
		this.#timeRateFee = rateFee;
		return this;
	}

	public setStartupFee(startupFee?: StartupFee): this {
		this.#startupFee = startupFee;
		return this;
	}

	public getRateFee(): TimeRateFee | undefined {
		return this.#timeRateFee;
	}

	public getStartupFee(): StartupFee | undefined {
		return this.#startupFee;
	}

	// Clear methods
	public clearRateFee(): this {
		this.#timeRateFee = undefined;
		return this;
	}

	public clearStartupFee(): this {
		this.#startupFee = undefined;
		return this;
	}

	public clearAllFees(): this {
		this.#timeRateFee = undefined;
		this.#startupFee = undefined;
		return this;
	}

	// Helper methods to get active fees (maintains compatibility with toOcpi)
	public getActiveRateFees(): TimeRateFee[] {
		const fees: TimeRateFee[] = [];
		if (this.#timeRateFee && this.#timeRateFee.enabled) {
			fees.push(this.#timeRateFee);
		}
		return fees;
	}

	public getActiveStartupFees(): StartupFee[] {
		const fees: StartupFee[] = [];
		if (this.#startupFee && this.#startupFee.enabled) {
			fees.push(this.#startupFee);
		}
		return fees;
	}

	public toObject(): ITimeCategory {
		const obj: any = {};

		if (this.#timeRateFee) {
			obj.rate_fee = this.#timeRateFee.toObject();
		}
		if (this.#startupFee) {
			obj.startup_fee = this.#startupFee.toObject();
		}

		return obj as ITimeCategory;
	}

	public static fromObject(obj: ITimeCategory): TimeCategory {
		const category = new TimeCategory();

		if (obj.rate_fee) {
			const fee = TimeRateFee.fromObject(obj.rate_fee);
			category.setRateFee(fee);
		}

		if (obj.startup_fee) {
			const fee = StartupFee.fromObject(obj.startup_fee);
			category.setStartupFee(fee);
		}

		return category;
	}

	// Getters
	public get rateFee(): TimeRateFee | undefined {
		return this.#timeRateFee;
	}

	public get startupFee(): StartupFee | undefined {
		return this.#startupFee;
	}

	// Setters
	public set rateFee(value: TimeRateFee | undefined) {
		this.#timeRateFee = value;
	}

	public set startupFee(value: StartupFee | undefined) {
		this.#startupFee = value;
	}
}