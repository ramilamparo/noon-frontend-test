import { NAVBAR_HEIGHT } from "@presentational/NavBar/NavBar";
import { Breakpoint } from "@utils/client/Breakpoint";
import { NavBar } from "components/container/NavBar";
import { ReactNode } from "react";
import styled from "styled-components";
import { SnackbarPortal } from "./SnackbarPortal";

export interface AppContainerProps {
	className?: string;
	children?: ReactNode;
}

const StyledNavBar = styled(NavBar)`
	position: fixed;
	width: 100%;
	@media (${Breakpoint.TABLET_LANDSCAPE_UP}) {
		top: 0;
	}

	@media (${Breakpoint.TABLET_PORTRAIT_DOWN}) {
		bottom: 0;
	}
`;

export const Container = styled.div`
	@media (${Breakpoint.TABLET_LANDSCAPE_UP}) {
		margin-top: calc(${NAVBAR_HEIGHT} + 1rem);
	}

	@media (${Breakpoint.TABLET_PORTRAIT_DOWN}) {
		margin-bottom: calc(${NAVBAR_HEIGHT} + 1rem);
	}
`;

export const AppContainer = ({ className, children }: AppContainerProps) => {
	return (
		<>
			<Container className={className}>
				<StyledNavBar />
				{children}
			</Container>
			<SnackbarPortal />
		</>
	);
};
