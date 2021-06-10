export abstract class LocalStorage {
	public static set<T>(key: string, value: T) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	public static get<T>(key: string): T {
		const jsonValue = window.localStorage.getItem(key);

		if (jsonValue) {
			return JSON.parse(jsonValue);
		}

		throw new Error("Key does not have an assigned value.");
	}

	public static remove(key: string) {
		window.localStorage.removeItem(key);
	}
}
