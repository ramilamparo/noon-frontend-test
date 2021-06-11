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
	id: number;
	title: string;
	description: string;
	favoriteCount: number;
}

export interface AuthLoginResponseData {
	token: string;
}

export interface PostCreateData {
	title: string;
	description: string;
}
