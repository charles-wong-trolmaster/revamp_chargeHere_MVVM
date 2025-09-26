export interface ITier {
	min_power?: number;
	max_power?: number;
	min_current?: number;
	max_current?: number;
}

export abstract class Tier {
	#minPower?: number;
	#maxPower?: number;
	#minCurrent?: number;
	#maxCurrent?: number;

	constructor() {}

	public withPowerRange(min?: number, max?: number): this {
		this.#minPower = min;
		this.#maxPower = max;
		return this;
	}

	public withCurrentRange(min?: number, max?: number): this {
		this.#minCurrent = min;
		this.#maxCurrent = max;
		return this;
	}

	abstract toObject(): any;

	// Getters

	public get minPower(): number | undefined {
		return this.#minPower;
	}
	public get maxPower(): number | undefined {
		return this.#maxPower;
	}
	public get minCurrent(): number | undefined {
		return this.#minCurrent;
	}
	public get maxCurrent(): number | undefined {
		return this.#maxCurrent;
	}

	// Setters

	public set minPower(value: number | undefined) {
		this.#minPower = value;
	}
	public set maxPower(value: number | undefined) {
		this.#maxPower = value;
	}
	public set minCurrent(value: number | undefined) {
		this.#minCurrent = value;
	}
	public set maxCurrent(value: number | undefined) {
		this.#maxCurrent = value;
	}
}
