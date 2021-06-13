import { PostResponseApiData } from "@typings";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { PostItem } from "./PostItem";

export interface PostListProps {
	posts: PostResponseApiData[];
	onFavorite?: (post: PostResponseApiData) => void;
	isLoggedIn?: boolean;
}

const Container = styled.div`
	& > * :not(:last-child) {
		margin-bottom: 2rem;
	}
`;

export const PostList = ({ posts, onFavorite, isLoggedIn }: PostListProps) => {
	const handleFavorite = useCallback(
		(postId: number) => {
			if (onFavorite) {
				const post = posts.find((post) => post.id === postId);
				post && onFavorite(post);
			}
		},
		[onFavorite, posts]
	);

	const postNodes = useMemo(() => {
		return posts.map((post) => {
			return (
				<PostItem
					key={post.id}
					post={post}
					isLoggedIn={isLoggedIn}
					onFavorite={handleFavorite}
				/>
			);
		});
	}, [posts, handleFavorite, isLoggedIn]);

	return <Container>{postNodes}</Container>;
};
