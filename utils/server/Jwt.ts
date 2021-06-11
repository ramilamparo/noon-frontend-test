import jwt from "jsonwebtoken";

export abstract class Jwt {
	public static sign<T extends string | object>(
		data: T,
		secret: string,
		expiry?: string
	) {
		return jwt.sign(data, secret, { expiresIn: expiry });
	}

	public static decode<T extends string | object>(
		token: string,
		secret: string
	): T {
		return jwt.verify(token, secret) as T;
	}
}
