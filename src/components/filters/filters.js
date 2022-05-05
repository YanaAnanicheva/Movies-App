import './filters.css';

import React from 'react';
import MoviesApiService from '../../services/moviesApiService';

const Filters = (props) => {
  const { setSearchMode, setRatedMovies, guestSessionId, toggleLoading, setError } = props;

  const moviesApiService = new MoviesApiService();

  return (
    <ul className="filters" type="none">
      <li className="filters_filter">
        <button
          className="filters_button"
          type="button"
          name="search"
          onClick={(event) => {
            setSearchMode(event);
          }}
        >
          Search
        </button>
      </li>
      <li className="filters_filter">
        <button
          className="filters_button"
          type="submit"
          name="rated"
          onClick={(event) => {
            toggleLoading();
            moviesApiService
              .getGuestRatedMovies(guestSessionId)
              .then((resolve) => {
                setRatedMovies(resolve);
              })
              .then(() => setSearchMode(event))
              .then(() => toggleLoading())
              .catch((err) => {
                setError(err);
              });
          }}
        >
          Rated
        </button>
      </li>
    </ul>
  );
};

export default Filters;