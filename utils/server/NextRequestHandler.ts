import { NextApiRequest, NextApiResponse } from "next";

export type NextRequestMethod = "POST" | "GET" | "DELETE";

export type NextRequestHandlerFunction = (
	req: NextApiRequest,
	res: NextApiResponse
) => unknown;

export type Handlers = Partial<
	Record<NextRequestMethod, NextRequestHandlerFunction>
>;

export class NextRequestHandler {
	private constructor(private handlers: Handlers) {}
	public static create(handlers: Handlers) {
		return new NextRequestHandler(handlers);
	}

	public respondTo(req: NextApiRequest, res: NextApiResponse) {
		if (req.method) {
			const handler = this.handlers[req.method];
			if (handler) {
				return handler(req, res);
			}
		}
		return res.status(404);
	}
}
