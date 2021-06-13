import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "store/state";
import { AppDispatch } from "store/actions/types";
import { Post as PostAction } from "store/actions/Post";
import { Post } from "@utils/client/api/Post";
import { HasId, PostCreateData } from "@typings";

export const usePosts = () => {
	const data = useSelector(({ posts }: StoreState) => {
		if (posts) {
			return posts.sort((a, b) => {
				return b.createdAt - a.createdAt;
			});
		}
		return posts;
	});

	const dispatch = useDispatch<AppDispatch>();

	const refetch = useCallback(async () => {
		const posts = await Post.getAll();
		dispatch(PostAction.set(posts));
	}, [dispatch]);

	const create = useCallback(
		async (post: PostCreateData) => {
			await Post.create(post);
			refetch();
		},
		[refetch]
	);

	const favoritePost = useCallback(async (post: HasId) => {
		await Post.addPostToMyFavorites(post);
	}, []);

	return {
		data,
		refetch,
		create,
		favoritePost,
	};
};
