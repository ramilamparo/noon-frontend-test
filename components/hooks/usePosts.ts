import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "store/state";
import { AppDispatch } from "store/actions/types";
import { Post as PostAction } from "store/actions/Post";
import { Post } from "@utils/client/api/Post";
import { PostCreateData } from "@typings";

export const usePosts = () => {
	const data = useSelector((state: StoreState) => state.posts);

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

	return {
		data,
		refetch,
		create,
	};
};
