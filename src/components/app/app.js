import './app.css';
import 'antd/dist/antd.css';

import React from 'react';

import { Alert, Pagination } from 'antd';

import MoviesApiService from '../../services/moviesApiService';

import { GenresProvider } from '../context/context';


import Filters from "../filters"
import Search from '../search';
import MoviesList from "../moviesList";

export default class App extends React.Component {
  moviesApiService = new MoviesApiService();

  state = {
    movies: [],
    ratedMovies: [],
    loading: false,
    error: false,
    totalPages: 0,
    currentPage: 1,
    guestSessionId: '',
    searchMode: true,
    genres: [],
    moviesNotFound: false,
  };

  componentDidMount() {
    this.moviesApiService
      .getGenres()
      .then((res) => this.setState({ genres: res }))
      .catch((err) => {
        this.setState({ error: err.message });
      });

    this.moviesApiService
      .getGuestSessionId()
      .then((res) => {
        this.setState({ guestSessionId: res });
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  }

  componentDidCatch(err) {
    this.setState({ error: err });
  }

  toggleLoading = () => {
    this.setState((state) => ({
      loading: !state.loading,
    }));
  };

  setRatedMovies = (movies) => {
    this.setState({
      ratedMovies: movies.results,
    });
  };

  setSearchMode = (ev) => {
    if (ev.target.name === 'search') {
      this.setState({
        searchMode: true,
        currentPage: 1,
      });
    } else {
      this.setState({ searchMode: false });
    }
  };

  changeMovies = (title, page) => {
    this.setState((state) => ({
      loading: !state.loading,
      totalPages: null,
    }));

    this.moviesApiService
      .getMovies(title, page)
      .then((res) => {
        this.setState((state) => ({
          movies: res.results,
          loading: !state.loading,
          totalPages: res.total_pages,
        }));
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  setError = (err) => {
    this.setState({ error: err.message });
  };

  isMoviesFound = () => {
    const { movies, loading, guestSessionId, ratedMovies, searchMode, moviesNotFound  } = this.state;

    return (
      <MoviesList
        movies={movies}
        ratedMovies={ratedMovies}
        searchMode={searchMode}
        loading={loading}
        guestSessionId={guestSessionId}
      />
    );
  };

  render() {
    const { movies, loading, totalPages, currentPage, guestSessionId, searchMode, genres, error } = this.state;

    if (error) {
      return <Alert message={`Произошла ошибка ${error}`} type="error" />;
    }

    return (
      <GenresProvider value={genres}>
        <main className="app">
          <div className="container">
            <Filters
              guestSessionId={guestSessionId}
              setSearchMode={this.setSearchMode}
              setRatedMovies={this.setRatedMovies}
              toggleLoading={this.toggleLoading}
              setError={this.setError}
            />
            {searchMode ? <Search changeMovies={this.changeMovies} currentPage={currentPage} /> : null}
            {this.isMoviesFound()}
            {!loading && movies && searchMode ? (
              <Pagination
                className="pagination"
                defaultCurrent={currentPage}
                total={totalPages * 10}
                showSizeChanger={false}
                onChange={(page) => {
                  this.setCurrentPage(page);
                }}
              />
            ) : null}
          </div>
        </main>
      </GenresProvider>
    );
  }
}