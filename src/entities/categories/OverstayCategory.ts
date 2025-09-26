// OverstayCategory.ts
import { PenaltyFeeWithGracePeriod, type IPenaltyFeeWithGracePeriod } from '../fees/PenaltyFeeWithGracePeriod.js';
import { TimeRateFeeWithGracePeriod, type ITimeRateFeeWithGracePeriod } from '../fees/TimeRateFeeWithGracePeriod.js';
import { Category } from './abstract/Category.js';

export interface IOverstayCategory {
	rate_fee?: ITimeRateFeeWithGracePeriod;
	penalty_fee?: IPenaltyFeeWithGracePeriod;
}

export class OverstayCategory extends Category {
	#timeRateFee?: TimeRateFeeWithGracePeriod;
	#penaltyFee?: PenaltyFeeWithGracePeriod;

	constructor() {
		super();
	}

	public static create(): OverstayCategory {
		return new OverstayCategory();
	}

	// Set/Get methods for single instances
	public setRateFee(rateFee?: TimeRateFeeWithGracePeriod): this {
		this.#timeRateFee = rateFee;
		return this;
	}

	public setPenaltyFee(penaltyFee?: PenaltyFeeWithGracePeriod): this {
		this.#penaltyFee = penaltyFee;
		return this;
	}

	public getRateFee(): TimeRateFeeWithGracePeriod | undefined {
		return this.#timeRateFee;
	}

	public getPenaltyFee(): PenaltyFeeWithGracePeriod | undefined {
		return this.#penaltyFee;
	}

	// Clear methods
	public clearRateFee(): this {
		this.#timeRateFee = undefined;
		return this;
	}

	public clearPenaltyFee(): this {
		this.#penaltyFee = undefined;
		return this;
	}

	public clearAllFees(): this {
		this.#timeRateFee = undefined;
		this.#penaltyFee = undefined;
		return this;
	}

	// Helper methods to get active fees (maintains compatibility with toOcpi)
	public getActiveRateFees(): TimeRateFeeWithGracePeriod[] {
		const fees: TimeRateFeeWithGracePeriod[] = [];
		if (this.#timeRateFee && this.#timeRateFee.enabled) {
			fees.push(this.#timeRateFee);
		}
		return fees;
	}

	public getActivePenaltyFees(): PenaltyFeeWithGracePeriod[] {
		const fees: PenaltyFeeWithGracePeriod[] = [];
		if (this.#penaltyFee && this.#penaltyFee.enabled) {
			fees.push(this.#penaltyFee);
		}
		return fees;
	}

	public toObject(): IOverstayCategory {
		const obj: any = {};

		if (this.#timeRateFee) {
			obj.rate_fee = this.#timeRateFee.toObject();
		}
		if (this.#penaltyFee) {
			obj.penalty_fee = this.#penaltyFee.toObject();
		}

		return obj as IOverstayCategory;
	}

	public static fromObject(obj: IOverstayCategory): OverstayCategory {
		const category = new OverstayCategory();

		if (obj.rate_fee) {
			const fee = TimeRateFeeWithGracePeriod.fromObject(obj.rate_fee);
			category.setRateFee(fee);
		}

		if (obj.penalty_fee) {
			const fee = PenaltyFeeWithGracePeriod.fromObject(obj.penalty_fee);
			category.setPenaltyFee(fee);
		}

		return category;
	}

	// Getters
	public get rateFee(): TimeRateFeeWithGracePeriod | undefined {
		return this.#timeRateFee;
	}

	public get penaltyFee(): PenaltyFeeWithGracePeriod | undefined {
		return this.#penaltyFee;
	}

	// Setters
	public set rateFee(value: TimeRateFeeWithGracePeriod | undefined) {
		this.#timeRateFee = value;
	}

	public set penaltyFee(value: PenaltyFeeWithGracePeriod | undefined) {
		this.#penaltyFee = value;
	}
}