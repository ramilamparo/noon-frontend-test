import { RestApi } from "./RestApi";

export interface PostData {
	id: string;
	title: string;
	description: string;
	favoriteCount: number;
}

export interface PostCreateData {
	title: string;
	description: string;
}

export class Post implements PostData {
	public id: string;
	public title: string;
	public description: string;
	public favoriteCount: number;

	private static BASE_URL = "/api/posts";

	private constructor(attributes: PostData) {
		this.id = attributes.id;
		this.title = attributes.title;
		this.description = attributes.description;
		this.favoriteCount = attributes.favoriteCount;
	}

	public static fromObject(attributes: PostData) {
		return new Post(attributes);
	}

	public static async create(data: PostCreateData) {
		const api = RestApi.createWithAuthToken(Post.BASE_URL);
		const response = await api.post<PostData>("/", data);
		return Post.fromObject(response.data);
	}

	public static async getAll() {
		const api = RestApi.create(Post.BASE_URL);
		const response = await api.get<PostData[]>("/");
		return response.data.map((post) => Post.fromObject(post));
	}

	public static async getMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		const response = await api.get<PostData[]>("/favorites");
		return response.data.map((post) => Post.fromObject(post));
	}

	public async addPostToMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		const response = await api.post<PostData>("/favorites", {
			postId: this.id,
		});
		return Post.fromObject(response.data);
	}

	public async removePostFromMyFavorites() {
		const api = RestApi.createWithAuthToken("/api/me");
		await api.delete<PostData>(`/favorites/${this.id}`);
	}
}
