// EnergyCategory.ts
import { EnergyRateFee, type IEnergyRateFee } from '../fees/EnergyRateFee';
import { StartupFee, type IStartupFee } from '../fees/StartupFee';
import { Category } from './abstract/Category';

export interface IEnergyCategory {
	rate_fee?: IEnergyRateFee;
	startup_fee?: IStartupFee;
}

export class EnergyCategory extends Category {
	#energyRateFee?: EnergyRateFee;
	#startupFee?: StartupFee;

	constructor() {
		super();
	}

	// Set/Get methods for single instances
	public setRateFee(rateFee?: EnergyRateFee): this {
		this.#energyRateFee = rateFee;
		return this;
	}

	public setStartupFee(startupFee?: StartupFee): this {
		this.#startupFee = startupFee;
		return this;
	}

	public getRateFee(): EnergyRateFee | undefined {
		return this.#energyRateFee;
	}

	public getStartupFee(): StartupFee | undefined {
		return this.#startupFee;
	}

	// Clear methods
	public clearRateFee(): this {
		this.#energyRateFee = undefined;
		return this;
	}

	public clearStartupFee(): this {
		this.#startupFee = undefined;
		return this;
	}

	public clearAllFees(): this {
		this.#energyRateFee = undefined;
		this.#startupFee = undefined;
		return this;
	}

	// Helper methods to get active fees (maintains compatibility with toOcpi)
	public getActiveRateFees(): EnergyRateFee[] {
		const fees: EnergyRateFee[] = [];
		if (this.#energyRateFee && this.#energyRateFee.enabled) {
			fees.push(this.#energyRateFee);
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

	public toObject(): IEnergyCategory {
		const obj: any = {};

		if (this.#energyRateFee) {
			obj.rate_fee = this.#energyRateFee.toObject();
		}
		if (this.#startupFee) {
			obj.startup_fee = this.#startupFee.toObject();
		}

		return obj as IEnergyCategory;
	}

	public static fromObject(obj: IEnergyCategory): EnergyCategory {
		const category = new EnergyCategory();

		if (obj.rate_fee) {
			const fee = EnergyRateFee.fromObject(obj.rate_fee);
			category.setRateFee(fee);
		}

		if (obj.startup_fee) {
			const fee = StartupFee.fromObject(obj.startup_fee);
			category.setStartupFee(fee);
		}

		return category;
	}

	// Getters
	public get rateFee(): EnergyRateFee | undefined {
		return this.#energyRateFee;
	}

	public get startupFee(): StartupFee | undefined {
		return this.#startupFee;
	}

	// Setters
	public set rateFee(value: EnergyRateFee | undefined) {
		this.#energyRateFee = value;
	}

	public set startupFee(value: StartupFee | undefined) {
		this.#startupFee = value;
	}
}