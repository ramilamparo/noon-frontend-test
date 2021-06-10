import styled from "styled-components";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface IconButtonProps {
	iconName: string;
	onClick?: () => void;
	className?: string;
}

const StyledButton = styled(Button)`
	border-radius: 10000rem;
`;

export const IconButton = ({
	iconName,
	onClick,
	className,
}: IconButtonProps) => {
	return (
		<StyledButton className={className} onClick={onClick}>
			<Icon iconName={iconName}></Icon>
		</StyledButton>
	);
};
