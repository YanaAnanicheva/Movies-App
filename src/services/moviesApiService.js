class MoviesApiService {
  apiKey = 'c33f54366ccf34ec81775c2d46bea63e';

  getMovies = async (title, page = null) => {
    let currentPage = page;

    if (page) {
      currentPage = `&page=${page}`;
    } else {
      currentPage = ``;
    }

    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${title}${currentPage}`
    );

    if (movies.ok) {
      movies = await movies.json();
      return movies;
    }

    throw new Error(movies.status);
  };

  getGenres = async () => {
    let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    if (genres.ok) {
      genres = await genres.json();
      return genres.genres;
    }

    throw new Error(genres.status);
  };

  getGuestSessionId = async () => {
    let GetGuestSession = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`
    );
    if (GetGuestSession.ok) {
      GetGuestSession = await GetGuestSession.json();
      return GetGuestSession.guest_session_id;
    }

    throw new Error(GetGuestSession.status);
  };

  ratedMovie = async (value, id, guestId) => {
    const rating = { value };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rating),
      }
    );

    await response.json();
  };

  getGuestRatedMovies = async (guestSesId) => {
    let movies = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSesId}/rated/movies?api_key=${this.apiKey}`
    );
    if (movies.ok) {
      movies = await movies.json();
      return movies;
    }

    throw new Error(movies.status);
  };
}

export default MoviesApiService;
