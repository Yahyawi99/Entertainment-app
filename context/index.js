import React, { useContext, useState } from "react";
// next router
import { useRouter } from "next/router";
// Data
import Data from "../data";

const AppContext = React.createContext();

const Provider = ({ children }) => {
	const { pathname } = useRouter();
	const [page, setPage] = useState(pathname);
	const [searchPlaceholder, setSearchPlaceholder] = useState(
		"Search for movies or TV series"
	);
	const [bookmarkedMovies, setBookmarkedMovies] = useState(
		Data.filter((e) => e.isBookmarked && e.category === "Movie")
	);
	const [bookmarkedShows, setBookmarkedShows] = useState(
		Data.filter((e) => e.isBookmarked && e.category === "TV Series")
	);
	const [searchValue, setSearchValue] = useState("");

	// Functions
	const TvBookmark = (arr, index) => {
		const newArr = arr.filter((e, i) => !(i == index));

		setBookmarkedShows(newArr);
	};

	const MoviesBookmark = (arr, index) => {
		const newArr = arr.filter((e, i) => !(i == index));

		setBookmarkedMovies(newArr);
	};

	const addToBookmark = (category, name) => {
		if (category === "TV Series") {
			const clickedShow = bookmarkedShows.some((e) => e.title === name);
			if (clickedShow) {
				bookmarkedShows.forEach((e) => {
					if (e.title === name) {
						e.isBookmarked = false;
					}
				});
				const newArr = bookmarkedShows.filter((e) => e.title !== name);

				setBookmarkedShows(newArr);
			} else {
				const newArr = Data.filter((e) => e.title === name);

				newArr[0].isBookmarked = true;

				setBookmarkedShows([...bookmarkedShows, ...newArr]);
			}
		} else {
			const clickedMovie = bookmarkedMovies.some((e) => e.title === name);
			if (clickedMovie) {
				bookmarkedMovies.forEach((e) => {
					if (e.title === name) {
						e.isBookmarked = false;
					}
				});

				const newArr = bookmarkedMovies.filter((e) => e.title !== name);

				setBookmarkedMovies(newArr);
			} else {
				const newArr = Data.filter((e) => e.title === name);

				newArr[0].isBookmarked = true;

				setBookmarkedMovies([...bookmarkedMovies, ...newArr]);
			}
		}
	};

	return (
		<AppContext.Provider
			value={{
				page,
				setPage,
				searchPlaceholder,
				setSearchPlaceholder,
				TvBookmark,
				MoviesBookmark,
				bookmarkedMovies,
				bookmarkedShows,
				addToBookmark,
				searchValue,
				setSearchValue,
				setBookmarkedMovies,
				setBookmarkedShows,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobal = () => {
	return useContext(AppContext);
};

export default Provider;
