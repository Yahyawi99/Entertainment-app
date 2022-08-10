import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel='shortcut icon' href='/logo.svg' />
				<title>Entertainment app</title>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
