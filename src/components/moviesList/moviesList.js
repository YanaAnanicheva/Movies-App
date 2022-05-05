import './moviesList.css';

import React from 'react';

import { Spin } from 'antd';
import MovieCard from '../movieCard/movieCard';

const MoviesList = (props) => {
  const { movies, loading, guestSessionId, searchMode, ratedMovies } = props;

  const createMovieCards = (searchMode) => {

    const moviesForCards = searchMode ? movies : ratedMovies;

    const movieCards = moviesForCards.map((elem) => (
      <li key={elem.id} className="movie-list_item">
        <MovieCard
          title={elem.original_title}
          overview={elem.overview}
          poster={elem.poster_path}
          releaseDate={elem.release_date}
          rating={elem.vote_average}
          id={elem.id}
          guestRating={elem.rating}
          genreIds={elem.genre_ids}
          guestSessionId={guestSessionId}
        />
      </li>
    ));

    return movieCards;
  };

  if (loading) {
    return <Spin size="large" className="spin_scale" />;
  }

  return (
    <ul className="movies-list" type="none">
      {createMovieCards(searchMode)}
    </ul>
  );
};


export default MoviesList;