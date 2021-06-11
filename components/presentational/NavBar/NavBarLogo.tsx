import { Link } from "@presentational/Link";
import styled from "styled-components";

export interface NavBarLogoProps {
	className?: string;
	imageSrc: string;
}

const StyledLogo = styled.img`
	height: 4rem;
`;

export const NavBarLogo = ({ imageSrc, className }: NavBarLogoProps) => {
	return (
		<Link to="/" className={className}>
			<StyledLogo alt="Home" src={imageSrc} />
		</Link>
	);
};
