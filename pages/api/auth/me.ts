import { UnauthorizedException } from "@exceptions/UnauthorizedException";
import { ServerResponseMeta } from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { NextApiHandler } from "next/types";

const posts: NextApiHandler = async (req, res) => {
	await handler.respondTo(req, res);
};

const checkAuthHandler: NextRequestHandlerFunction = async (req, res, ctx) => {
	try {
		if (!ctx.user) {
			throw new UnauthorizedException();
		}
		const response: ServerResponseMeta = {
			message: "You are logged in!",
			success: false,
		};
		return res.status(200).json(response);
	} catch (e) {
		const response: ServerResponseMeta = {
			message: "You are not logged in!",
			success: false,
		};
		return res.status(403).json(response);
	}
};

const handler = NextRequestHandler.create({
	GET: checkAuthHandler,
});

export default posts;
