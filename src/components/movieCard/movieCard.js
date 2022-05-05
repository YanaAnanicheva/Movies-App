import './movieCard.css';

import React from 'react';

import { Rate } from 'antd';

import MoviesApiService from '../../services/moviesApiService';

import { GenresConsumer } from '../context/context';

const MovieCard = (props) => {
  const { title, poster, releaseDate, rating, overview, id, guestSessionId, guestRating, genreIds } = props;
  const shortOverview = overview.split(' ').slice(0, 20);
  shortOverview.push('...');

  const moviesApiService = new MoviesApiService();

  const changeRatingColor = () => {
    if (rating <= 3) {
      return { borderColor: '#E90000' };
    }
    if (rating <= 5) {
      return { borderColor: '#E97E00' };
    }
    if (rating <= 7) {
      return { borderColor: '#E9D100' };
    }
    return { borderColor: '#66E900' };
  };

  const posterLink = (posterImg) => {
    if (poster === null) {
      return null;
    }
    return `https://image.tmdb.org/t/p/w500${posterImg}`;
  };

  const createGenres = (allGenresIds, gnrIds) => {
    const genresForCard = [];

    gnrIds.forEach((el) => {
      allGenresIds.forEach((allGenEl) => {
        if (allGenEl.id === el) {
          genresForCard.push(
            <li className="movie-card_category" key={el}>
              {allGenEl.name}
            </li>
          );
        }
      });
    });
    return genresForCard;
  };

  return (
    <GenresConsumer>
      {(getGenres) => (
        <div className="movie-card">
          <img className="movie-card_poster" src={posterLink(poster)} alt="Постер" />
          <div className="movie-card_information">
            <h5 className="movie-card_title">{title}</h5>
            <div className="movie-card_rating" style={changeRatingColor()}>
              <p>{rating}</p>
            </div>
            <p className="movie-card_date">{releaseDate}</p>
            <ul className="movie-card_categories-list" type="none">
              {createGenres(getGenres, genreIds)}
            </ul>
            <p className="movie-card__overview">{shortOverview.join(' ')}</p>
            <Rate
              count={10}
              defaultValue={guestRating}
              onChange={(number) => {
                moviesApiService.ratedMovie(number, id, guestSessionId);
              }}
            />
          </div>
        </div>
      )}
    </GenresConsumer>
  );
};


export default MovieCard;