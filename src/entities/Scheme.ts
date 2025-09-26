import { EnergyCategory, type IEnergyCategory } from './categories/EnergyCategory';
import { OverstayCategory, type IOverstayCategory } from './categories/OverstayCategory';
import { ReservationCategory, type IReservationCategory } from './categories/ReservationCategory';
import { TimeCategory, type ITimeCategory } from './categories/TimeCategory';

export interface IScheme {
	name: string;
	description?: string;
	categories: {
		energy: IEnergyCategory;
		time: ITimeCategory;
		reservation: IReservationCategory;
		overstay: IOverstayCategory;
	};
}

export class Scheme {
	#name: string;
	#description?: string;
	#categories: {
		energy: EnergyCategory;
		time: TimeCategory;
		reservation: ReservationCategory;
		overstay: OverstayCategory;
	};

	constructor(name: string, description?: string) {
		this.#name = name;
		this.#description = description;

		// Initialize all categories
		this.#categories = {
			energy: new EnergyCategory(),
			time: new TimeCategory(),
			reservation: new ReservationCategory(),
			overstay: new OverstayCategory()
		};
	}

	// Category accessors
	public get categories(): {
		energy: EnergyCategory;
		time: TimeCategory;
		reservation: ReservationCategory;
		overstay: OverstayCategory;
	} {
		return this.#categories;
	}

	// Individual category getters
	public get energyCategory(): EnergyCategory {
		return this.#categories.energy;
	}

	public get timeCategory(): TimeCategory {
		return this.#categories.time;
	}

	public get reservationCategory(): ReservationCategory {
		return this.#categories.reservation;
	}

	public get overstayCategory(): OverstayCategory {
		return this.#categories.overstay;
	}

	// Fluent builder methods for categories
	public withEnergyCategory(category: EnergyCategory): this {
		this.#categories.energy = category;
		return this;
	}

	public withTimeCategory(category: TimeCategory): this {
		this.#categories.time = category;
		return this;
	}

	public withReservationCategory(category: ReservationCategory): this {
		this.#categories.reservation = category;
		return this;
	}

	public withOverstayCategory(category: OverstayCategory): this {
		this.#categories.overstay = category;
		return this;
	}

	// Serialization methods
	public toObject(): IScheme {
		const obj: IScheme = {
			name: this.#name,
			categories: {
				energy: this.#categories.energy.toObject(),
				time: this.#categories.time.toObject(),
				reservation: this.#categories.reservation.toObject(),
				overstay: this.#categories.overstay.toObject()
			}
		};

		// Only add optional fields if they exist and are not null/undefined
		if (this.#description !== undefined && this.#description !== null) {
			obj.description = this.#description;
		}

		return obj;
	}

	public static fromObject(obj: IScheme): Scheme {
		const scheme = new Scheme(obj.name, obj.description);

		// Recreate categories from their serialized objects
		scheme.#categories = {
			energy: EnergyCategory.fromObject(obj.categories.energy),
			time: TimeCategory.fromObject(obj.categories.time),
			reservation: ReservationCategory.fromObject(obj.categories.reservation),
			overstay: OverstayCategory.fromObject(obj.categories.overstay)
		};

		return scheme;
	}

	// Getters
	public get name(): string {
		return this.#name;
	}

	public get description(): string | undefined {
		return this.#description;
	}

	// Setters
	public set name(value: string) {
		this.#name = value;
	}

	public set description(value: string | undefined) {
		this.#description = value;
	}
}
