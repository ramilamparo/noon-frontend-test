import {
	HasId,
	PostCreateData,
	PostResponseApiData,
	ServerResponseMeta,
} from "@typings";
import { RestApi } from "./RestApi";

export class Post implements PostResponseApiData {
	public id: number;
	public title: string;
	public description: string;
	public favoriteCount: number;
	public imageSrc: string;
	public createdAt: number;

	private static BASE_URL = "/api/posts";

	private constructor(attributes: PostResponseApiData) {
		this.id = attributes.id;
		this.title = attributes.title;
		this.description = attributes.description;
		this.favoriteCount = attributes.favoriteCount;
		this.imageSrc = attributes.imageSrc;
		this.createdAt = attributes.createdAt;
	}

	public static fromObject(attributes: PostResponseApiData) {
		return new Post(attributes);
	}

	public static async create(data: PostCreateData) {
		const api = RestApi.createWithAuthToken(Post.BASE_URL);
		const response = await api.post<PostResponseApiData>("/", data);
		return Post.fromObject(response.data);
	}

	public static async getAll() {
		const api = RestApi.create(Post.BASE_URL);
		const response = await api.get<PostResponseApiData[]>("/");
		return response.data.map((post) => Post.fromObject(post));
	}

	public static async getMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		const response = await api.get<PostResponseApiData[]>("/favorites");
		return response.data.map((post) => Post.fromObject(post));
	}

	public static async addPostToMyFavorites({ id }: HasId) {
		const api = RestApi.createWithAuthToken("/api/me");
		await api.post<ServerResponseMeta>("/favorites", {
			postId: id,
		});
	}

	public static async removePostFromMyFavorites({ id }: HasId) {
		const api = RestApi.createWithAuthToken("/api/me");
		await api.delete<ServerResponseMeta>(`/favorites/${id}`);
	}
}
