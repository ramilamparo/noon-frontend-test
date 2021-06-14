import { PostCreateForm } from "components/container/PostCreateForm";
import { PostList } from "components/container/PostList";
import { useAuth } from "components/hooks/useAuth";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	max-width: 50rem;
	margin: auto;
	padding: 0 1rem;
`;

const StyledPostCreateForm = styled(PostCreateForm)`
	margin-bottom: 2rem;
`;

export default function Home() {
	const auth = useAuth();
	return (
		<Container>
			{auth.isLoggedIn && <StyledPostCreateForm />}
			<PostList />
		</Container>
	);
}
