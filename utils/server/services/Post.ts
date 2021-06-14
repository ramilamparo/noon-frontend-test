import { getUnixTime } from "date-fns";
import { HasId, PostResponseApiData } from "@typings";
import { Post } from "models/Post";
import { User } from "models/User";
import { PostCreateDto } from "../dto/PostCreate.dto";

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
		user: HasId
	): Promise<PostResponseApiData[]> {
		const allPosts = (await User.relatedQuery("favorites")
			.for(user.id)
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

	public static async addPostToUserFavorites(post: HasId, user: HasId) {
		await User.relatedQuery("favorites").for(user.id).relate(post.id);
	}

	public static async removePostFromUserFavorites(post: HasId, user: HasId) {
		await User.relatedQuery("favorites")
			.for(user.id)
			.unrelate()
			.where({ postId: post.id });
	}

	public static async create(
		post: PostCreateParams
	): Promise<PostResponseApiData> {
		const createdPost = await Post.query().insert(PostCreateDto.verify(post));
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
