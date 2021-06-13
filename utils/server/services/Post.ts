import { getUnixTime } from "date-fns";
import { PostResponseApiData } from "@typings";
import { Post } from "models/Post";
import { User } from "models/User";

export interface PostCreateParams {
	authorId: number;
	title: string;
	description: string;
	imageSrc: string;
}

export class PostService {
	public static async getAll(): Promise<PostResponseApiData[]> {
		const allPosts = (await Post.query().select(
			"Posts.*",
			Post.relatedQuery("favorites").count().as("favoriteCount")
		)) as Array<Post & { favoriteCount: number }>;

		return allPosts.map((post) => ({
			description: post.description,
			favoriteCount: post.favoriteCount,
			id: post.id,
			title: post.title,
			imageSrc: post.imageSrc,
			createdAt: getUnixTime(post.createdAt),
		}));
	}

	public static async getUserFavorites(
		userId: number
	): Promise<PostResponseApiData[]> {
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
			imageSrc: post.imageSrc,
			createdAt: getUnixTime(post.createdAt),
		}));
	}

	public static async create(
		post: PostCreateParams
	): Promise<PostResponseApiData> {
		const createdPost = await Post.query().insert({
			title: post.title,
			description: post.description,
			authorId: post.authorId,
			imageSrc: post.imageSrc,
		});
		return {
			description: createdPost.description,
			favoriteCount: 0,
			id: createdPost.id,
			title: createdPost.title,
			imageSrc: createdPost.imageSrc,
			createdAt: getUnixTime(createdPost.createdAt),
		};
	}
}
