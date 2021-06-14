import { useEffect } from "react";
import { useRouter } from "next/router";
import { FavoritePostList } from "components/container/FavoritePostList";
import { useAuth } from "components/hooks/useAuth";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	max-width: 50rem;
	margin: auto;
	padding: 0 1rem;
`;

export default function Favorites() {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (auth.isLoggedIn === false) {
			router.replace("/login");
		}
	}, [auth.isLoggedIn, router]);

	return (
		<Container>
			<FavoritePostList />
		</Container>
	);
}
