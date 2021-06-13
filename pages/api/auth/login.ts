import {
	AuthLoginResponseData,
	ServerResponse,
	ServerResponseMeta,
} from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { AuthService } from "@utils/server/services/Auth";
import { NextApiHandler } from "next/types";

const login: NextApiHandler = async (req, res) => {
	await handler.respondTo(req, res);
};

const postHandler: NextRequestHandlerFunction = async (req, res) => {
	try {
		const token = await AuthService.login(req.body.username, req.body.password);
		const response: ServerResponse<AuthLoginResponseData> = {
			message: "Successfully logged in!",
			success: true,
			data: {
				token,
			},
		};
		return res.status(200).json(response);
	} catch (e) {
		const response: ServerResponseMeta = {
			message: e.message,
			success: false,
		};
		return res.status(422).json(response);
	}
};

const handler = NextRequestHandler.create({
	POST: postHandler,
});

export default login;
