import { ReactNode, useMemo } from "react";
import styled, { css } from "styled-components";
import { InputLabel } from "./InputLabel";

export interface BaseInputProps {
	children: ReactNode;
	className?: string;
	htmlFor: string;
	label: string;
	hasValue?: boolean;
	hasFocus?: boolean;
	endAdornment?: ReactNode;
}

const shiftLabelUpStyle = css`
	transform: translate(-10%, -3rem) scale(0.8);
	background-color: white;
`;

const Container = styled.div<{ $raiseLabel?: boolean }>`
	position: relative;
	height: 4rem;

	& .input-label {
		transition: all 0.1s ease-in;
		margin-left: 1rem;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		z-index: 1;

		${(p) => p.$raiseLabel && shiftLabelUpStyle}
	}
`;

const InputContainer = styled.div`
	height: 100%;
	width: 100%;
	& > * {
		width: 100%;
		height: 100%;
	}
`;

const EndAdornmentContainer = styled.div`
	height: 100%;
	width: 4rem;
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
`;

export const BaseInput = ({
	children,
	className,
	htmlFor,
	label,
	hasValue,
	hasFocus,
	endAdornment: endAdornmentProps,
}: BaseInputProps) => {
	const endAdornment = useMemo(() => {
		if (endAdornmentProps) {
			return <EndAdornmentContainer>{endAdornmentProps}</EndAdornmentContainer>;
		}
		return null;
	}, [endAdornmentProps]);

	return (
		<Container $raiseLabel={hasValue || hasFocus} className={className}>
			<InputLabel htmlFor={htmlFor}>{label}</InputLabel>
			<InputContainer>{children}</InputContainer>
			{endAdornment}
		</Container>
	);
};
