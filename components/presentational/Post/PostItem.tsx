import { useCallback } from "react";
import { Paper } from "@presentational/Paper";
import { PostResponseApiData } from "@typings";
import styled from "styled-components";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostFooter } from "./PostFooter";

export interface PostItemProps {
	post: PostResponseApiData;
	className?: string;
	onFavorite?: (id: number) => void;
	isLoggedIn?: boolean;
}

const Container = styled(Paper)`
	min-height: 50rem;
	max-height: 300rem;
	display: flex;
	flex-direction: column;
	padding: 2rem;

	& > *:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const PostItem = ({
	post,
	onFavorite,
	className,
	isLoggedIn,
}: PostItemProps) => {
	const { description, title, favoriteCount, imageSrc, id } = post;
	const handleOnFavorite = useCallback(() => {
		onFavorite && onFavorite(id);
	}, [onFavorite, id]);

	return (
		<Container variant="lvl2" className={className}>
			<PostHeader title={title} />
			<PostImage imageSrc={imageSrc} alt={title} />
			<PostFooter
				isLoggedIn={isLoggedIn}
				createdAt={post.createdAt}
				description={description}
				favoriteCount={favoriteCount}
				onFavorite={handleOnFavorite}
			/>
		</Container>
	);
};
