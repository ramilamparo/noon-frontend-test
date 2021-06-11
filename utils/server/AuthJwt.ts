import { HasId } from "@typings";
import { secret } from "config/server";
import { Jwt } from "./Jwt";

export abstract class AuthJwt {
	public static sign(data: HasId) {
		return Jwt.sign(data, secret, "30d");
	}

	public static decode(token: string) {
		return Jwt.decode<HasId>(token, secret);
	}
}
