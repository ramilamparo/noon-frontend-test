import { PostList as PostListPresentational } from "@presentational/Post/PostList";
import { useAuth } from "components/hooks/useAuth";
import { usePosts } from "components/hooks/usePosts";
import { LoadingModal } from "components/utils/LoadingModal";

export const FavoritePostList = () => {
	const auth = useAuth();
	const posts = usePosts();

	if (posts.data) {
		return (
			<PostListPresentational
				posts={posts.favoritePosts || []}
				onFavorite={posts.toggleFavoritePost}
				isLoggedIn={auth.isLoggedIn}
				isPostFavorite={posts.checkIfPostIsFavorited}
			/>
		);
	}
	return <LoadingModal />;
};
