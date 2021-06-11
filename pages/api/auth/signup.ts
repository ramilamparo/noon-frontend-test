import { ServerResponseMeta } from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { AuthService } from "@utils/server/services/Auth";
import { NextApiHandler } from "next/types";

const signup: NextApiHandler = (req, res) => {
	return handler.respondTo(req, res);
};

const postHandler: NextRequestHandlerFunction = async (req, res) => {
	try {
		const response: ServerResponseMeta = {
			message: "Successfully signed up!",
			success: true,
		};
		await AuthService.signup(req.body.username, req.body.password);
		return res.status(200).json(response);
	} catch (e) {
		const response: ServerResponseMeta = {
			message: "Cannot sign up, try using another username?",
			success: false,
		};
		return res.status(403).json(response);
	}
};

const handler = NextRequestHandler.create({
	POST: postHandler,
});

export default signup;
