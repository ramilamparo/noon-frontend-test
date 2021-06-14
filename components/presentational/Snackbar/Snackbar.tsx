import { Button } from "@presentational/Button";
import { AlertType } from "store/state";
import styled, { css } from "styled-components";
import { SnackbarIcon } from "./SnackbarIcon";
import { Typography } from "../Typography";
import { TimeoutIcon } from "@presentational/TimeoutIcon";

export interface SnackbarProps {
	type: AlertType;
	message: string;
	expiry?: number;
	onDismiss: () => void;
}

const Container = styled.div<{ $type: AlertType }>`
	${(p) => getStyle(p.$type)}
	height: 5rem;
	display: flex;
	border-radius: 0.5rem;
	padding: 0 1rem;
	align-items: center;
	justify-content: space-between;
`;

const ContentContainer = styled.div`
	display: flex;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: 1rem;
	}
`;

const StyledButton = styled(Button)`
	color: white;
	justify-self: flex-end;
	margin-left: 1rem;
	text-transform: uppercase;
	font-weight: 600;
	background-color: rgba(255, 255, 255, 0.3);
	padding: 0.5rem;
	border-radius: 0.2rem;
`;

const StyledTypography = styled(Typography)`
	color: white;
`;

const StyledTimeoutIcon = styled(TimeoutIcon)`
	width: 3rem;
	height: 3rem;
`;

export const Snackbar = ({
	message,
	onDismiss,
	type,
	expiry,
}: SnackbarProps) => {
	return (
		<Container $type={type}>
			<ContentContainer>
				{expiry && <StyledTimeoutIcon onTimeout={onDismiss} duration={expiry} />}
				<SnackbarIcon type={type}></SnackbarIcon>
				<StyledTypography>{message}</StyledTypography>
			</ContentContainer>
			<StyledButton variant="text" onClick={onDismiss}>
				Dismiss
			</StyledButton>
		</Container>
	);
};

const getStyle = (type: AlertType) => {
	switch (type) {
		case "WARN":
			return warnStyle;
		case "SUCCESS":
			return successStyle;
		case "INFO":
			return infoStyle;
		case "ERROR":
			return errorStyle;
		default:
			throw new Error(`Unknown type ${type}`);
	}
};

const successStyle = css`
	background-color: #459f48;
`;

const infoStyle = css`
	background-color: #1c81d1;
`;

const errorStyle = css`
	background-color: #de3d31;
`;

const warnStyle = css`
	background-color: #e88a00;
`;
