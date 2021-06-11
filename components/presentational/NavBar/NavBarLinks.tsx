import { Button } from "@presentational/Button";
import { Link } from "@presentational/Link";
import { ReactNode, useMemo } from "react";
import styled from "styled-components";

export type LinksMap = Record<string, string | (() => void)>;

export interface NavBarLinksProps {
	links: LinksMap;
}

const StyledLi = styled.li`
	list-style-type: none;
`;

const StyledUl = styled.ul`
	display: flex;
	& > *:not(:last-child) {
		margin-right: 1rem;
	}
`;

const StyledLink = styled(Link)``;

export const NavBarLinks = ({ links }: NavBarLinksProps) => {
	const linkNodes = useMemo(() => {
		return Object.entries(links).map(([key, value]) => {
			let children: ReactNode;

			if (typeof value === "string") {
				children = <StyledLink to={value}>{key}</StyledLink>;
			} else {
				children = (
					<Button variant="text" onClick={value}>
						{key}
					</Button>
				);
			}

			return <StyledLi key={key}>{children}</StyledLi>;
		});
	}, [links]);

	return <StyledUl>{linkNodes}</StyledUl>;
};
