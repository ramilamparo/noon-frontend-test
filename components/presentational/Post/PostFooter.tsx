import styled from "styled-components";
import { PostControls } from "./PostControls";
import { PostDescription } from "./PostDescription";

export interface PostFooterProps {
	className?: string;
	description: string;
	favoriteCount: number;
	onFavorite?: () => void;
	isFavorite?: boolean;
	isLoggedIn?: boolean;
	createdAt: number;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	& > *:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const PostFooter = ({
	className,
	description,
	favoriteCount,
	onFavorite,
	isFavorite,
	isLoggedIn,
	createdAt,
}: PostFooterProps) => {
	return (
		<Container className={className}>
			<PostControls
				isLoggedIn={isLoggedIn}
				favoriteCount={favoriteCount}
				isFavorite={isFavorite}
				onFavorite={onFavorite}
			/>
			<PostDescription description={description} createdAt={createdAt} />
		</Container>
	);
};
