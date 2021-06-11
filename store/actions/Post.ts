import { PostsState } from "store/state";
import { ActionType, SetPostsAction } from "./types";

export abstract class Post {
	public static set = (posts: PostsState): SetPostsAction => {
		return { type: ActionType.SET_POSTS, payload: posts };
	};
}
