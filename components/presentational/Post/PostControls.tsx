import styled from "styled-components";
import { Typography } from "../Typography";
import { IconButton } from "../IconButton";

export interface PostControlsProps {
	className?: string;
	favoriteCount: number;
	onFavorite?: () => void;
	isFavorite?: boolean;
	isLoggedIn?: boolean;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	align-self: flex-end;
	& > *:not(:last-child) {
		margin-right: 1rem;
	}
`;

export const PostControls = ({
	className,
	isFavorite,
	onFavorite,
	favoriteCount,
	isLoggedIn,
}: PostControlsProps) => {
	return (
		<Container className={className}>
			<Typography variant="caption">Favorites: {favoriteCount}</Typography>
			{(isLoggedIn && onFavorite && (
				<IconButton
					onClick={onFavorite}
					iconName={isFavorite ? "favorite" : "favorite_border"}
				/>
			)) ||
				null}
		</Container>
	);
};
