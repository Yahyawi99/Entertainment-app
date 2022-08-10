import { useState, useEffect } from "react";
// css
import homeStyles from "../styles/home.module.css";
import bookmarkStyles from "../styles/bookmark.module.css";
// data
import Data from "../data";
// useContext
import { useGlobal } from "../context";

export default function Home() {
	const { addToBookmark, searchValue } = useGlobal();
	const [TrendingData, setTrendingData] = useState(
		Data.filter((e) => e.isTrending)
	);
	const [RecommendedData, setRecommendedData] = useState(
		Data.filter((e) => !e.isTrending)
	);

	useEffect(() => {
		if (searchValue) {
			// search option
			setTrendingData(
				Data.filter(
					(e) =>
						e.isTrending &&
						e.title
							.toLocaleLowerCase()
							.includes(searchValue.toLocaleLowerCase())
				)
			);
			setRecommendedData(
				Data.filter(
					(e) =>
						!e.isTrending &&
						e.title
							.toLocaleLowerCase()
							.includes(searchValue.toLocaleLowerCase())
				)
			);
		} else {
			// Default option
			setTrendingData(Data.filter((e) => e.isTrending));
			setRecommendedData(Data.filter((e) => !e.isTrending));
		}
	}, [searchValue]);

	return (
		<article className={homeStyles.home}>
			<section className={homeStyles.trendingContainer}>
				<p className={homeStyles.title}>Trending</p>
				<div className={homeStyles.trendingContent}>
					{TrendingData.length ? (
						TrendingData.map((e, i) => {
							const {
								title,
								thumbnail: {
									trending: { large },
								},
								year,
								category,
								rating,
								isBookmarked,
							} = e;
							return (
								<div
									key={i}
									className={homeStyles.trending}
									style={{
										background: `
								linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,0.5)),	url(${large}) center/cover no-repeat`,
									}}>
									<div className={homeStyles.info}>
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
									<p className={homeStyles.name}>{title}</p>
									<div
										className={`${homeStyles.bookmarkIcon} ${
											isBookmarked && homeStyles.bookmarkedItem
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
									<div className={homeStyles.playIcon}>
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
							);
						})
					) : (
						<p className={bookmarkStyles.msg}>No math</p>
					)}
				</div>
			</section>

			<section className={homeStyles.recommendedContainer}>
				<p className={homeStyles.title}>Recommended</p>

				<div className={homeStyles.recommendedContent}>
					{RecommendedData.length ? (
						RecommendedData.map((e, i) => {
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
								<div key={i} className={homeStyles.recommended}>
									<div
										style={{
											background: `url(${large}) center/cover no-repeat`,
										}}
										className={homeStyles.recommendedImg}>
										<div className={homeStyles.playIcon}>
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

									<div className={homeStyles.info}>
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
									<p className={homeStyles.name}>{title}</p>

									<div
										className={`${homeStyles.bookmarkIcon} ${
											isBookmarked && homeStyles.bookmarkedItem
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
		</article>
	);
}
