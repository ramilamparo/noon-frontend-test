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

export interface PostDatabaseInterface {
	id: number;
	title: string;
	description: string;
	imageSrc: string;
	favoriteCount: number;
	createdAt: Date;
}

export type PostResponseApiData =
	ObjectDatePropertiesToUnixTimestamp<PostDatabaseInterface>;

export interface AuthLoginResponseData {
	token: string;
}

export interface PostCreateData {
	title: string;
	description: string;
}

export type ObjectDatePropertiesToUnixTimestamp<T extends {}> = {
	[K in keyof T]: T[K] extends Date
		? // If Date
		  DateToUnixTimestamp<T[K]>
		: T[K] extends Array<infer I>
		? // If Array
		  ObjectDatePropertiesToUnixTimestamp<I>[]
		: T[K] extends object
		? // If Object
		  ObjectDatePropertiesToUnixTimestamp<T[K]>
		: DateToUnixTimestamp<T[K]>;
};

export type DateToUnixTimestamp<T> = T extends Date
	? number | Exclude<T, Date>
	: T;
