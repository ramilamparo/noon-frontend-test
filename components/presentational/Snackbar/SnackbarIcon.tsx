import { Icon } from "@presentational/Icon";
import { AlertType } from "store/state";
import { useMemo } from "react";
import styled, { css } from "styled-components";

export interface SnackbarIconProps {
	className?: string;
	type: AlertType;
}

const StyledIcon = styled(Icon)<{ $type: AlertType }>`
	color: white;
	${(p) => getStyle(p.$type)}
`;

export const SnackbarIcon = ({ type, className }: SnackbarIconProps) => {
	const iconName = useMemo((): string => {
		switch (type) {
			case "ERROR":
				return "error";
			case "INFO":
				return "info";
			case "SUCCESS":
				return "check_circle";
			case "WARN":
				return "warning";
			default:
				throw new Error(`Unknown type ${type}`);
		}
	}, [type]);

	return <StyledIcon iconName={iconName} className={className} $type={type} />;
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

const successStyle = css``;

const infoStyle = css``;

const errorStyle = css``;

const warnStyle = css``;
