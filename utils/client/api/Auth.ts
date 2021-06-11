import { AuthLoginResponseData, ServerResponseMeta } from "@typings";
import { JwtAuthStorage } from "@utils/client/JwtStorage";
import { RestApi } from "./RestApi";

export class Auth {
	public static async isLoggedIn() {
		try {
			const token = JwtAuthStorage.get();
			const api = RestApi.createWithAuthToken("/api", token);
			await api.get<ServerResponseMeta>("/auth/me");
			return true;
		} catch (e) {
			return false;
		}
	}

	public static async login(username: string, password: string) {
		const api = RestApi.create("/api");
		const response = await api.post<AuthLoginResponseData>("/auth/login", {
			username,
			password,
		});
		JwtAuthStorage.set(response.data.token);
	}

	public static async logout() {
		JwtAuthStorage.clear();
	}

	public static async signup(username: string, password: string) {
		const api = RestApi.create("/api");
		await api.post("/auth/signup", {
			username,
			password,
		});
	}
}
