import { IconButton } from "@presentational/IconButton";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { TextInput } from "./TextInput";

export interface PasswordInputProps {
	name: string;
	label: string;
	className?: string;
}

const StyledIconButton = styled(IconButton)`
	background-color: transparent;
	box-shadow: none;
`;

export const PasswordInput = ({
	name,
	label,
	className,
}: PasswordInputProps) => {
	const [isHidden, setIsHidden] = useState(true);

	const iconName = useMemo(() => {
		return isHidden ? "visibility" : "visibility_off";
	}, [isHidden]);

	const toggleHide = useCallback(() => {
		setIsHidden(!isHidden);
	}, [isHidden]);

	return (
		<TextInput
			className={className}
			name={name}
			label={label}
			type={isHidden ? "password" : "text"}
			endAdornment={<StyledIconButton onClick={toggleHide} iconName={iconName} />}
		/>
	);
};
