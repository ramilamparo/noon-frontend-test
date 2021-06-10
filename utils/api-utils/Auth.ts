import { JwtAuthStorage } from "@utils/JwtStorage";
import { RestApi } from "./RestApi";

export interface AuthLoginData {
	token: string;
}

export class Auth {
	public static async login(username: string, password: string) {
		const api = RestApi.create();
		const response = await api.post<AuthLoginData>("/login", {
			username,
			password,
		});
		JwtAuthStorage.set(response.data.token);
	}

	public static async logout() {
		JwtAuthStorage.clear();
	}

	public static async signup(username: string, password: string) {
		const api = RestApi.create();
		await api.post("/auth/signup", {
			username,
			password,
		});
	}
}
