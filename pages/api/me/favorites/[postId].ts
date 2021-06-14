import { ServerResponseMeta } from "@typings";
import {
	NextRequestHandler,
	NextRequestHandlerFunction,
} from "@utils/server/NextRequestHandler";
import { PostService } from "@utils/server/services/Post";
import { NextApiHandler } from "next/types";

const posts: NextApiHandler = async (req, res) => {
	await handler.respondTo(req, res);
};

const deleteFavorite: NextRequestHandlerFunction = async (req, res, ctx) => {
	if (ctx.user) {
		const postId = Number(req.query.postId);
		await PostService.removePostFromUserFavorites(
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
	DELETE: deleteFavorite,
});

export default posts;
