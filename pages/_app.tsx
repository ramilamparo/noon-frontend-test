import { ComponentType } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { GlobalStyles } from "components/utils/GlobalStyles";
import { ThemeProvider } from "components/utils/Theme";
import { initializeStore, StoreState, useStore } from "store/state";
import { Post as PostAction } from "store/actions/Post";
import { PostService } from "@utils/server/services/Post";
import { NavBar } from "../components/container/NavBar";

export interface AppProps<T> {
	Component: ComponentType<unknown>;
	pageProps: T;
}

const App = ({
	Component,
	pageProps,
}: AppProps<{ initialReduxState: StoreState }>) => {
	const { initialReduxState, ...otherProps } = pageProps;
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
					<Component {...otherProps} />
				</ThemeProvider>
			</Provider>
		</>
	);
};

export const getServerSideProps = async () => {
	const reduxStore = initializeStore();
	const { dispatch } = reduxStore;

	const posts = await PostService.getAll();

	dispatch(PostAction.set(posts));

	return {
		props: {
			initialReduxState: reduxStore.getState(),
		},
	};
};

export default App;
