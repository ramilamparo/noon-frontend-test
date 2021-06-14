import { Paper } from "@presentational/Paper";
import styled from "styled-components";
import { LinksMap, NavBarLinks } from "./NavBarLinks";
import { NavBarLogo } from "./NavBarLogo";

export interface NavBarProps {
	logo: string;
	links?: LinksMap;
	className?: string;
}

export const NAVBAR_HEIGHT = "7rem";

const StyledNav = styled.nav`
	z-index: 10;
	${Paper.getStyle("lvl1")}
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 2rem;
	height: ${NAVBAR_HEIGHT};
`;

export const NavBar = ({ logo, className, links = {} }: NavBarProps) => {
	return (
		<StyledNav className={className}>
			<NavBarLogo imageSrc={logo} />
			<NavBarLinks links={links} />
		</StyledNav>
	);
};
