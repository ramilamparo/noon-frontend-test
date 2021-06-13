import { IncomingHttpHeaders } from "http";
import { User } from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthJwt } from "./AuthJwt";

export type NextRequestMethod = "POST" | "GET" | "DELETE";

export interface NextRequestHandlerContext {
	user: User | null;
}

export type NextRequestHandlerFunction = (
	req: NextApiRequest,
	res: NextApiResponse,
	ctx: NextRequestHandlerContext
) => unknown;

export type Handlers = Partial<
	Record<NextRequestMethod, NextRequestHandlerFunction>
>;

export class NextRequestHandler {
	private constructor(private handlers: Handlers) {}

	public static create(handlers: Handlers) {
		return new NextRequestHandler(handlers);
	}

	private static async extractUser(req: NextApiRequest) {
		try {
			const token = NextRequestHandler.extractTokenFromHeaders(req.headers);
			if (token) {
				const jwtData = AuthJwt.decode(token);
				const user = await User.query().findById(jwtData.id);
				return user;
			}
		} catch (e) {
			// Normal. User is not logged in.
		}
		return null;
	}

	private static extractTokenFromHeaders(headers: IncomingHttpHeaders) {
		const authorizationHeader = headers["authorization"];
		if (typeof authorizationHeader === "string") {
			const token = authorizationHeader.replace("Bearer ", "");
			return token;
		}
		return null;
	}

	public async respondTo(req: NextApiRequest, res: NextApiResponse) {
		if (req.method) {
			const handler = this.handlers[req.method as NextRequestMethod];
			if (handler) {
				const user = await NextRequestHandler.extractUser(req);
				return handler(req, res, { user });
			}
		}
		return res.status(404);
	}
}
