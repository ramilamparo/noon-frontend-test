import { UnauthorizedException } from "@exceptions/UnauthorizedException";
import { LocalStorage } from "./LocalStorage";

export abstract class JwtAuthStorage {
	private static readonly KEY = "_auth_jwt";

	public static set(jwt: string) {
		LocalStorage.set(JwtAuthStorage.KEY, jwt);
	}

	public static get() {
		try {
			return LocalStorage.get<string>(JwtAuthStorage.KEY);
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	public static clear() {
		LocalStorage.remove(JwtAuthStorage.KEY);
	}
}
