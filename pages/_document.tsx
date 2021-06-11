import Document, {
	Html,
	DocumentContext,
	Head,
	Main,
	NextScript,
} from "next/document";
import { JSXElementConstructor, ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

export interface DocumentProps {
	styleTags: ReactElement<unknown, string | JSXElementConstructor<unknown>>[];
}

export default class MyDocument extends Document<DocumentProps> {
	static async getInitialProps({ renderPage }: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const page = renderPage((App) => (props) => {
			return sheet.collectStyles(<App {...props} />);
		});
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<Html>
				<Head>{this.props.styleTags}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
