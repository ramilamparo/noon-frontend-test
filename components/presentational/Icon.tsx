import styled from "styled-components";
import classNames from "classnames";
import { Typography } from "./Typography";
import { ReactNode } from "react";

export interface IconProps {
	className?: string;
	iconName: string;
	subIcon?: ReactNode;
}

const StyledSpan = styled.span`
	font-family: "Material Icons";
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	${Typography.getStyle("base")}
	&:hover {
		& > * {
			opacity: 1;
		}
	}
`;

export const Icon = ({ iconName, className }: IconProps) => {
	return (
		<Container>
			<StyledSpan className={classNames(className, "material-icons")} aria-hidden>
				{iconName}
			</StyledSpan>
		</Container>
	);
};
