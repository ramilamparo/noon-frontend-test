import { InvalidParamsException } from "@exceptions/InvalidParamsException";
import { UserSignupAttributes } from "@typings";

export class UserSignupDto implements UserSignupAttributes {
	public username: string;
	public password: string;

	private constructor(attributes: UserSignupAttributes) {
		this.username = attributes.username;
		this.password = attributes.password;
	}

	public static verify({ username, password }: UserSignupAttributes) {
		UserSignupDto.verifyUsername(username);
		UserSignupDto.verifyPassword(password);

		return new UserSignupDto({ username, password });
	}

	private static verifyUsername(username: string) {
		if (username.length < 4) {
			throw new InvalidParamsException("Minimum of four username characters.");
		}
	}
	private static verifyPassword(username: string) {
		if (username.length < 8) {
			throw new InvalidParamsException("Minimum of eight username characters.");
		}
	}
}
