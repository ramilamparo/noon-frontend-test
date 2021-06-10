import { Component } from "react";
import styled, {
	css,
	DefaultTheme,
	FlattenInterpolation,
	ThemedStyledProps,
} from "styled-components";

export type PaperVariant = "lvl1" | "lvl2" | "lvl3" | "lvl4" | "lvl5";

export interface PaperProps {
	variant?: PaperVariant;
	className?: string;
}

export class Paper extends Component<PaperProps, unknown> {
	private static baseStyle = css`
		border-radius: 0.3rem;
		background-color: white;
	`;

	private static styleMap: Record<
		PaperVariant | "base",
		FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>
	> = {
		base: Paper.baseStyle,
		lvl1: css`
			${Paper.baseStyle}
			${(p) => p.theme.shadows.boxShadow1}
		`,
		lvl2: css`
			${Paper.baseStyle}
			${(p) => p.theme.shadows.boxShadow2}
		`,
		lvl3: css`
			${Paper.baseStyle}
			${(p) => p.theme.shadows.boxShadow3}
		`,
		lvl4: css`
			${Paper.baseStyle}
			${(p) => p.theme.shadows.boxShadow4}
		`,
		lvl5: css`
			${Paper.baseStyle}
			${(p) => p.theme.shadows.boxShadow5}
		`,
	};

	private static Container = styled.div<{
		$variant: PaperVariant;
	}>`
		${(p) => Paper.getStyle(p.$variant)}
	`;

	public static getStyle = (variant: PaperVariant | "base") => {
		const style = Paper.styleMap[variant];
		if (!style) {
			throw new Error(`Unknown variant ${variant}`);
		}
		return style;
	};

	public render = () => {
		const { variant = "lvl1", children, className } = this.props;

		return (
			<Paper.Container $variant={variant} className={className}>
				{children}
			</Paper.Container>
		);
	};
}
