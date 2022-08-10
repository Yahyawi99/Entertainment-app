import { useEffect } from "react";
// css
import bookmarkStyles from "../styles/bookmark.module.css";
import tvShowsandMovieStyles from "../styles/tvShows&movies.module.css";
// useContext
import { useGlobal } from "../context";
// Data
import Data from "../data";

const bookmark = () => {
	const {
		bookmarkedMovies,
		bookmarkedShows,
		TvBookmark,
		MoviesBookmark,
		searchValue,
		setBookmarkedMovies,
		setBookmarkedShows,
	} = useGlobal();

	useEffect(() => {
		if (searchValue) {
			// search option
			setBookmarkedMovies(
				Data.filter(
					(e) =>
						e.isBookmarked &&
						e.category === "Movie" &&
						e.title
							.toLocaleLowerCase()
							.includes(searchValue.toLocaleLowerCase())
				)
			);
			setBookmarkedShows(
				Data.filter(
					(e) =>
						e.isBookmarked &&
						e.category === "TV Series" &&
						e.title
							.toLocaleLowerCase()
							.includes(searchValue.toLocaleLowerCase())
				)
			);
		} else {
			// Default option
			setBookmarkedMovies(
				Data.filter((e) => e.isBookmarked && e.category === "Movie")
			);

			setBookmarkedShows(
				Data.filter((e) => e.isBookmarked && e.category === "TV Series")
			);
		}
	}, [searchValue]);

	return (
		<article className={bookmarkStyles.container}>
			<section className={bookmarkStyles.movies}>
				<p className={tvShowsandMovieStyles.title}>Bookmarked Movies</p>

				<div className={tvShowsandMovieStyles.contentContainer}>
					{bookmarkedMovies.length ? (
						bookmarkedMovies.map((e, i) => {
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
												<img
													src={"/assets/icon-category-movie.svg"}
													alt='Icon'
												/>
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
										onClick={() => MoviesBookmark(bookmarkedMovies, i)}>
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
						<p className={bookmarkStyles.msg}>No Bookmarked Movies</p>
					)}
				</div>
			</section>

			<section className={bookmarkStyles.tvShows}>
				<p className={tvShowsandMovieStyles.title}>Bookmarkes TV Searies</p>

				<div className={tvShowsandMovieStyles.contentContainer}>
					{bookmarkedShows.length ? (
						bookmarkedShows.map((e, i) => {
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
												<img
													src={"/assets/icon-category-movie.svg"}
													alt='Icon'
												/>
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
										onClick={() => TvBookmark(bookmarkedShows, i)}>
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
						<p className={bookmarkStyles.msg}>No Bookmarked TV Series</p>
					)}
				</div>
			</section>
		</article>
	);
};

export default bookmark;
