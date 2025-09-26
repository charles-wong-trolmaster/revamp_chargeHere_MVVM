// ReservationCategory.ts
import { PenaltyFee, type IPenaltyFee } from '../fees/PenaltyFee';
import { ServiceFee, type IServiceFee } from '../fees/ServiceFee';
import { TimeRateFee, type ITimeRateFee } from '../fees/TimeRateFee';
import { Category } from './abstract/Category';

export interface IReservationCategory {
	service_fee?: IServiceFee;
	kept_rate_fee?: ITimeRateFee;
	canceled_rate_fee?: ITimeRateFee;
	no_show_rate_fee?: ITimeRateFee;
	canceled_penalty_fee?: IPenaltyFee;
	no_show_penalty_fee?: IPenaltyFee;
}

export class ReservationCategory extends Category {
	#serviceFee?: ServiceFee;
	#keptTimeRateFee?: TimeRateFee;
	#canceledTimeRateFee?: TimeRateFee;
	#noShowTimeRateFee?: TimeRateFee;
	#canceledPenaltyFee?: PenaltyFee;
	#noShowPenaltyFee?: PenaltyFee;

	constructor() {
		super();
	}

	// Set/Get methods for single instances
	public setServiceFee(serviceFee?: ServiceFee): this {
		this.#serviceFee = serviceFee;
		return this;
	}

	public setKeptRateFee(rateFee?: TimeRateFee): this {
		this.#keptTimeRateFee = rateFee;
		return this;
	}

	public setCanceledRateFee(rateFee?: TimeRateFee): this {
		this.#canceledTimeRateFee = rateFee;
		return this;
	}

	public setNoShowRateFee(rateFee?: TimeRateFee): this {
		this.#noShowTimeRateFee = rateFee;
		return this;
	}

	public setCanceledPenaltyFee(penaltyFee?: PenaltyFee): this {
		this.#canceledPenaltyFee = penaltyFee;
		return this;
	}

	public setNoShowPenaltyFee(penaltyFee?: PenaltyFee): this {
		this.#noShowPenaltyFee = penaltyFee;
		return this;
	}

	public getServiceFee(): ServiceFee | undefined {
		return this.#serviceFee;
	}

	public getKeptRateFee(): TimeRateFee | undefined {
		return this.#keptTimeRateFee;
	}

	public getCanceledRateFee(): TimeRateFee | undefined {
		return this.#canceledTimeRateFee;
	}

	public getNoShowRateFee(): TimeRateFee | undefined {
		return this.#noShowTimeRateFee;
	}

	public getCanceledPenaltyFee(): PenaltyFee | undefined {
		return this.#canceledPenaltyFee;
	}

	public getNoShowPenaltyFee(): PenaltyFee | undefined {
		return this.#noShowPenaltyFee;
	}

	// Clear methods
	public clearServiceFee(): this {
		this.#serviceFee = undefined;
		return this;
	}

	public clearKeptRateFee(): this {
		this.#keptTimeRateFee = undefined;
		return this;
	}

	public clearCanceledRateFee(): this {
		this.#canceledTimeRateFee = undefined;
		return this;
	}

	public clearNoShowRateFee(): this {
		this.#noShowTimeRateFee = undefined;
		return this;
	}

	public clearCanceledPenaltyFee(): this {
		this.#canceledPenaltyFee = undefined;
		return this;
	}

	public clearNoShowPenaltyFee(): this {
		this.#noShowPenaltyFee = undefined;
		return this;
	}

	public clearAllFees(): this {
		this.#serviceFee = undefined;
		this.#keptTimeRateFee = undefined;
		this.#canceledTimeRateFee = undefined;
		this.#noShowTimeRateFee = undefined;
		this.#canceledPenaltyFee = undefined;
		this.#noShowPenaltyFee = undefined;
		return this;
	}

