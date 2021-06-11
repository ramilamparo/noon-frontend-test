import { PostResponseData } from "@typings";
import { Post } from "models/Post";
import { User } from "models/User";

export interface PostCreateParams extends PostResponseData {
	authorId: number;
}

export class PostService {
	public static async getAll(): Promise<PostResponseData[]> {
		const allPosts = (await Post.query().select(
			"Posts.*",
			Post.relatedQuery("favorites").count().as("favoriteCount")
		)) as Array<Post & { favoriteCount: number }>;

		return allPosts.map((post) => ({
			description: post.description,
			favoriteCount: post.favoriteCount,
			id: post.id,
			title: post.title,
		}));
	}

	public static async getUserFavorites(
		userId: number
	): Promise<PostResponseData[]> {
		const allPosts = (await User.relatedQuery("favorites")
			.for(userId)
			.select(
				"Posts.*",
				Post.relatedQuery("favorites").count().as("favoriteCount")
			)) as Array<Post & { favoriteCount: number }>;

		return allPosts.map((post) => ({
			description: post.description,
			favoriteCount: post.favoriteCount,
			id: post.id,
			title: post.title,
		}));
	}

	public static async create(post: PostCreateParams): Promise<PostResponseData> {
		const createdPost = await Post.query().insert({
			title: post.title,
			description: post.description,
			authorId: post.authorId,
		});
		return {
			description: createdPost.description,
			favoriteCount: 0,
			id: createdPost.id,
			title: createdPost.title,
		};
	}
}
