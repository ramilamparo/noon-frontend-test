import { FavoritePostList } from "components/container/FavoritePostList";
import styled from "styled-components";

const Container = styled.div`
	width: 50rem;
	margin: auto;
`;

export default function Favorites() {
	return (
		<Container>
			<FavoritePostList />
		</Container>
	);
}
