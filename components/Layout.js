// Components
import Navbar from "./Navbar";
import Search from "./Search";
// css
import layoutStyles from "../styles/layout.module.css";

const Layout = ({ children }) => {
	return (
		<main className={layoutStyles.main}>
			<Navbar />
			<div className={layoutStyles.secondRow}>
				<Search />
				{children}
			</div>
		</main>
	);
};

export default Layout;
