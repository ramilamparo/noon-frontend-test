import { PostList as PostListPresentational } from "@presentational/Post/PostList";
import { HasId } from "@typings";
import { useAuth } from "components/hooks/useAuth";
import { usePosts } from "components/hooks/usePosts";
import { LoadingModal } from "components/utils/LoadingModal";
import { useCallback } from "react";

export const PostList = () => {
	const auth = useAuth();
	const posts = usePosts();

	const handleOnFavorite = useCallback(
		(post: HasId) => {
			posts.favoritePost(post);
		},
		[posts]
	);

	if (posts.data) {
		return (
			<PostListPresentational
				posts={posts.data}
				onFavorite={handleOnFavorite}
				isLoggedIn={auth.isLoggedIn}
			/>
		);
	}
	return <LoadingModal />;
};
