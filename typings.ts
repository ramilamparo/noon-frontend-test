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
