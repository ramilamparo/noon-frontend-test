export interface ServerResponseMeta {
	message: string;
	success: boolean;
}

export interface ServerResponse<T> extends ServerResponseMeta {
	data: T;
}

export interface HasId {
	id: number;
}

export interface PostResponseData {
	id: string;
	title: string;
	description: string;
	favoriteCount: number;
}

export interface AuthLoginResponseData {
	token: string;
}
