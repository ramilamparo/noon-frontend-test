import { ServerResponse, ServerResponseMeta } from "@typings";
import { JwtAuthStorage } from "@utils/client/JwtStorage";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getEnv } from "config/client";
import { RestApiError } from "./RestApiError";

export class RestApi {
	private constructor(private baseUrl: string, private axios: AxiosInstance) {}

	public static create(baseUrl: string = "") {
		return new RestApi(getEnv().apiEndpoint + baseUrl, axios.create());
	}

	public static createWithAuthToken(baseUrl: string, token?: string) {
		const api = new RestApi(baseUrl, axios.create());
		if (token) {
			api.setJwtToken(token);
		} else {
			api.setJwtToken(JwtAuthStorage.get());
		}
		return api;
	}

	private static getAxiosResponseData = <T extends ServerResponseMeta>(
		response: AxiosResponse<T>
	) => {
		return response.data;
	};

	private static getAxiosErrorMessage = <T extends ServerResponseMeta>(
		error: Error | AxiosError<T>
	) => {
		if ("response" in error) {
			const response = error.response;
			if (response) {
				return RestApi.getAxiosResponseData(response).message;
			}
		}
		return error.message;
	};

	private static handleApiError(e: Error): never {
		const errorMessage = RestApi.getAxiosErrorMessage(e);
		throw new RestApiError(errorMessage);
	}

	public getUri(path: string) {
		return `${this.baseUrl}${path}`;
	}

	public setJwtToken(token: string) {
		this.axios.defaults.headers["Authorization"] = `Bearer ${token}`;
	}

	public async get<T>(path: string) {
		try {
			const uri = this.getUri(path);
			const response = await this.axios.get<ServerResponse<T>>(uri);
			return RestApi.getAxiosResponseData(response);
		} catch (e) {
			RestApi.handleApiError(e);
		}
	}

	public async post<T>(path: string, body?: unknown) {
		try {
			const uri = this.getUri(path);
			const response = await this.axios.post<ServerResponse<T>>(uri, body);
			return RestApi.getAxiosResponseData(response);
		} catch (e) {
			RestApi.handleApiError(e);
		}
	}

	public async delete<T>(path: string) {
		try {
			const uri = this.getUri(path);
			const response = await this.axios.delete<ServerResponse<T>>(uri);
			return RestApi.getAxiosResponseData(response);
		} catch (e) {
			RestApi.handleApiError(e);
		}
	}
}
