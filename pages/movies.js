import { useState, useEffect } from "react";
// Css
import tvShowsandMovieStyles from "../styles/tvShows&movies.module.css";
import bookmarkStyles from "../styles/bookmark.module.css";
// Data
import Data from "../data";
// useContext
import { useGlobal } from "../context";

const movies = () => {
	const { addToBookmark, searchValue } = useGlobal();

	const [Movies, setMovies] = useState(
		Data.filter((e) => e.category === "Movie")
	);

	useEffect(() => {
		if (searchValue) {
			// search option
			setMovies(
				Data.filter(
					(e) =>
						e.category === "Movie" &&
						e.title
							.toLocaleLowerCase()
							.includes(searchValue.toLocaleLowerCase())
				)
			);
		} else {
			// Default option
			setMovies(Data.filter((e) => e.category === "Movie"));
		}
	}, [searchValue]);

	return (
		<section className={tvShowsandMovieStyles.tvShowsContainer}>
			<p className={tvShowsandMovieStyles.title}>Movies</p>
			<div className={tvShowsandMovieStyles.contentContainer}>
				{Movies.length ? (
					Movies.map((e, i) => {
						const {
							thumbnail: {
								regular: { large },
							},
							year,
							category,
							rating,
							title,
							isBookmarked,
						} = e;

						return (
							<div key={i} className={tvShowsandMovieStyles.content}>
								<div
									style={{
										background: `url(${large}) center/cover no-repeat`,
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
									}}
									className={tvShowsandMovieStyles.contentImg}>
									<div className={tvShowsandMovieStyles.playIcon}>
										<div>
											<svg
												width='30'
												height='30'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z'
													fill='#FFF'
												/>
											</svg>

											<p>Play</p>
										</div>
									</div>
								</div>

								<div className={tvShowsandMovieStyles.info}>
									<p className='year'>{year}</p>
									<p className='category'>
										{category === "Movie" ? (
											<img src={"/assets/icon-category-movie.svg"} alt='Icon' />
										) : (
											<img src={"/assets/icon-category-tv.svg"} alt='Icon' />
										)}
										{category}
									</p>
									<p className='rating'>{rating}</p>
								</div>
								<p className={tvShowsandMovieStyles.name}>{title}</p>

								<div
									className={`${tvShowsandMovieStyles.bookmarkIcon} ${
										isBookmarked && tvShowsandMovieStyles.bookmarkedItem
									}`}
									onClick={() => addToBookmark(category, title)}>
									<svg
										width='12'
										height='14'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z'
											stroke='#FFF'
											strokeWidth='1.5'
											fill='none'
										/>
									</svg>
								</div>
							</div>
						);
					})
				) : (
					<p className={bookmarkStyles.msg}>No match</p>
				)}
			</div>
		</section>
	);
};

export default movies;