	// Helper methods to get active fees (maintains compatibility with toOcpi)
	public getActiveServiceFees(): ServiceFee[] {
		const fees: ServiceFee[] = [];
		if (this.#serviceFee && this.#serviceFee.enabled) {
			fees.push(this.#serviceFee);
		}
		return fees;
	}

	public getActiveKeptRateFees(): TimeRateFee[] {
		const fees: TimeRateFee[] = [];
		if (this.#keptTimeRateFee && this.#keptTimeRateFee.enabled) {
			fees.push(this.#keptTimeRateFee);
		}
		return fees;
	}

	public getActiveCanceledRateFees(): TimeRateFee[] {
		const fees: TimeRateFee[] = [];
		if (this.#canceledTimeRateFee && this.#canceledTimeRateFee.enabled) {
			fees.push(this.#canceledTimeRateFee);
		}
		return fees;
	}

	public getActiveNoShowRateFees(): TimeRateFee[] {
		const fees: TimeRateFee[] = [];
		if (this.#noShowTimeRateFee && this.#noShowTimeRateFee.enabled) {
			fees.push(this.#noShowTimeRateFee);
		}
		return fees;
	}

	public getActiveCanceledPenaltyFees(): PenaltyFee[] {
		const fees: PenaltyFee[] = [];
		if (this.#canceledPenaltyFee && this.#canceledPenaltyFee.enabled) {
			fees.push(this.#canceledPenaltyFee);
		}
		return fees;
	}

	public getActiveNoShowPenaltyFees(): PenaltyFee[] {
		const fees: PenaltyFee[] = [];
		if (this.#noShowPenaltyFee && this.#noShowPenaltyFee.enabled) {
			fees.push(this.#noShowPenaltyFee);
		}
		return fees;
	}

	public toObject(): IReservationCategory {
		const obj: any = {};

		if (this.#serviceFee) {
			obj.service_fee = this.#serviceFee.toObject();
		}
		if (this.#keptTimeRateFee) {
			obj.kept_rate_fee = this.#keptTimeRateFee.toObject();
		}
		if (this.#canceledTimeRateFee) {
			obj.canceled_rate_fee = this.#canceledTimeRateFee.toObject();
		}
		if (this.#noShowTimeRateFee) {
			obj.no_show_rate_fee = this.#noShowTimeRateFee.toObject();
		}
		if (this.#canceledPenaltyFee) {
			obj.canceled_penalty_fee = this.#canceledPenaltyFee.toObject();
		}
		if (this.#noShowPenaltyFee) {
			obj.no_show_penalty_fee = this.#noShowPenaltyFee.toObject();
		}

		return obj as IReservationCategory;
	}

	public static fromObject(obj: IReservationCategory): ReservationCategory {
		const category = new ReservationCategory();

		if (obj.service_fee) {
			const fee = ServiceFee.fromObject(obj.service_fee);
			category.setServiceFee(fee);
		}

		if (obj.kept_rate_fee) {
			const fee = TimeRateFee.fromObject(obj.kept_rate_fee);
			category.setKeptRateFee(fee);
		}

		if (obj.canceled_rate_fee) {
			const fee = TimeRateFee.fromObject(obj.canceled_rate_fee);
			category.setCanceledRateFee(fee);
		}

		if (obj.no_show_rate_fee) {
			const fee = TimeRateFee.fromObject(obj.no_show_rate_fee);
			category.setNoShowRateFee(fee);
		}

		if (obj.canceled_penalty_fee) {
			const fee = PenaltyFee.fromObject(obj.canceled_penalty_fee);
			category.setCanceledPenaltyFee(fee);
		}

		if (obj.no_show_penalty_fee) {
			const fee = PenaltyFee.fromObject(obj.no_show_penalty_fee);
			category.setNoShowPenaltyFee(fee);
		}

		return category;
	}

	// Getters
	public get serviceFee(): ServiceFee | undefined {
		return this.#serviceFee;
	}

	public get keptRateFee(): TimeRateFee | undefined {
		return this.#keptTimeRateFee;
	}

	public get canceledRateFee(): TimeRateFee | undefined {
		return this.#canceledTimeRateFee;
	}

	public get noShowRateFee(): TimeRateFee | undefined {
		return this.#noShowTimeRateFee;
	}

	public get canceledPenaltyFee(): PenaltyFee | undefined {
		return this.#canceledPenaltyFee;
	}

	public get noShowPenaltyFee(): PenaltyFee | undefined {
		return this.#noShowPenaltyFee;
	}

	// Setters
	public set serviceFee(value: ServiceFee | undefined) {
		this.#serviceFee = value;
	}

	public set keptRateFee(value: TimeRateFee | undefined) {
		this.#keptTimeRateFee = value;
	}

	public set canceledRateFee(value: TimeRateFee | undefined) {
		this.#canceledTimeRateFee = value;
	}

	public set noShowRateFee(value: TimeRateFee | undefined) {
		this.#noShowTimeRateFee = value;
	}

	public set canceledPenaltyFee(value: PenaltyFee | undefined) {
		this.#canceledPenaltyFee = value;
	}

	public set noShowPenaltyFee(value: PenaltyFee | undefined) {
		this.#noShowPenaltyFee = value;
	}
}
