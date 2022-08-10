import "../styles/globals.css";
// Layout
import Layout from "../components/Layout";
// context
import Provider from "../context";

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
