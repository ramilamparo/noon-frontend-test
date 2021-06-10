import { Component, ReactNode } from "react";
import styled, {
	css,
	DefaultTheme,
	FlattenInterpolation,
	ThemedStyledProps,
} from "styled-components";
import NextJSLink from "next/link";
import { Typography } from "./Typography";
import { Button } from "./Button";

export type LinkVariant = "text" | "underlined" | "button-solid";
export interface LinkProps {
	className?: string;
	children: ReactNode;
	to: string;
	variant?: LinkVariant;
}

export class Link extends Component<LinkProps> {
	private static baseStyle = css`
		${Typography.getStyle("base")}
		text-decoration: none;
		color: unset;
	`;

	private static styleMap: Record<
		LinkVariant | "base",
		FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>
	> = {
		base: Link.baseStyle,
		"button-solid": css`
			${Button.getStyle("solid")}
			display: inline-flex;
		`,
		text: css`
			&:hover {
				color: ${(p) => p.theme.palette.primary.main};
			}
		`,
		underlined: css`
			color: rgb(26, 13, 171);
			text-decoration: underline;
		`,
	};

	public static getStyle = (variant: LinkVariant | "base") => {
		const style = Link.styleMap[variant];
		if (!style) {
			throw new Error(`Unknown variant ${variant}`);
		}
		return style;
	};

	private static LinkComponent = styled.a<{
		$variant: LinkVariant;
	}>`
		${Link.getStyle("base")}
		${(p) => Link.getStyle(p.$variant)}
	`;

	public render = () => {
		const { className, to, children, variant = "text" } = this.props;
		return (
			<NextJSLink href={to}>
				<Link.LinkComponent $variant={variant} className={className} href={to}>
					{children}
				</Link.LinkComponent>
			</NextJSLink>
		);
	};
}
