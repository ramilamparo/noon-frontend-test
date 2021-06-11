import bcrypt from "bcrypt";

export abstract class Bcrypt {
	public static hashPassword(password: string) {
		return bcrypt.hash(password, 10);
	}

	/**
	 * @throws If the password is not correct.
	 */
	public static comparePasswordToHash(password: string, hash: string) {
		return bcrypt.compare(password, hash);
	}
}
