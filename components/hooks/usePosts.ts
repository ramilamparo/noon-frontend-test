import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostsState, StoreState } from "store/state";
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

	const [favoritePosts, setFavoritePosts] = useState<PostsState>(null);

	const dispatch = useDispatch<AppDispatch>();

	const refetch = useCallback(async () => {
		const posts = await Post.getAll();
		Post.getMyFavorites()
			.then((favorites) => {
				setFavoritePosts(favorites);
			})
			.catch(() => {
				setFavoritePosts([]);
			});
		dispatch(PostAction.set(posts));
	}, [dispatch]);

	const refetchFavorites = useCallback(async () => {
		await Post.getMyFavorites()
			.then((favorites) => {
				setFavoritePosts(favorites);
			})
			.catch(() => {
				setFavoritePosts([]);
			});
	}, []);

	const create = useCallback(
		async (post: PostCreateData) => {
			await Post.create(post);
			refetch();
		},
		[refetch]
	);

	const checkIfPostIsFavorited = useCallback(
		(checkPost: HasId) => {
			if (favoritePosts) {
				const foundFavorite = favoritePosts.find((post) => {
					return post.id === checkPost.id;
				});
				return foundFavorite !== undefined;
			}
			return false;
		},
		[favoritePosts]
	);

	const toggleFavoritePost = useCallback(
		async (post: HasId) => {
			if (checkIfPostIsFavorited(post)) {
				await Post.removePostFromMyFavorites(post);
			} else {
				await Post.addPostToMyFavorites(post);
			}
			refetch();
			refetchFavorites();
		},
		[refetchFavorites, checkIfPostIsFavorited, refetch]
	);

	useEffect(() => {
		refetchFavorites();
	}, [refetchFavorites]);

	return {
		data,
		refetch,
		create,
		toggleFavoritePost,
		favoritePosts,
		checkIfPostIsFavorited,
	};
};
