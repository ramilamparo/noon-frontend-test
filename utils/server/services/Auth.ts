import { InvalidParamsException } from "@exceptions/InvalidParamsException";
import { User } from "models/User";
import { AuthJwt } from "../AuthJwt";
import { Bcrypt } from "../Bcrypt";
import { UserSignupDto } from "../dto/UserSignup.dto";

export class AuthService {
	public static async login(username: string, password: string) {
		const user = await User.query()
			.findOne({
				username: username,
			})
			.catch(() => {
				// I read that comparing hash even if user does not exist will help with account enumeration
				// Some hackers might compare response times of the server to get a clue if the user exists.
				// Since, hashing a password and comparing it takes a significant amount of time.
				// https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account
				return undefined;
			});
		const userIsValid = await Bcrypt.comparePasswordToHash(
			password,
			user?.password || ""
		);
		if (userIsValid && user) {
			return AuthJwt.sign({ id: user.id });
		}
		throw new Error("Invalid credentials");
	}

	public static async signup(username: string, password: string) {
		const validated = UserSignupDto.verify({ username, password });
		try {
			await User.query().insert({
				username: validated.username,
				password: await Bcrypt.hashPassword(validated.password),
			});
		} catch (e) {
			throw new InvalidParamsException("User already exists.");
		}
	}
}
