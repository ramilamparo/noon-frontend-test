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
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
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
