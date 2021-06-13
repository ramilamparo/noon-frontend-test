import { PostCreateForm } from "components/container/PostCreateForm";
import { PostList } from "components/container/PostList";
import styled from "styled-components";

const Container = styled.div`
	width: 50rem;
	margin: auto;
`;

const StyledPostCreateForm = styled(PostCreateForm)`
	margin-bottom: 2rem;
`;

export default function Home() {
	return (
		<Container>
			<StyledPostCreateForm />
			<PostList />
		</Container>
	);
}
