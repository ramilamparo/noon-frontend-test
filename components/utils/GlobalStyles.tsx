import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: inherit;
	}

	html {
		font-size: 62.5%;
		background-color: white;
	}

	body {
		box-sizing: border-box;
	}
`;
