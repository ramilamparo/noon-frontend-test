import { GlobalStyles } from "components/utils/GlobalStyles";
import { ThemeProvider } from "components/utils/Theme";
import Head from "next/head";
import { ComponentType } from "react";

export interface AppProps<T> {
	Component: ComponentType<T>;
	pageProps: T;
}

const App = <T,>({ Component, pageProps }: AppProps<T>) => {
	return (
		<>
			<Head>
				<title>Noon FrontEnd Test</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Icons"
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyles />
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};

export default App;
