import { ComponentType } from "react";

export interface AppProps<T> {
	Component: ComponentType<T>;
	pageProps: T;
}

const App = <T,>({ Component, pageProps }: AppProps<T>) => {
	return <Component {...pageProps} />;
};

export default App;
