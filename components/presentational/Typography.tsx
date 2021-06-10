import { Component, ReactNode } from "react";
import styled, {
	css,
	DefaultTheme,
	FlattenInterpolation,
	ThemedStyledProps,
} from "styled-components";

export interface TypographyProps {
	variant?: TypographyVariant;
	as?: string;
	children: ReactNode;
	className?: string;
}

export type TypographyVariant =
	| "paragraph"
	| "heading1"
	| "heading2"
	| "heading3"
	| "caption";

export class Typography extends Component<TypographyProps, unknown> {
	private static baseStyle = css`
		@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap");
		font-family: Inter;
		font-size: 1.6rem;
	`;

	private static styleMap: Record<
		TypographyVariant | "base",
		FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>
	> = {
		base: Typography.baseStyle,
		caption: css`
			${Typography.baseStyle}
			font-weight: 300;
			font-size: 1.4rem;
			opacity: 0.8;
		`,
		paragraph: css`
			${Typography.baseStyle}
		`,
		heading1: css`
			${Typography.baseStyle}
			font-size: 2.5rem;
		`,
		heading2: css`
			${Typography.baseStyle}
			font-size: 2rem;
			font-weight: 700;
		`,
		heading3: css`
			${Typography.baseStyle}
			font-weight: 700;
		`,
	};

	private static componentMap: Record<TypographyVariant, string> = {
		paragraph: "p",
		caption: "span",
		heading1: "h1",
		heading2: "h2",
		heading3: "h3",
	};

	private static TypographyComponent = styled.span<{
		$variant: TypographyVariant;
	}>`
		${(p) => Typography.getStyle(p.$variant)}
	`;

	public static getStyle = (variant: TypographyVariant | "base") => {
		const style = Typography.styleMap[variant];
		if (!style) {
			throw new Error(`Unknown variant ${variant}`);
		}
		return style;
	};

	private getDefaultComponent = (): string => {
		const { as, variant = "paragraph" } = this.props;
		if (as) {
			return as;
		}
		const component = Typography.componentMap[variant];
		if (!component) {
			throw new Error(`Unknown variant ${variant}`);
		}
		return component;
	};

	public render = () => {
		const { variant = "paragraph", children, className } = this.props;

		return (
			<Typography.TypographyComponent
				className={className}
				as={this.getDefaultComponent() as never}
				$variant={variant}
			>
				{children}
			</Typography.TypographyComponent>
		);
	};
}
