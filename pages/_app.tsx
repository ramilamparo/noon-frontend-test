import { ComponentType } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { GlobalStyles } from "components/utils/GlobalStyles";
import { ThemeProvider } from "components/utils/Theme";
import { initializeStore, StoreState, useStore } from "store/state";
import { NavBar } from "../components/container/NavBar";
import { Post as PostApi } from "@utils/client/api/Post";
import { Post as PostAction } from "store/actions/Post";

export interface AppProps {
	Component: ComponentType<unknown>;
	pageProps: Record<string, unknown>;
	initialReduxState: StoreState;
}

const App = ({ Component, pageProps, initialReduxState }: AppProps) => {
	const reduxStore = useStore(initialReduxState);
	return (
		<>
			<Head>
				<title>Noon FrontEnd Test</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Icons"
					rel="stylesheet"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyles />
			<Provider store={reduxStore}>
				<ThemeProvider>
					<NavBar />
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		</>
	);
};

export default App;

App.getInitialProps = async () => {
	const reduxStore = initializeStore();
	const { dispatch } = reduxStore;

	const posts = await PostApi.getAll();

	dispatch(PostAction.set(posts));

	return {
		initialReduxState: reduxStore.getState(),
	};
};
