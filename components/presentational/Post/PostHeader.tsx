import { Typography } from "../Typography";
import styled from "styled-components";

export interface PostHeaderProps {
	className?: string;
	title: string;
}

const Container = styled.div``;

export const PostHeader = ({ title }: PostHeaderProps) => {
	return (
		<Container>
			<Typography variant="heading2">{title}</Typography>
		</Container>
	);
};
