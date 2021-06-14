import {
	PostResponseApiData,
	ServerResponse,
	ServerResponseMeta,
} from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { PostService } from "@utils/server/services/Post";
import { NextApiHandler } from "next/types";

const posts: NextApiHandler = async (req, res) => {
	await handler.respondTo(req, res);
};

const getFavorites: NextRequestHandlerFunction = async (req, res, ctx) => {
	try {
		if (ctx.user) {
			const favorites = await PostService.getUserFavorites({ id: ctx.user.id });
			const response: ServerResponse<PostResponseApiData[]> = {
				message: "Found favorites",
				success: true,
				data: favorites,
			};
			return res.status(200).json(response);
		} else {
			const response: ServerResponseMeta = {
				message: "You are not logged in!",
				success: false,
			};
			return res.status(403).json(response);
		}
	} catch (e) {
		const response: ServerResponseMeta = {
			message: "Invalid form input!",
			success: false,
		};
		return res.status(422).json(response);
	}
};

const createFavorite: NextRequestHandlerFunction = async (req, res, ctx) => {
	if (ctx.user) {
		const postId = req.body.postId;
		await PostService.addPostToUserFavorites(
			{
				id: postId,
			},
			{
				id: ctx.user.id,
			}
		);
		const response: ServerResponseMeta = {
			message: "Favorited post!",
			success: true,
		};
		return res.status(200).json(response);
	} else {
		const response: ServerResponseMeta = {
			message: "You are not logged in!",
			success: false,
		};
		return res.status(403).json(response);
	}
};

const handler = NextRequestHandler.create({
	GET: getFavorites,
	POST: createFavorite,
});

export default posts;
