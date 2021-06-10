import { Component, ReactNode } from "react";
import styled, {
	css,
	DefaultTheme,
	FlattenInterpolation,
	ThemedStyledProps,
} from "styled-components";
import { Icon } from "./Icon";
import { Typography } from "./Typography";

export type ButtonVariant = "solid" | "text" | "paper";

export interface ButtonProps {
	className?: string;
	onClick?: () => void;
	children?: ReactNode;
	variant?: ButtonVariant;
	disabled?: boolean;
	submit?: boolean;
	iconName?: string;
	loading?: boolean;
}

export class Button extends Component<ButtonProps, unknown> {
	private static baseStyle = css`
		${Typography.getStyle("base")}
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		&:disabled {
			cursor: default;
		}
	`;

	private static styleMap: Record<
		ButtonVariant | "base",
		FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>
	> = {
		base: Button.baseStyle,
		solid: css`
			${Button.baseStyle}
			${(p) => p.theme.shadows.boxShadow1}
			color: ${(p) => p.theme.palette.primary.contrastText};
			background-color: ${(p) => p.theme.palette.primary.main};
			padding: 1rem;
			border-radius: 0.3rem;
			height: 4rem;
			&:hover {
				opacity: 0.8;
			}
			&:disabled {
				opacity: 0.2;
			}
		`,
		text: css`
			${Button.baseStyle}
			${Typography.getStyle("base")}
			background-color: transparent;
			&:hover {
				color: ${(p) => p.theme.palette.primary.main};
			}
		`,
		paper: css`
			${Button.baseStyle}
			${(p) => p.theme.shadows.boxShadow1}
			color: ${(p) => p.theme.palette.primary.contrastText};
			background-color: white;
			padding: 1rem;
			border-radius: 0.3rem;
			height: 4rem;
			&:hover {
				opacity: 0.8;
			}
			&:disabled {
				opacity: 0.2;
			}
		`,
	};

	private static ButtonComponent = styled.button<{
		$variant: ButtonVariant;
	}>`
		${(p) => Button.getStyle(p.$variant)}
	`;

	private static ButtonLabelComponent = styled.span`
		margin-right: 0.5rem;
	`;

	public static getStyle = (variant: ButtonVariant | "base") => {
		const style = Button.styleMap[variant];
		if (!style) {
			throw new Error(`Unknown variant ${variant}`);
		}
		return style;
	};

	public render = () => {
		const {
			variant = "solid",
			onClick,
			className,
			disabled,
			loading,
			submit,
		} = this.props;

		return (
			<Button.ButtonComponent
				$variant={variant}
				className={className}
				onClick={onClick}
				disabled={loading || disabled}
				type={submit ? "submit" : "button"}
			>
				{this.renderChildren()}
			</Button.ButtonComponent>
		);
	};

	private renderChildren = () => {
		const { children } = this.props;
		const icon = this.renderIcon();
		if (icon) {
			return (
				<>
					<Button.ButtonLabelComponent>{children}</Button.ButtonLabelComponent>
					{icon}
				</>
			);
		}
		return children;
	};

	private renderIcon = () => {
		const { iconName } = this.props;
		if (iconName) {
			return <Icon iconName={iconName} />;
		}
		return null;
	};
}
