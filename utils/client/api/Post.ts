import { PostResponseData } from "@typings";
import { RestApi } from "./RestApi";

export interface PostCreateData {
	title: string;
	description: string;
}

export class Post implements PostResponseData {
	public id: string;
	public title: string;
	public description: string;
	public favoriteCount: number;

	private static BASE_URL = "/api/posts";

	private constructor(attributes: PostResponseData) {
		this.id = attributes.id;
		this.title = attributes.title;
		this.description = attributes.description;
		this.favoriteCount = attributes.favoriteCount;
	}

	public static fromObject(attributes: PostResponseData) {
		return new Post(attributes);
	}

	public static async create(data: PostCreateData) {
		const api = RestApi.createWithAuthToken(Post.BASE_URL);
		const response = await api.post<PostResponseData>("/", data);
		return Post.fromObject(response.data);
	}

	public static async getAll() {
		const api = RestApi.create(Post.BASE_URL);
		const response = await api.get<PostResponseData[]>("/");
		return response.data.map((post) => Post.fromObject(post));
	}

	public static async getMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		const response = await api.get<PostResponseData[]>("/favorites");
		return response.data.map((post) => Post.fromObject(post));
	}

	public async addPostToMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		const response = await api.post<PostResponseData>("/favorites", {
			postId: this.id,
		});
		return Post.fromObject(response.data);
	}

	public async removePostFromMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		await api.delete<PostResponseData>(`/favorites/${this.id}`);
	}
}
