import { ReactNode } from "react";
import {
	css,
	FlattenSimpleInterpolation,
	ThemeProvider as StyledThemeProvider,
} from "styled-components";

export interface ThemeProps {
	children: ReactNode;
}

export enum Breakpoint {
	PHONE_ONLY = "max-width: 599px",
	TABLET_PORTRAIT_UP = "min-width: 600px",
	TABLET_PORTRAIT_DOWN = "max-width: 899px",
	TABLET_LANDSCAPE_UP = "min-width: 900px",
	TABLET_LANDSCAPE_DOWN = "max-width: 1199px",
	DESKTOP_UP = "min-width: 1200px",
	DESKTOP_DOWN = "max-width: 1799px",
	BIG_DESKTOP_UP = "min-width: 1800px",
}

export interface ThemeAttributes {
	palette: {
		background: Palette;
		primary: Palette;
	};
	shadows: {
		boxShadow1: FlattenSimpleInterpolation;
		boxShadow2: FlattenSimpleInterpolation;
		boxShadow3: FlattenSimpleInterpolation;
		boxShadow4: FlattenSimpleInterpolation;
		boxShadow5: FlattenSimpleInterpolation;
	};
	constants: {
		navBarHeight: string;
	};
}

interface Palette {
	main: string;
	contrastText: string;
}

const theme: ThemeAttributes = {
	palette: {
		background: {
			main: "white",
			contrastText: "black",
		},
		primary: {
			main: "orange",
			contrastText: "black",
		},
	},
	shadows: {
		boxShadow1: css`
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		`,
		boxShadow2: css`
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		`,
		boxShadow3: css`
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		`,
		boxShadow4: css`
			box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
				0 10px 10px rgba(0, 0, 0, 0.22);
		`,
		boxShadow5: css`
			box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
				0 15px 12px rgba(0, 0, 0, 0.22);
		`,
	},
	constants: {
		navBarHeight: "6rem",
	},
};

export const ThemeProvider = ({ children }: ThemeProps) => {
	return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
