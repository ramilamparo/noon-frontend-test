import { PostResponseData, ServerResponse, ServerResponseMeta } from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { PostService } from "@utils/server/services/Post";
import { NextApiHandler } from "next/types";

const posts: NextApiHandler = async (req, res) => {
	await handler.respondTo(req, res);
};

const getAllPostsHandler: NextRequestHandlerFunction = async (req, res) => {
	try {
		const posts = await PostService.getAll();
		const response: ServerResponse<PostResponseData[]> = {
			message: "Unknown Error",
			success: false,
			data: posts,
		};
		return res.status(200).json(response);
	} catch (e) {
		const response: ServerResponseMeta = {
			message: "Unknown Error",
			success: false,
		};
		return res.status(500).json(response);
	}
};

const createPostHanlder: NextRequestHandlerFunction = async (req, res, ctx) => {
	if (ctx.user) {
		try {
			const createdPost = await PostService.create({
				...req.body,
				authorId: ctx.user.id,
			});
			const response: ServerResponse<PostResponseData> = {
				data: createdPost,
				message: "Successfully created post.",
				success: true,
			};
			return res.status(422).json(response);
		} catch (e) {
			const response: ServerResponseMeta = {
				message: "Invalid parameters.",
				success: false,
			};
			return res.status(422).json(response);
		}
	}
	const response: ServerResponseMeta = {
		message: "Please login to continue.",
		success: false,
	};
	return res.status(403).json(response);
};

const handler = NextRequestHandler.create({
	GET: getAllPostsHandler,
	POST: createPostHanlder,
});

export default posts;
