import styled from "styled-components";
import { Image } from "../Image";

export interface PostImageProps {
	className?: string;
	imageSrc: string;
	alt: string;
}

const Container = styled.div`
	position: relative;
	flex-grow: 1;
	min-height: 20rem;
`;

const StyledImage = styled(Image)`
	object-fit: contain;
`;

export const PostImage = ({ imageSrc, alt, className }: PostImageProps) => {
	return (
		<Container className={className}>
			<StyledImage src={imageSrc} alt={alt} />
		</Container>
	);
};
