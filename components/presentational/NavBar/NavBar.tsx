import styled from "styled-components";
import { LinksMap, NavBarLinks } from "./NavBarLinks";
import { NavBarLogo } from "./NavBarLogo";

export interface NavBarProps {
	logo: string;
	links?: LinksMap;
}

const StyledNav = styled.nav`
	${(p) => p.theme.shadows.boxShadow1}
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 2rem;
	margin-bottom: 1rem;
`;

export const NavBar = ({ logo, links = {} }: NavBarProps) => {
	return (
		<StyledNav>
			<NavBarLogo imageSrc={logo} />
			<NavBarLinks links={links} />
		</StyledNav>
	);
};
