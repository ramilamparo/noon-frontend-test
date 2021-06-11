import { ServerResponse, ServerResponseMeta } from "@typings";
import { AuthJwt } from "@utils/server/AuthJwt";
import { Bcrypt } from "@utils/server/Bcrypt";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { User } from "models/User";
import { NextApiHandler } from "next/types";

const login: NextApiHandler = (req, res) => {
	return handler.respondTo(req, res);
};

const postHandler: NextRequestHandlerFunction = async (req, res) => {
	try {
		const user = await User.query()
			.findOne({
				username: req.body.username,
			})
			.catch(() => {
				// I read that comparing hash even if user does not exist will help with account enumeration
				// Some hackers might compare response times of the server to get a clue if the user exists.
				// Since, hashing a password and comparing it takes a significant amount of time.
				// https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account
				return undefined;
			});
		const userIsValid = await Bcrypt.comparePasswordToHash(
			req.body.password,
			user?.password || ""
		);
		if (user && userIsValid) {
			const response: ServerResponse<string> = {
				message: "Successfully logged in!",
				success: true,
				data: AuthJwt.sign({ id: user.id }),
			};
			return res.status(200).json(response);
		}
	} catch (e) {
		const response: ServerResponseMeta = {
			message: "Cannot sign in",
			success: false,
		};
		return res.status(403).json(response);
	}
};

const handler = NextRequestHandler.create({
	POST: postHandler,
});

export default login;
