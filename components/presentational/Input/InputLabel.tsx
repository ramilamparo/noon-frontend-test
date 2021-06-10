import { ReactNode } from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";
import { Typography } from "../Typography";

interface InputLabelProps {
	errorMessage?: string;
	htmlFor?: string;
	children?: ReactNode;
	className?: string;
}

type InputState = { $errorMessage?: string };

const invalidInputStyle = css`
	color: red;
`;

export const baseLabelStyle = css<InputState>`
	${Typography.getStyle("base")}
	${(props) => props.$errorMessage && invalidInputStyle}
	cursor: pointer;
`;

const StyledLabel = styled.label<InputState>`
	${baseLabelStyle}
`;

export const InputLabel = ({
	htmlFor,
	errorMessage,
	children,
	className,
}: InputLabelProps) => {
	return (
		<StyledLabel
			className={classNames(className, "input-label")}
			htmlFor={htmlFor}
			$errorMessage={errorMessage}
		>
			{children}
		</StyledLabel>
	);
};
