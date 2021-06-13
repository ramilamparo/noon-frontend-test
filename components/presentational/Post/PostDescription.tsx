import styled from "styled-components";
import { formatRelative, fromUnixTime } from "date-fns";
import { Typography } from "../Typography";

export interface PostDescriptionProps {
	className?: string;
	description: string;
	createdAt: number;
}

const Container = styled.div`
	& > *:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const PostDescription = ({
	className,
	description,
	createdAt,
}: PostDescriptionProps) => {
	return (
		<Container className={className}>
			<Typography>{description}</Typography>
			<Typography variant="caption">
				Created At: {formatRelative(fromUnixTime(createdAt), new Date())}
			</Typography>
		</Container>
	);
};
