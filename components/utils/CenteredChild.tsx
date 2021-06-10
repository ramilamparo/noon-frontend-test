import { ReactNode } from "react";
import styled from "styled-components";
import { BodyPortal } from "./Portal";

export interface CenteredChildProps {
	children: ReactNode;
}

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const CenteredChild = ({ children }: CenteredChildProps) => {
	return (
		<BodyPortal>
			<Container>{children}</Container>
		</BodyPortal>
	);
};
