export abstract class Category {
	// Generic array position management utilities
	protected swapArrayItems<T>(array: T[], index1: number, index2: number): boolean {
		if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
			return false;
		}
		if (index1 === index2) {
			return true;
		}

		[array[index1], array[index2]] = [array[index2], array[index1]];
		return true;
	}

	protected moveArrayItem<T>(array: T[], fromIndex: number, toIndex: number): boolean {
		if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
			return false;
		}
		if (fromIndex === toIndex) {
			return true;
		}

		const item = array.splice(fromIndex, 1)[0];
		array.splice(toIndex, 0, item);
		return true;
	}

	protected moveArrayItemUp<T>(array: T[], index: number): boolean {
		if (index <= 0 || index >= array.length) {
			return false;
		}
		return this.swapArrayItems(array, index, index - 1);
	}

	protected moveArrayItemDown<T>(array: T[], index: number): boolean {
		if (index < 0 || index >= array.length - 1) {
			return false;
		}
		return this.swapArrayItems(array, index, index + 1);
	}

	protected moveArrayItemToTop<T>(array: T[], index: number): boolean {
		return this.moveArrayItem(array, index, 0);
	}

	protected moveArrayItemToBottom<T>(array: T[], index: number): boolean {
		return this.moveArrayItem(array, index, array.length - 1);
	}

	// Helper method to filter active fees
	protected getActiveFees<T extends { enabled: boolean }>(fees: T[], isFeesEnabled: boolean): T[] {
		if (!isFeesEnabled) {
			return [];
		}
		return fees.filter((fee) => fee.enabled);
	}

	// Helper method to check if fee is active
	protected isFeeActive<T extends { enabled: boolean }>(fee: T, isFeesEnabled: boolean): boolean {
		return isFeesEnabled && fee.enabled;
	}
}
